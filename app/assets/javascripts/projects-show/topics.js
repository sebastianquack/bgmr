// toggle topics display

/*
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

*/

$(document).on('turbolinks:load', function(){

  // fix for sticky hover on touch devices
  $('#project .project__topics .topic').on("touchstart", function(event){
    var $elem = $(event.target)
    $elem.removeClass("gone")
    setTimeout(function(){
      $elem.addClass("gone")
    },2500)
  })

})