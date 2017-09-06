// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.



// copy current caption into info section on slide change

$(document).on('turbolinks:load', function(){
  $('#project .slides').on('init reInit afterChange',function(event){
    var slide = $(this).find(".slick-current")
    var source = $(slide).find('.slide__caption').html()
    var dest = $('.project__info .slide__caption')
    //console.log(source, dest)
    $(dest).html(source);    
  })
})

// position slide links and zoom control

$(document).on('turbolinks:load', function(){

  $('#project .slide__image img').on('load', function(event){
    $(event.target).closest(".slide").addClass("loaded")
    $(event.target).closest(".slick-current").closest('.slides').addClass("current-loaded")
    var pos = positionSlidelinks(this);
    positionZoomableControl(this, pos.left);
  })
  
  $(window).on('resize', function(event){
    console.log("resize")
    $('#project .slide__image img').each(function(i,img){
      var im = img
      window.setTimeout(function(){
      var pos = positionSlidelinks(im);
      positionZoomableControl(im, pos.left)
      },60) // wait for responsive slider to properly resize first
    })
  })  

  $('#project .slides').on('init reInit afterChange',function(e){
    console.log("init reinit change")
    var img = $(e.target).find('.slick-current .slide.zoomable img')
    positionZoomableControl(img, img.attr('data-actual-offset-left'))
  }) 
})

function positionZoomableControl(img, left){
  $(img)
    .closest('.slide.zoomable')
    .closest('.slick-current')
    .closest('.slides')
    .siblings('.zoomable_control')
    .css('left', left)
}

// manage mouseclick controls for slideshow

var currentCursorDirection = false

$(document).on('turbolinks:load', function(){

  // set slide direction left or right depending on cursor position

  currentCursorDirection = false // reset

  var slides = $("#project .slides")

  if (slides.find('.slide').length <= 1) return;

  slides.mousemove(function(event){
    //console.log(event.pageX, window.innerWidth)
    if (event.pageX > window.innerWidth/2) { // if pointer is in the right half of the window
      var cursorDirection = 'right'
    }
    else {
      var cursorDirection = 'left'
    }
    if (cursorDirection != currentCursorDirection) {
      if (cursorDirection == "left") {
        $(this).toggleClass('cursorLeft',true)
        $(this).toggleClass('cursorRight',false)
      }
      else {
        $(this).toggleClass('cursorLeft',false)
        $(this).toggleClass('cursorRight',true)        
      }
      currentCursorDirection = cursorDirection
    }
  }) 

  // handle click  

  $("#project .slides").on('click', function(){
    if (zoomMode == true) return
    var $slides = $(this)
    if (currentCursorDirection == "left") {
      $slides.slick('slickPrev')
    }
    else {
      $slides.slick('slickNext')
    }
  })
})

// manage loophole navigation

$(document).on('turbolinks:load', function(){
  $('#project .slide_link a').click(function(event){

    var $slides = $('.slides')
    var targetIndex = parseInt($(this).attr('data-target-order')) - 1
    var currentIndex = $slides.slick('slickCurrentSlide')

    $slides.slick('slickGoTo',targetIndex)

/*
    event.preventDefault()
    event.stopPropagation()

    // do animation
    var previousSpeed = $slides.slick('slickGetOption','speed')
    $slides.slick('slickSetOption','speed',0)
    // 1
    //$($slides.find(".slide").get(currentIndex)).addClass('loophole-transition')
    //$($slides.find(".slide").get(targetIndex)).addClass('loophole-transition')
    $slides.addClass('loophole-transition')
    // 2
    setTimeout(function(){
      $slides.slick('slickGoTo',targetIndex)
      $slides.removeClass('loophole-transition')
    },200)
    // 3
    setTimeout(function(){
      $slides.slick('slickSetOption','speed',previousSpeed)
    },400)    
*/

  })
})

// manage description open/close

$(document).on('turbolinks:load', function(event){
  if ($($('.project__description').get(0)).html() == false) return; // description is empty

  $('.project__headline').addClass('expandable')

  $('.project__headline .project__headline_1').click(function(event){
    var elem = event.target
    toggle_expandable(elem, {root:'.project__info', autoHeight:'.project__description'})
  })

}) 

$(document).on('turbolinks:before-cache', function(){
  $('#project .project__info').removeClass("open")
}) 

// zoooooooooom

zoomMode = false
lastPanned = 0

