// zoooooooooom

var zoomMode = false
var lastPanned = 0
var leafletMap = null
var imgViewer = null

var currentZoomLevel = null;
var zoomStep = null;
var minZoomLevel = null;
var maxZoomLevel = 10;
var mapLeftOffset = 0;

$(document).on('turbolinks:load', function(){

  $(window).on("orientationchange", function() {
    leaveZoomMode();
  })

  $('#project .slides').on('init reInit afterChange',function(event){
    leaveZoomMode() // just in case
    setTimeout(function(){
      $(".slick-current .slide.zoomable").each(function(i,elem){

        manageZoomButtonStates();
        
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

  // zoom controls: in

  $('.zoom_button_plus').click(function(event){

    var timeout = 0;
    
    //console.log("zoom in ",currentZoomLevel, minZoomLevel)

    if(currentZoomLevel == minZoomLevel) {
      // hide image and loopholes
      enterZoomMode($(".slick-current .slide").get(0));
      timeout = 200;
    } 

    if (currentZoomLevel > 0) {
      return // max zoom level reached
    } 

    newZoomLevel = currentZoomLevel + zoomStep;
    //console.log("new zoom level: " + newZoomLevel)

    if (currentZoomLevel > 0) {
      setZoomButtonState("zoom_out")
    } else {
      setZoomButtonState("zoom_both")
    }

    setTimeout(function() {
      leafletMap.setZoom(newZoomLevel);  
    }, timeout);
    
  })

  // zoom controls: out
  
  $('.zoom_button_minus').click(function(event){

    setZoomButtonState("zoom_both")

    newZoomLevel = currentZoomLevel - zoomStep;
    if(newZoomLevel <= minZoomLevel) {
      newZoomLevel = minZoomLevel;
      // show image and loopholes
      setTimeout(leaveZoomMode, 200);
    }
    leafletMap.setZoom(newZoomLevel);
  })

})

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

  //console.log("entering zoom mode on slide ", slide)

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
          if (!zoomMode) return;

          var cc = imgViewer2.getView()
          //console.log("current view rel coords: ", cc)

          var nw = imgViewer2.relposToLatLng(0,0)
          var se = imgViewer2.relposToLatLng(1,1)

          var bounds = L.latLngBounds(nw, se);

          //console.log(bounds)
          
          map.setMaxBounds(bounds)

          currentZoomLevel = leafletMap.getZoom();
          //console.log("current zoom level: ", currentZoomLevel)
        });

        leafletMap = map;
        currentZoomLevel = leafletMap.getZoom();
        //console.log("initialized leaflet with zoom level " + currentZoomLevel);
        minZoomLevel = currentZoomLevel;
        setZoomButtonState("zoom_in")

        var slides = $('.slides')
        $(slides).addClass('zoomed')
        $(slides).slick('slickSetOption','swipe',false)
        //console.log($(slides), "zoomMode on")        

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
            var evt = event
            leaveZoomMode(function(){
              setTimeout(function(){
                navigateLoophole(order)
              },1)
            })
          })
        })

        //console.log(this.getView())

      }
    });

  // set maximum zoom
  zoomMax = Math.pow(Math.abs(currentZoomLevel),2)
  zoomStep = Math.abs(currentZoomLevel)/3
  //console.log("zoomMax: ", zoomMax, " zoomStep: ", zoomStep)
  //var x = imgViewer.imgViewer2("leafletZoom", zoomMax);
  //console.log(x)
  //console.log(imgViewer.imgViewer2("getZoom"))

  imgViewer.imgViewer2("option", "zoomMax", Math.abs(zoomMax));

}

function leaveZoomMode(callback) {
  if (zoomMode == false) return

  //console.log("leaving zoom mode");

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
    currentZoomLevel=null;
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

function setZoomButtonState(state) { // "zoom_in" "zoom_out" "zoom_both"
  var plus = $('.zoom_button_plus');
  var minus = $('.zoom_button_minus');

  //console.log("zoom buttons: " + state)

  if (state == "zoom_in") {
    $(plus).attr("disabled", false);
    $(minus).attr("disabled", true);
  } else if (state == "zoom_out") {
    $(plus).attr("disabled", true);
    $(minus).attr("disabled", false);
  } else {
    $(plus).attr("disabled", false);
    $(minus).attr("disabled", false);    
  }
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


function roughly(number) {
  return Math.round(number * 1000) / 1000
}