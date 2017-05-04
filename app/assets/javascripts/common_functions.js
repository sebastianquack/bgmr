// functions used in both admin and front end

function positionSlidelinks(img) {

  var slide_links = $(img).closest('.slide').find('.slide_links');

  var img_actual_width = img.naturalWidth/img.naturalHeight * img.height;

  var x_object_fit = (img.width - img_actual_width)/2 // assumes object-fit: contain
  var x_parent  = parseInt($(img).parent().css('marginLeft'), 10) + parseInt($(img).parent().css('paddingLeft'), 10);
  var x_parent2  = parseInt($(img).parent().parent().css('marginLeft'), 10) + parseInt($(img).parent().parent().css('paddingLeft'), 10);
  var x = x_object_fit + x_parent + x_parent2

  console.log("offset "+x_parent+ " "+x_parent2)

  var width = img_actual_width;

  var y_parent = parseInt($(img).parent().css('marginTop'), 10) + parseInt($(img).parent().css('paddingTop'), 10);
  var y_parent2 = $(img).parent().position().top;
  var y = y_parent + y_parent2

  var height = img.height;

  $s = $(slide_links)

  //$s.css("border","1px solid black")

  $s.css('left',x+'px');
  $s.css('top',y+'px');
  $s.css('width',width+'px');
  $s.css('height',height+'px');



}