$(document).on('turbolinks:load', function(){

  $('#project .slides').on('init reInit afterChange',function(event){
    leaveZoomMode() // just in case
    $(".slick-current .slide.zoomable").each(function(i,elem){
      var maxScale = getMaxScale(elem)
      $(elem).attr("data-max-zoom",maxScale);
      $(elem).attr("data-current-zoom",1);
      $(elem).attr("data-current-level", 0);
      $(elem).attr('data-max-level', 3);
      manageZoomButtonStates();
      $(elem).panzoom({
        panOnlyWhenZoomed: true,
        linearZoom: false,
        minScale: 1,
        maxScale: maxScale,
        contain: 'invert',
        duration: 200,
        transition: true,
        easing: "ease-in-out",
        onZoom: function(e,d) {

          // manage loophole scale
          var newScale = 1/d.scale
          $(e.target).find(".slide__loophole").each(function (i,loophole) {
            setTransformScale(loophole, newScale)
          })

          // manage locking of x-axis movement before limit is reached (unfinished)
          var img = $(e.target).find('.slide__image img')
          var left_offset = img.attr('data-actual-offset-left')
          var img_width = d.container.width - 2*parseInt(left_offset)
          var scale_limit = d.container.width / img_width

          // manage zoomMode
          if (d.scale <= 1) {
            leaveZoomMode()
          } else {
            enterZoomMode($(".slick-current .slide").get(0))
          }

          // manage data attributes
          $(elem).attr('data-current-zoom',d.scale);

          // manage buttons
          manageZoomButtonStates()

        },
        onPan: function(e,d) {
          lastPanned = Date.now()
          //console.log(d)
          
        },
        onReset: function(e,d) {
          $(e.target).attr("data-current-zoom",1);
          var maxScale = getMaxScale(e.target)
          $(e.target).attr("data-max-zoom",maxScale);
          $(e.target).panzoom("option", "maxScale", maxScale);   
          $(elem).attr("data-current-level", 0);
          manageZoomButtonStates()       
          $(e.target).find(".slide__loophole").each(function (i,loophole) {
            setTransformScale(loophole, 1)
          })
        }
      });
    });
  })

  $(".slide.zoomable").hover(function(e){
    //$(".slide").css('pointer-events','none')
  }, function(e){
    //$(".slide").css('pointer-events','all')
  })


  // de/activate range input
  $('#project .slides').on('init reInit afterChange',function(event){
    var zoom_available = $(this).find(".slick-current .zoomable").length > 0
    $('#project .slides').toggleClass('zoomable', zoom_available)
  })

  $('#project .slides').on('beforeChange',function(event){
    $('#project .slides').toggleClass('zoomable', false)
  })

  // zoom out on click
  
  $(".slide.zoomable").on('dblclick doubletap',function(e){

    /*if (lastPanned == 0) { // do not react the first time to allow discovery of pan
      lastPanned = 1
      return
    }*/
    
    if (zoomMode == true && ( Date.now() - lastPanned > 200) ) {
      e.stopPropagation()
      e.stopImmediatePropagation()
      leaveZoomMode()
    }
  })

  // zoom controls

  $('.zoom_button_plus').click(function(event){
    var elem = $(".slick-current .slide.zoomable").get(0);
    var level = parseInt($(elem).attr('data-current-level'));
    var maxLevels = parseInt($(elem).attr('data-max-level'));
    var newLevel = level + ( level < maxLevels ? 1 : 0 );
    // console.log(level, maxLevels, newLevel)
    doSoftZoom(newLevel, maxLevels)
  })
  
  $('.zoom_button_minus').click(function(event){
    var elem = $(".slick-current .slide.zoomable").get(0);
    var level = parseInt($(elem).attr('data-current-level'));
    var maxLevels = parseInt($(elem).attr('data-max-level'));
    var newLevel = level + ( level > 0 ? -1 : 0 );
    // console.log(level, maxLevels, newLevel)
    doSoftZoom(newLevel, maxLevels)
  })

  // preload high resolution image after 6 seconds
  $("#project .slides").on('afterChange init', function(event, d){
    var currentIndex = d.currentSlide;
    setTimeout( function(){
      if ($("#project .slides img").filter(function(i,img){  return !this.complete }).length > 0) {
      } else {
        var nowCurrentIndex = $("#project .slides").slick('slickCurrentSlide')
        if (nowCurrentIndex === currentIndex) {
          console.log("preload")
          insertZoomImage($(".slick-current .slide").get(0)) // disabled, need to be more refined. max 1 image downlaod at a time, because there are now progressive jpgs
        }
      }  
    }, 6000)
  })

})

