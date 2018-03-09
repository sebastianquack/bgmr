// zoooooooooom

zoomMode = false
lastPanned = 0
leafletMap = null
imgViewer = null

currentZoomLevel = null;
minZoomLevel = null;
maxZoomLevel = 10;
mapLeftOffset = 0;

$(document).on('turbolinks:load', function(){

  $(window).on("orientationchange", function() {
    leaveZoomMode();
  })

  $('#project .slides').on('init reInit afterChange',function(event){
    leaveZoomMode() // just in case
    setTimeout(function(){
      $(".slick-current .slide.zoomable").each(function(i,elem){

        /*var maxScale = getMaxScale(elem)
        $(elem).attr("data-max-zoom",maxScale);
        $(elem).attr("data-current-zoom",1);
        $(elem).attr("data-current-level", 0);
        $(elem).attr('data-max-level', 3);*/
        /*var img = $(elem).find(".slide__image img").get(0)
        var actual_width = $(img).attr("data-actual-offset-width")
        var actual_left = $(img).attr("data-actual-offset-left")
        console.log(img, actual_width)
        if (actual_width) {
          $(elem).css("width", actual_width)
          $(elem).css("left", actual_left)
          $(elem).css("overflow", "hidden")
        }*/
        manageZoomButtonStates();
        
        /*({
          panOnlyWhenZoomed: true,
          linearZoom: false,
          minScale: 1,
          maxScale: maxScale,
          contain: 'invert',
          duration: 200,
          transition: true,
          easing: "ease-in-out",
          onZoom: function(e,d) {

            // manage loophole scale
            var newScale = 1/d.scale
            $(e.target).find(".slide__loophole").each(function (i,loophole) {
              setTransformScale(loophole, newScale)
            })

            // manage zoomMode
            if (d.scale <= 1) {
              leaveZoomMode()
            } else {
              enterZoomMode($(".slick-current .slide").get(0))
            }

            // manage data attributes
            $(elem).attr('data-current-zoom',d.scale);

            // manage buttons
            manageZoomButtonStates()

          },
          onPan: function(e,d) {
            lastPanned = Date.now()
            //console.log(d)
            
          },
          onReset: function(e,d) {
            $(e.target).attr("data-current-zoom",1);
            var maxScale = getMaxScale(e.target)
            $(e.target).attr("data-max-zoom",maxScale);
            $(e.target).panzoom("option", "maxScale", maxScale);   
            $(elem).attr("data-current-level", 0);
            manageZoomButtonStates()       
            $(e.target).find(".slide__loophole").each(function (i,loophole) {
              setTransformScale(loophole, 1)
            })
          }
        });*/
      });
    },1000)
  })

  $(".slide.zoomable").hover(function(e){
    //$(".slide").css('pointer-events','none')
  }, function(e){
    //$(".slide").css('pointer-events','all')
  })


  // de/activate range input
  $('#project .slides').on('init reInit afterChange',function(event){
    var zoom_available = $(this).find(".slick-current .zoomable").length > 0
    $('#project .slides').toggleClass('zoomable', zoom_available)
  })

  $('#project .slides').on('beforeChange',function(event){
    $('#project .slides').toggleClass('zoomable', false)
  })

  // zoom out on click
  
  $(".slide.zoomable").on('dblclick doubletap',function(e){

    /*if (lastPanned == 0) { // do not react the first time to allow discovery of pan
      lastPanned = 1
      return
    }*/
    
    if (zoomMode == true && ( Date.now() - lastPanned > 200) ) {
      e.stopPropagation()
      e.stopImmediatePropagation()
      leaveZoomMode()
    }
  })

  // zoom controls

  $('.zoom_button_plus').click(function(event){
    /*var elem = $(".slick-current .slide.zoomable").get(0);
    var level = parseInt($(elem).attr('data-current-level'));
    var maxLevels = parseInt($(elem).attr('data-max-level'));
    var newLevel = level + ( level < maxLevels ? 1 : 0 );
    // console.log(level, maxLevels, newLevel)
    doSoftZoom(newLevel, maxLevels)*/

    var timeout = 0;
console.log(currentZoomLevel, minZoomLevel)
    if(currentZoomLevel == minZoomLevel) {
      // hide image and loopholes
      enterZoomMode($(".slick-current .slide").get(0));
      timeout = 200;

    } 

    currentZoomLevel++;
    setTimeout(function() {
      leafletMap.setZoom(currentZoomLevel);  
    }, timeout);
    
  })
  
  $('.zoom_button_minus').click(function(event){
    /*var elem = $(".slick-current .slide.zoomable").get(0);
    var level = parseInt($(elem).attr('data-current-level'));
    var maxLevels = parseInt($(elem).attr('data-max-level'));
    var newLevel = level + ( level > 0 ? -1 : 0 );
    // console.log(level, maxLevels, newLevel)
    doSoftZoom(newLevel, maxLevels)*/

    currentZoomLevel--;
    if(currentZoomLevel <= minZoomLevel) {
      currentZoomLevel = minZoomLevel;
      // show image and loopholes
      setTimeout(leaveZoomMode, 200);
    }
    leafletMap.setZoom(currentZoomLevel);
  })

  // preload high resolution image after 6 seconds
  /*$("#project .slides").on('afterChange init', function(event, d){
    var currentIndex = d.currentSlide;
    setTimeout( function(){
      if ($("#project .slides img").filter(function(i,img){  return !this.complete }).length > 0) {
      } else {
        var nowCurrentIndex = $("#project .slides").slick('slickCurrentSlide')
        if (nowCurrentIndex === currentIndex) {
          console.log("preload")
          //insertZoomImage($(".slick-current .slide").get(0)) // disabled, need to be more refined. max 1 image downlaod at a time, because there are now progressive jpgs
        }
      }  
    }, 6000)
  })*/

})



