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
    var pos = positionSlidelinks(this);
    positionZoomableControl(this, pos.left);
  })
  $(window).on('resize', function(event){
    $('#project .slide__image img').each(function(i,img){
      var im = img
      window.setTimeout(function(){
      var pos = positionSlidelinks(im);
      positionZoomableControl(im, pos.left)
      },60) // wait for responsive slider to properly resize first
    })
  })  

  $('#project .slides').on('init reInit afterChange',function(e){
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

let currentCursorDirection = false

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
        var cursor = 'w-resize'
      }
      else {
        var cursor = 'e-resize'
      }
      $(this).css('cursor',cursor)  
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
    event.preventDefault()
    event.stopPropagation()
    let $slides = $('.slides')
    let targetIndex = parseInt($(this).attr('data-target-order')) - 1
    let currentIndex = $slides.slick('slickCurrentSlide')

    // do animation
    let previousSpeed = $slides.slick('slickGetOption','speed')
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
  })
})

// manage description open/close

$(document).on('turbolinks:before-cache', function(){
  $('#project .project__info').removeClass("open")
}) 


// zoooooooooom

zoomMode = false
lastPanned = 0

$(document).on('turbolinks:load', function(){

  $('#project .slides').on('init reInit afterChange',function(event){
    leaveZoomMode() // just in case
    $(".slick-current .slide.zoomable").panzoom({
      $zoomRange: $("input[type='range']"),
      panOnlyWhenZoomed: true,
      minScale: 1,
      maxScale: 4,
      contain: 'invert',
      duration: 200,
      transition: true,
      //maxScale: elem.naturalWidth / elem.clientWidth
      onZoom: (e,d) => {
        let newScale = 1/d.scale
        $(e.target).find(".slide__loophole").each(function (i,loophole) {
          setTransformScale(loophole, newScale)
        })
        console.log(d.scale)
        if (d.scale <= 1) {
          leaveZoomMode()
        } else {
          enterZoomMode()
        }
      },
      onPan: (e,d) => {
        lastPanned = Date.now()
        //console.log(d)
      },
      onReset: (e,d) => {
        $(e.target).find(".slide__loophole").each(function (i,loophole) {
          setTransformScale(loophole, 1)
        })
      }
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
  $(".slide.zoomable").on('click',function(e){

    /*if (lastPanned == 0) { // do not react the first time to allow discovery of pan
      lastPanned = 1
      return
    }*/
    
    if (zoomMode == true && ( Date.now() - lastPanned > 200) ) {
      e.stopPropagation()
      leaveZoomMode()
    }
  })
})

function enterZoomMode() {
  if (zoomMode == true) return
  zoomMode = true
  var slides = $('.slides')
  $(slides).addClass('zoomed')
  $(slides).slick('slickSetOption','swipe',false)
  console.log($(slides), "zoomMode on")
}

function leaveZoomMode() {
  if (zoomMode == false) return
  var slides = $('.slides')
  var zoomElem = $('.slide.zoomable')
  $(zoomElem).panzoom("reset",{animate: true});
  $(slides).removeClass('zoomed')
  zoomMode = false
  $(slides).slick('slickSetOption','swipe',true)
  console.log("zoomMode off")
}

// init slick slider (after other calls, so init events can get heard)

$(document).on('turbolinks:load', function(){
  $('#project .slides').slick({
    arrows: false,
    speed: 240,
    cssEase: 'ease-out'
  })
})

$(document).on('turbolinks:before-cache', function(){
  $('#project .slides').slick('unslick')
}) 