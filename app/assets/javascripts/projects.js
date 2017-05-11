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

// init slick slider

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


// position slide links

$(document).on('turbolinks:load', function(){
  $('#project .slide__image img').on('load', function(event){
    positionSlidelinks(this);  
  })
  $(window).on('resize', function(event){
    console.log("RESIZE")
    $('#project .slide__image img').each(function(i,img){
      window.setTimeout(function(){
        positionSlidelinks(img);  
      },60) // wait for responsive slider to properly resize first
    })
  })  
})

// manage mouseclick controls for slideshow

let currentCursorDirection = false

$(document).on('turbolinks:load', function(){

  // set slide direction left or right depending on cursor position

  currentCursorDirection = false // reset

  $("#project .slides").mousemove(function(event){
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