function doSoftZoom(level, maxLevels) {
  var elem = $(".slick-current .slide.zoomable").get(0);
  var maxScale = parseFloat($(elem).attr('data-max-zoom'));
  
  console.log("going to zoom level " + level);

  /*var distortionFactor = 0.3; // smaller => larger steps at the beginning
  var weightedLevel =  level * (Math.pow(level, distortionFactor) / Math.pow(maxLevels, distortionFactor));
  var newScale = (maxScale-1)/maxLevels * weightedLevel;
  $(elem).addClass("force-transition")
  //$(elem).panzoom("zoom", newScale+1, {focal: {clientX:1400, clientY:1200}});*/
  
  console.log("leaflet has zoom level: " + leafletMap.getZoom() + " scaleZoom: " + leafletMap.getScaleZoom());

  leafletMap.setZoom(level);

  
  $(elem).attr("data-current-level", level);
  //$(elem).one("transitionend", function() {$(elem).removeClass("force-transition")} )

  // manage loophole scale
  var newScale = level;

  /*
  $(elem).find(".slide__loophole").each(function (i,loophole) {
    setTransformScale(loophole, newScale)
  })


  // manage zoomMode
  if (d.scale <= 1) {
    leaveZoomMode()
  } else {
    enterZoomMode($(".slick-current .slide").get(0))
  }

  // manage data attributes
  $(elem).attr('data-current-zoom',d.scale);

  // manage buttons
  manageZoomButtonStates()*/
            
}  

function roughly(number) {
  return Math.round(number * 1000) / 1000
}

L.HtmlIcon = L.Icon.extend({
  options: {
    /*
    html: (String) (required)
    iconAnchor: (Point)
    popupAnchor: (Point)
    */
  },

  initialize: function (options) {
    L.Util.setOptions(this, options);
  },

  createIcon: function () {
    var div = document.createElement('div');
    div.innerHTML = this.options.html;
    return div;
  },

  createShadow: function () {
    return null;
  }
});

