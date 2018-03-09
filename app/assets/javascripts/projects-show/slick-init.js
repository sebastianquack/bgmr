
// init slick slider (do after other calls, so init events can get heard)

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
    //leaveZoomMode();
    if (window.innerWidth > breakpoint_8 && $('#project .slides').slick('getSlick').unslicked)
      $('#project .slides').slick(slickOptions)    
  })

})

$(document).on('turbolinks:before-cache', function(){
  $('#project .slides').slick('unslick')
}) 
