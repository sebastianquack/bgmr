// Place all the behaviors and hooks related to the matching controller here.

d_topics_topic_dot_base_radius = 80;
d_topics_topic_dot_padding = 10;
d_topics_topic_dot_border_width = 2;

desired_density = 0.8

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
  
  var cluster_factor = (i/elements.length < 0.5 ? 0.8 : 1) // decrease the bounding box for the first elements so they cluster more in the center

  console.log(cluster_factor)

  var min_x = elem_radius / cluster_factor
  var max_x = ( container_width - elem_radius ) * cluster_factor;
  var min_y = elem_radius / cluster_factor
  var max_y = ( container_height - elem_radius ) * cluster_factor;  
  return {
    x: Math.round(Math.random() * (max_x-min_x) + min_x ),
    y: Math.round(Math.random() * (max_y-min_y) + min_y ),
    radius: elem_radius,
  }
}

// checks if a position overlaps too much with existing already positioned elements
function checkPosition(newPos, positions) {

  if (positions.length == 0) {
    return true;
  }
  for (var i = positions.length-1; i >= 0; i--) {
    var other_x = positions[i].x
    var other_y = positions[i].y
    var other_radius = positions[i].radius;
    var dist = Math.hypot(other_x - newPos.x, other_y - newPos.y)

    //get min distance for each element 
    var min_distance = newPos.radius + other_radius - 2.2*d_topics_topic_dot_padding;

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
    
    var max_j = 300; // maxumum iterations (very simple non-deterministic algorithm)
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