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
      var factor_x = $(elem).attr("data-width") / $(elem).innerWidth()
      var factor_y = $(elem).attr("data-height") / $(elem).innerHeight()
      var maxScale = Math.min(factor_x, factor_y)
      console.log("init zoom")
      $(elem).panzoom({
        $zoomRange: $("input[type='range']"),
        panOnlyWhenZoomed: true,
        minScale: 1,
        maxScale: maxScale,
        contain: 'invert',
        duration: 200,
        transition: true,
        //maxScale: elem.naturalWidth / elem.clientWidth
        onZoom: function(e,d) {
          var newScale = 1/d.scale
          $(e.target).find(".slide__loophole").each(function (i,loophole) {
            setTransformScale(loophole, newScale)
          })
          //console.log(d.scale)
          if (d.scale <= 1) {
            leaveZoomMode()
          } else {
            enterZoomMode($(".slick-current .slide").get(0))
          }
        },
        onPan: function(e,d) {
          lastPanned = Date.now()
          //console.log(d)
        },
        onReset: function(e,d) {
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
  $(".slide.zoomable").on('dblclick',function(e){

    /*if (lastPanned == 0) { // do not react the first time to allow discovery of pan
      lastPanned = 1
      return
    }*/
    
    if (zoomMode == true && ( Date.now() - lastPanned > 200) ) {
      e.stopPropagation()
      leaveZoomMode()
    }
  })

  // preload high resolution image
  $("#project .slides").on('afterChange', function(event){
    if ($("#project .slides img").filter(function(i,img){  return !this.complete }).length > 0) {
    } else {
      insertZoomImage($(".slick-current .slide").get(0))
    }
  })

})

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
  $(slides).removeClass('zoomed')
  zoomMode = false
  $(slides).slick('slickSetOption','swipe',true)
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
  var imgElemZoom = $(imgElem).clone()
  imgElemZoom.attr('src',src).addClass("zoomed-image")
  if (!activate) imgElemZoom.css("visibility","hidden")
  setTimeout(function(){
    imgElemZoom.insertAfter(imgElem)
  },500) // make is smoother
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

