// Place all the behaviors and hooks related to the matching controller here.

$(document).on('turbolinks:load', function(){
	var $welcome_slides = $('#welcome.welcome__slides')

	$welcome_slides.on('init', function(event, slick){});

  	$welcome_slides.slick({
  		autoplay: true,
  		adaptiveHeight: false,
  		arrows: false,
  		fade: true,
  		autoplaySpeed: 17000,
  		speed: 3000,
  		pauseOnHover: false,
  		pauseOnFocus: false,
  		infinite: true,
  		//lazyLoad:  'progressive',
  	})
})
