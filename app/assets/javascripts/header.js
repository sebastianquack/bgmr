$(document).on('turbolinks:load', function(){
  $('.close_icon, .menu_button').click(function(){
    $('body').toggleClass('menu_active')
  })
})

$(window).on('resize', function(){
  $('body').toggleClass('menu_active', false)
})

$(document).on('turbolinks:before-cache', function(){
  $('body').toggleClass('menu_active', false)
})
