// position slide links and zoom control

$(document).on('turbolinks:load', function(){

  $('#project .slide__image img').on('load', function(event){
    $(event.target).closest(".slide").addClass("loaded")
    $(event.target).closest(".slick-current").closest('.slides').addClass("current-loaded")
    var pos = positionSlidelinks(this);
    positionZoomableControl(this, pos.left);
    positionLoopholeBackLink(this, pos.left);
  })
  
  $(window).on('resize', function(event){
    console.log("resize")
    $('#project .slide__image img').each(function(i,img){
      var im = img
      window.setTimeout(function(){
      var pos = positionSlidelinks(im);
      if (($(im).closest('.slick-current').length) > 0) {
        positionZoomableControl(im, pos.left)
        positionLoopholeBackLink(im, pos.left)
      }
      },60) // wait for responsive slider to properly resize first
    })
    //var img = $('.slick-current .slide img')
    
  })  

  $('#project .slides').on('init reInit afterChange',function(e){
    //console.log("init reinit change")
    var img = $(e.target).find('.slick-current .slide.zoomable img')
    positionZoomableControl(img, img.attr('data-actual-offset-left'))
    var img = $(e.target).find('.slick-current .slide img')
    positionLoopholeBackLink(img, img.attr('data-actual-offset-left'))
  }) 

  
  $('#project .slides').on('init reInit afterChange',function(e){
    var loopholes = $(e.target).find('.slide .slide__loopholes')
    loopholes.removeClass('positioned')    
    var active_loophole = $(e.target).find('.slick-current .slide .slide__loopholes')
    active_loophole.addClass('positioned')
  }) 

})

function positionZoomableControl(img, left){
  $(img)
    .closest('.slide.zoomable')
    .closest('.slick-current')
    .closest('.slides')
    .siblings('.zoomable_control')
    .css('left', mapLeftOffset + left)
}

function positionLoopholeBackLink(img, left){
  $('.nav_loophole_back').css('left', left)
}