function doSoftZoom(level, maxLevels) {
  var elem = $(".slick-current .slide.zoomable").get(0);
  var maxScale = parseFloat($(elem).attr('data-max-zoom'));
  var distortionFactor = 0.2; // smalle -> larger steps at the beginning
  var weightedLevel =  level * (Math.pow(level, distortionFactor) / Math.pow(maxLevels, distortionFactor));
  var newScale = (maxScale-1)/maxLevels * weightedLevel;
  $(elem).addClass("force-transition")
  $(elem).panzoom("zoom", newScale+1);
  $(elem).attr("data-current-level", level);
  $(elem).one("transitionend", function() {$(elem).removeClass("force-transition")} )
}  

function roughly(number) {
  return Math.round(number * 1000) / 1000
}

function enterZoomMode(slide) {
  if (zoomMode == true) return
  zoomMode = true
  var slides = $('.slides')
  $(slides).addClass('zoomed')
  $(slides).slick('slickSetOption','swipe',false)
  //console.log($(slides), "zoomMode on")
  insertZoomImage(slide, true)
}

function leaveZoomMode() {
  if (zoomMode == false) return
  var slides = $('.slides')
  var zoomElem = $('.slide.zoomable')
  $(zoomElem).panzoom("reset",{animate: true});
  setTimeout( function() {
    insertZoomImage(zoomElem, true)
    $(slides).removeClass('zoomed');
    zoomMode = false;
    $(slides).slick('slickSetOption','swipe',true);
  }
  , 400);
  //console.log("zoomMode off")
}

function insertZoomImage(slide, activate) {
  if (activate===undefined) activate = false
  if (!$(slide).hasClass("zoomable")) return;
  if ($(slide).find(".zoomed-image").length >= 1) {
    if (activate) $(slide).find(".zoomed-image").css("visibility","visible")
    return
  }
  var imgElem = $(slide).find("img").get(0)
  var src = $(imgElem).attr('data-zoom-src')
  var imgElemZoom = $(imgElem).clone().removeAttr("srcset")
  imgElemZoom.attr('src',src).addClass("zoomed-image")
  if (!activate) imgElemZoom.css("visibility","hidden")
  setTimeout(function(){
    imgElemZoom.insertAfter(imgElem)
  },500) // make is smoother
}

function getMaxScale(elem) {
  var factor_x = $(elem).attr("data-width") / $(elem).innerWidth()
  var factor_y = $(elem).attr("data-height") / $(elem).innerHeight()
  var maxScale = Math.min(factor_x, factor_y)
  return maxScale;
}

function manageZoomButtonStates() {
  var plus = $('.zoom_button_plus');
  var minus = $('.zoom_button_minus');
  var scale = parseFloat($(".slick-current .slide.zoomable").attr('data-current-zoom'));
  var maxScale = parseFloat($(".slick-current .slide.zoomable").attr('data-max-zoom'));

  if (scale <= 1) {
    $(plus).attr("disabled", false);
    $(minus).attr("disabled", true);
  }
  else if (scale >= maxScale) {
    $(plus).attr("disabled", true);
    $(minus).attr("disabled", false);
  } else {
    $(plus).attr("disabled", false);
    $(minus).attr("disabled", false);
  }
}

// init slick slider (after other calls, so init events can get heard)

slickOptions = {
  arrows: false,
  speed: 240,
  cssEase: 'ease-out',
  responsive: [
    {
      breakpoint: breakpoint_8,
      settings: 'unslick' //{ adaptiveHeight: true } //'unslick'
    }   
  ]
}

$(document).on('turbolinks:load', function(){

  $('#project .slides').slick(slickOptions)

  $(window).resize(function(event,d){
    leaveZoomMode();
    if (window.innerWidth > breakpoint_8 && $('#project .slides').slick('getSlick').unslicked)
      $('#project .slides').slick(slickOptions)    
  })

})

$(document).on('turbolinks:before-cache', function(){
  $('#project .slides').slick('unslick')
}) 

// progressively load images

$(document).on('turbolinks:load', function(){
  loadNext()
});


function loadNext() {
  var img = $('img[data-src]').get(0)
  if (!img) return;
  img.setAttribute('srcset', img.getAttribute('data-srcset'));
  img.setAttribute('src', img.getAttribute('data-src'));
  img.removeAttribute('data-src');
  $(img).on("load", loadNext)
  setTimeout(loadNext, 3000)
}

// toggle topics display

$(document).on('turbolinks:load', function(){

  $('#project .project__topics .topic').click(function(event){
    if (!$(this).hasClass("active")) {
      event.preventDefault();
    }
    
    $(this).toggleClass("active")
    $(this).siblings('.topic').toggleClass("active", false)
    // console.log(this)
  })

  $(document).on('turbolinks:before-cache', function(){
    $('#project .project__topics .topic').toggleClass("active", false)
  }) 

  $('#project .slides').on('beforeChange',function(e){
    $('#project .project__topics .topic').toggleClass("active", false)
  })

})

