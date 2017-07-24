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
  
  var positions = getRandomPositions(container_width, container_height, elements)

  for (var i = positions.length-1; i>=0; i--) {
    var e = $(elements).get(i)
    $(e).css('left',positions[i].x + "px")
    $(e).css('top',positions[i].y + "px")
    //TODO: set size for element
    //$(e).css('width', getRadius($(e).outerWidth(), $(e).data("projects")));
    $(e).addClass('positioned')
  }
}

// calculates the radius from the css width and the number of projects for this topic
function getRadius(width, projects) {
  var weight = 1;
  if(projects > 5) {
    weight = 1.5;
  }
  if(projects > 10) {
    weight = 2;
  }
  if(projects > 15) {
    weight = 2.5;
  }
  return width * weight;
}

// generates a random position for an element
function getRandomPosition(element, container_width, container_height) {

  var elem_radius = getRadius($(element).outerWidth(), $(element).data("projects"));
  
  var min_x = 0.5 * elem_radius
  var max_x = container_width - 0.5 * elem_radius;
  var min_y = 0.5 * elem_radius
  var max_y = container_height - 0.5 * elem_radius;  
  return {
    x: Math.round(Math.random() * (max_x-min_x) + min_x ),
    y: Math.round(Math.random() * (max_y-min_y) + min_y )
  }
}

// checks if a position overlaps too much with existing already positioned elements
function checkPosition(element, newPos, positions, elements) {

  if (positions.length == 0) {
    return true;
  }
  for (var i = positions.length-1; i >= 0; i--) {
    var other_x = positions[i].x
    var other_y = positions[i].y
    var dist = Math.hypot(other_x - newPos.x, other_y - newPos.y)
    //console.log(j, "dist: " + dist)

    //get min distance for each element with radius
    var min_distance = getRadius($(elements[i]).outerWidth(), $(elements[i]).data("projects")) * 0.62;

    if (dist < min_distance) { // does not fit
      //console.log("didn't fit")
      return false;
    }
  }

  return true;
}

function getRandomPositions(container_width, container_height, elements) {
  
  var positions = []; // final positions go here - index corresponds to index of elements
  for (var i = 0; i < elements.length; i++) {
    //console.log(positions)
    
    var max_j = 100; // maxumum iterations (very simple non-deterministic algorithm)
    for(var j = 0; j < max_j; j++) {
      
      // 1. get new random position
      var pos = getRandomPosition(elements[i], container_width, container_height);
    
      // 2. check if this positions is possible
      if(checkPosition(elements[i], pos, positions, elements)) {
        positions.push(pos);
        break;
      }       
    }
    // catch case where no position was ok
    if(j >= max_j) {
      console.log("canvas was too full, placing anyway");
      positions.push(pos);
    }
      
  }
  //console.log("finished after " + i + " iterations")
  return positions
}