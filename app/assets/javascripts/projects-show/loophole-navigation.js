
// manage loophole navigation
loopholePreviousIndex = null

navigateLoophole = function(order){

  var $slides = $('.slides')
  var targetIndex = parseInt(order) - 1
  var currentIndex = $slides.slick('slickCurrentSlide')

  loopholePreviousIndex = currentIndex

  $slides.slick('slickGoTo',targetIndex)

}

$(document).on('turbolinks:load', function(){

  // manage loophole click
  $('#project .slide_link a').click(
    function(event) {
      var order = $(this).attr('data-target-order')
      navigateLoophole(order)
    })

  // manage loophole back button hide
  $('#project .slides').on('beforeChange',function(e,d){
    var elem = $(".nav_loophole_back").get(0)
    $(elem).toggleClass("visible", false)
  }) 


  // manage loophole back button appearance
  $('#project .slides').on('afterChange',function(e,d){
    var elem = $(".nav_loophole_back").get(0)
    if (loopholePreviousIndex !== null && loopholePreviousIndex != d.currentSlide) {
      $(elem).attr("targetslide",loopholePreviousIndex+1)
      $(elem).toggleClass("visible", true)
      loopholePreviousIndex = null;
    }
  }) 


  // manage loophole back button press
  $(".nav_loophole_back").click(function(event) {
    var targetIndex = parseInt($(this).attr("targetslide"))
    var $slides = $('.slides')
    $slides.slick('slickGoTo',targetIndex-1)
  })

})
