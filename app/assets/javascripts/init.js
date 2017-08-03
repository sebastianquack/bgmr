// do not process resize events that didn't change size

$(document).on('turbolinks:load', function(){
  window_width = $(window).width();
  window_height = $(window).height();
})

$(window).on('resize', function(event) {
  if (window_width == $(window).width() && window_height == $(window).height()) {
    console.log("not changed")  
    event.stopPropagation()
    event.stopImmediatePropagation()
  } else {
    window_width = $(window).width();
    window_height = $(window).height();
  }
})
