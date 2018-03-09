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
