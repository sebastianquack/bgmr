// manage description open/close

$(document).on('turbolinks:load', function(event){
  if ($($('.project__description').get(0)).html() == false) return; // description is empty

  $('.project__headline').addClass('expandable')

  $('.project__headline .project__headline_1').click(function(event){
    var elem = event.target
    toggle_expandable(elem, {root:'.project__info', autoHeight:'.project__description'})
  })

}) 

$(document).on('turbolinks:before-cache', function(){
  $('#project .project__info').removeClass("open")
}) 