function enterZoomMode(slide) {

  if (zoomMode == true) return
  zoomMode = true

console.log("entering zoom mode on slide ", slide)

  var $imageElem = $($(".slick-current .slide.zoomable").find(".slide__image img").get(0));
  $imageElem.css("visibility", "hidden")
  var $loopholesElem = $($(".slick-current .slide.zoomable .slide__loopholes"))
  $loopholesElem.css("visibility", "hidden")
  //insertZoomImage(slide, true)

  imgViewer = $imageElem.imgViewer2({
    onReady:function(elem){
        var map = this.getMap()
        var imgViewer2 = this
        imgViewer = this;

        map.options.maxBoundsViscosity = 0.3

        map.on('zoomend', function() {

          var cc = imgViewer2.getView()
          //console.log("current view rel coords: ", cc)

          var nw = imgViewer2.relposToLatLng(0,0)
          var se = imgViewer2.relposToLatLng(1,1)

          var bounds = L.latLngBounds(nw, se);

          //console.log(bounds)
          
          map.setMaxBounds(bounds)
        });

        $(".slick-current .slide_link").each( function(i,e) {
          var x = parseInt(e.style.left) / 100
          var y = parseInt(e.style.top) / 100
          var order = $(e).children("a").data("target-order");
          var loc = imgViewer2.relposToLatLng(x,y);
          var icon = new L.HtmlIcon({
              html : e.outerHTML,
          });          
          var marker = L.marker(loc, {icon: icon}).addTo(map);
          marker.on("click", function(event) {
            leaveZoomMode(function(event){
              setTimeout(function(event){
                navigateLoophole(event)
              },1)
            })
          })
        })

        console.log(this.getView())

      }
    });

  leafletMap = imgViewer.imgViewer2("getMap");
  currentZoomLevel = leafletMap.getZoom();
  console.log("initialized leaflet with zoom level " + currentZoomLevel);
  minZoomLevel = currentZoomLevel;

  var slides = $('.slides')
  $(slides).addClass('zoomed')
  $(slides).slick('slickSetOption','swipe',false)
  //console.log($(slides), "zoomMode on")


}

function leaveZoomMode(callback) {
  if (zoomMode == false) return

  console.log("leaving zoom mode");

  setTimeout( function() {
     var $imageElem = $($(".slick-current .slide.zoomable").find(".slide__image img").get(0));
    $imageElem.css("visibility", "visible")
    var $loopholesElem = $($(".slick-current .slide.zoomable .slide__loopholes"))
    $loopholesElem.css("visibility", "visible")

    imgViewer.imgViewer2("destroy");
    
    var slides = $('.slides')
    var zoomElem = $('.slide.zoomable')
    //$(zoomElem).panzoom("reset",{animate: true});

    //insertZoomImage(zoomElem, true)
    $(slides).removeClass('zoomed');
    currentZoomLevel=null;
    minZoomLevel=null;
    zoomMode = false;
    $(slides).slick('slickSetOption','swipe',true);
    if (callback) {callback()}
  }
  , 200);
  //console.log("zoomMode off")
}

function insertZoomImage(slide, activate) {
  if (activate===undefined) activate = false
  if (!$(slide).hasClass("zoomable")) return;
  if ($(slide).find(".zoomed-image").length >= 1) {
    if (activate) $(slide).find(".zoomed-image").css("visibility","visible")
    return
  }
  var imgElem = $(slide).find("img").get(0)
  var src = $(imgElem).attr('data-zoom-src')
  var imgElemZoom = $(imgElem).clone().removeAttr("srcset")
  imgElemZoom.attr('src',src).addClass("zoomed-image")
  if (!activate) imgElemZoom.css("visibility","hidden")
  setTimeout(function(){
    imgElemZoom.insertAfter(imgElem)
  },500) // make is smoother
}

function getMaxScale(elem) {
  var factor_x = $(elem).attr("data-width") / $(elem).innerWidth()
  var factor_y = $(elem).attr("data-height") / $(elem).innerHeight()
  var maxScale = Math.min(factor_x, factor_y)
  return maxScale;
}

function manageZoomButtonStates() {
  var plus = $('.zoom_button_plus');
  var minus = $('.zoom_button_minus');
  var scale = parseFloat($(".slick-current .slide.zoomable").attr('data-current-zoom'));
  var maxScale = parseFloat($(".slick-current .slide.zoomable").attr('data-max-zoom'));

  if (scale <= 1) {
    $(plus).attr("disabled", false);
    $(minus).attr("disabled", true);
  }
  else if (scale >= maxScale) {
    $(plus).attr("disabled", true);
    $(minus).attr("disabled", false);
  } else {
    $(plus).attr("disabled", false);
    $(minus).attr("disabled", false);
  }
}