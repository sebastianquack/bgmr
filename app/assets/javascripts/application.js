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

// vendor gem
//= require jquery
//= require jquery_ujs
//= require jquery-ui
//= require turbolinks

// vendor npm
//= require slick-carousel/slick/slick.js
//= require jquery-touch-events/src/jquery.mobile-events.js
//= require object-fit-images/dist/ofi.js
//= require leaflet/dist/leaflet.js
//= require imgviewer2/src/imgViewer2.js

//= vendor manually

//  warn IE
//= require warnIE

// helpers
//= require helpers

// common
//= require common_functions

// config
//= require breakpoints

// elements
//= require init
//= require pages
//= require projects-index
//= require projects-show
//= require topics
//= require welcome
//= require header
//= require staffs


$(document).on('turbolinks:load', function(){
	objectFitImages(null, {watchMQ: true})
})

setInterval(function(){
	objectFitImages();
},5000)