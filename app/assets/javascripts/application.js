// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//

//= require jquery
//= require jquery_ujs
//= require turbolinks

//= require slick-carousel/slick/slick.js

//= require helpers

//= require common_functions
//= require pages
//= require projects
//= require topics
//= require welcome

function auto_set_height(elem) {
  var $elem = $(elem)
  var actualHeight = $elem.height();
  var scrollHeight = elem.scrollHeight;
  console.log(actualHeight, scrollHeight)
  if (actualHeight < 0.5 * scrollHeight) {
    $elem.css('height', scrollHeight)  
    $elem.one('transitionend', function(){
      $elem.css('height', 'auto')
    })
  }
  else {
    $elem.css('height', actualHeight)  
  }
    
}

function toggle_expandable(elem, options) {
  console.log(elem)
  var rootElem = $(elem).closest(options.root).get(0)
  var autoHeightElem = $(rootElem).find(options.autoHeight).get(0)
  auto_set_height(autoHeightElem);
  setTimeout(function(){
    $(rootElem).toggleClass('open');
  },1)
}
