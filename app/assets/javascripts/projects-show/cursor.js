
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