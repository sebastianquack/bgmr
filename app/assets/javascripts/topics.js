// Place all the behaviors and hooks related to the matching controller here.

// event bindings

$(document).on('turbolinks:load', function(){
  if ($('#topics').length > 0) {
    placeTopics()
  }
});

$(window).on('resize', function(){
  if ($('#topics').length > 0) {
    resetTopics()
    debouncedPlaceTopics()
  }
});

$(document).on('turbolinks:visit, turbolinks:before-cache', function(){
  if ($('#topics').length > 0) {
    resetTopics()
  }
});

// functions

var debouncedPlaceTopics = debounce(function() {
  placeTopics()
}, 550);

function resetTopics() {
  var container_elem = $('#topics.topics_canvas').get(0)
  var elements = $(container_elem).find('.topic_container')
  $(elements).removeClass("positioned")
}

function placeTopics() {
  var container_elem = $('#topics.topics_canvas').get(0)
  var container_width = container_elem.offsetWidth;
  var container_height = container_elem.offsetHeight;

  var elements = $(container_elem).find('.topic_container')

  var number_of_elements = elements.length;
  var elem_radius = $(elements).get(0).offsetWidth;
  var overlap_radius = elem_radius * 0.62;

  var positions = getRandomPositions(container_width, container_height, elem_radius, overlap_radius, number_of_elements)

  for (var i = positions.length-1; i>=0; i--) {
    var e = $(elements).get(i)
    $(e).css('left',positions[i].x + "px")
    $(e).css('top',positions[i].y + "px")
    $(e).addClass('positioned')
  }
}

function getRandomPositions(container_width, container_height, elem_radius, overlap_radius, number_of_elements) {
  //console.log(container_width, container_height, elem_radius, number_of_elements)
  var max_i = 100; // maxumum iterations (very simple non-deterministic algorithm)

  var min_x = 0.5 * elem_radius
  var max_x = container_width - 0.5 * elem_radius;
  var min_y = 0.5 * elem_radius
  var max_y = container_height - 0.5 * elem_radius;  
  var min_distance = overlap_radius;
  var positions = []; // final positions go here
  for (i = 0; i < max_i; i++) {
    //console.log(positions)
    // all done?
    if (positions.length >= number_of_elements) {
      break;  
    }
    // 1. get random positions
    var x = Math.round(Math.random() * (max_x-min_x) + min_x );
    var y = Math.round(Math.random() * (max_y-min_y) + min_y );
    // 2. check if this positions os possible
    if (positions.length == 0) {
      positions.push({ x:x, y:y })
      continue;
    }
    for (j = positions.length-1; j >= 0 ; j--) {
      var other_x = positions[j].x
      var other_y = positions[j].y
      var dist = Math.hypot(other_x-x, other_y-y)
      //console.log(j, "dist: " + dist)
      if (dist < min_distance) { // does not fit
        //console.log("didn't fit")
        break; 
      }
    }

    if (j == -1) { // did fit
      //console.log("adding "+x+","+y)
      positions.push({ x:x, y:y })
    }

    //console.log(j)

  }
  //console.log("finished after " + i + " iterations")
  return positions
}