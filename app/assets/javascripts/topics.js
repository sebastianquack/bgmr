// Place all the behaviors and hooks related to the matching controller here.

d_topics_topic_dot_base_radius = 80;
d_topics_topic_dot_padding = 10;
d_topics_topic_dot_border_width = 2;

desired_density = 0.9
max_iterations = 1e5

overlap = 2.5*d_topics_topic_dot_padding;

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

  // adjust base radius
  var elements_total = elements.length
  var elems_area = elements_total * Math.pow(2*d_topics_topic_dot_base_radius,2)
  var canvas_area = container_width * container_height
  var x = Math.sqrt( desired_density / (elems_area / canvas_area) )
  d_topics_topic_dot_base_radius = d_topics_topic_dot_base_radius * x*desired_density
  
  var positions = getRandomPositions(container_width, container_height, elements)

  for (var i = positions.length-1; i>=0; i--) {
    var e = $(elements).get(i)
    setTopicCSS(e, positions[i]);
  }
}

function setTopicCSS(e, position) {
  $(e).css('left',position.x + "px")
  $(e).css('top',position.y + "px")  
  var radius = position.radius
  $(e).css('width', 2*radius+'px');
  $(e).css('height', 2*radius+'px');
  $(e).find('.topic').css('width', (2*(radius-d_topics_topic_dot_padding-d_topics_topic_dot_border_width))+'px');
  $(e).find('.topic').css('height', (2*(radius-d_topics_topic_dot_padding-d_topics_topic_dot_border_width))+'px');
  $(e).css('font-size', radius+'px');
  $(e).addClass('positioned')
}

// calculates the radius from the css width and the number of projects for this topic
function getRadius(width, weight_category) {
  var weight_factor = weight_category * 0.25 + 0.5 // linear transformation for 3 categories => 0.75, 1, 1.25 
  return width * weight_factor;
}

// generates a random position for an element
function getRandomPosition(element, container_width, container_height, elements, i) {

  var elem_radius = getRadius(d_topics_topic_dot_base_radius, $(element).data("weight-category"));
  

  // var cluster_factor = (i/elements.length < 0.3 ? 0.7 : 1) // decrease the bounding box for the first elements so they cluster more in the center
  // var min_x = (elem_radius / cluster_factor) + 0.5 * (container_width - container_width*cluster_factor)
  // var max_x = ( container_width - elem_radius ) * cluster_factor;
  // var min_y = elem_radius / cluster_factor + 0.5 * (container_height - container_height*cluster_factor)
  // var max_y = ( container_height - elem_radius ) * cluster_factor;  

  var min_x = elem_radius
  var max_x = container_width - elem_radius
  var min_y = elem_radius
  var max_y = container_height - elem_radius

  //weighted_random_x = (1-Math.pow(2*Math.random()-1, 2))
  //weighted_random_y = (1-Math.pow(2*Math.random()-1, 2))

  //weighted_random_x = Math.sin(Math.PI * (Math.random()))
  //weighted_random_y = Math.cos(Math.PI * (Math.random() - 0.5))

  weighted_random_x = (1-Math.pow(2*Math.random()-1, 3))/2
  weighted_random_y = (1-Math.pow(2*Math.random()-1, 3))/2

  return {
    x: Math.round(weighted_random_x * (max_x-min_x) + min_x ),
    y: Math.round(weighted_random_y * (max_y-min_y) + min_y ),
    radius: elem_radius,
  }
}

// checks if a position overlaps too much with existing already positioned elements
function checkPosition(newPos, positions) {

  if (positions.length == 0) {
    return true;
  }

  Math.hypot = Math.hypot || function() {
    var y = 0, i = arguments.length;
    while (i--) y += arguments[i] * arguments[i];
    return Math.sqrt(y);
  };
  
  for (var i = positions.length-1; i >= 0; i--) {
    var other_x = positions[i].x
    var other_y = positions[i].y
    var other_radius = positions[i].radius;
    var dist = Math.hypot(other_x - newPos.x, other_y - newPos.y)

    //get min distance for each element 
    var min_distance = newPos.radius + other_radius - overlap;

    //console.log("dist: " + dist + ", min dist " + min_distance);

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
    
    var max_j = max_iterations; // maxumum iterations (very simple non-deterministic algorithm)
    for(var j = 0; j < max_j; j++) {
      
      // 1. get new random position
      var pos = getRandomPosition(elements[i], container_width, container_height, elements, i);
    
      // 2. check if this positions is possible
      if(checkPosition(pos, positions)) {
        positions.push(pos);
        //console.log("placed after " + j + " iterations")
        break;
      }       
    }
    // catch case where no position was ok
    if(j >= max_j) {
      console.log("canvas was too full, placing anyway");
      positions.push(pos);
    }
      
  }
  return positions
}