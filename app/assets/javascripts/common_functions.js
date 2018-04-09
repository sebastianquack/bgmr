// functions used in both admin and front end

function positionSlidelinks(img) {

  var slide_links = $(img).closest('.slide').find('.slide_links');

  var naturalAR = img.naturalWidth/img.naturalHeight;
  var elementAR = img.width/img.height

  if (naturalAR/elementAR >= 1) {
    var img_actual_width = img.width
    var img_actual_height = img.naturalHeight/img.naturalWidth * img.width
  } else {
    var img_actual_width = img.naturalWidth/img.naturalHeight * img.height
    var img_actual_height = img.height
  }

  //console.log(naturalAR, elementAR, naturalAR/elementAR)

  //var img_actual_width = img.naturalWidth/img.naturalHeight * img.height;
  //var img_actual_height = img.naturalWidth/img.naturalHeight * img.height;

  //console.log(img, img.width, img.height, img.naturalWidth/img.naturalHeight)
  //console.log(slide_links, img.naturalWidth, img.naturalHeight, img_actual_width, img.height)

  var x_object_fit = (img.width - img_actual_width)/2 // assumes object-fit: contain
  var x_parent  = parseInt($(img).parent().css('marginLeft'), 10) + parseInt($(img).parent().css('paddingLeft'), 10);
  var x_parent2  = parseInt($(img).parent().parent().css('marginLeft'), 10) + parseInt($(img).parent().parent().css('paddingLeft'), 10);
  var x = x_object_fit + x_parent + x_parent2

  //console.log("offset "+x_parent+ " "+x_parent2, $(img).parent().parent())

  //var parents = parentUntilPositioned(img)
  //console.log(parents)

  var width = img_actual_width;

  var y_object_fit = (img.height - img_actual_height)/2 // assumes object-fit: contain
  var y_parent = parseInt($(img).parent().css('marginTop'), 10) + parseInt($(img).parent().css('paddingTop'), 10);
  var y_parent2 = $(img).parent().position().top;
  var y = y_object_fit + y_parent + y_parent2

  var height = img_actual_height;

  $s = $(slide_links)

  //$s.css("border","1px solid black")

  $s.css('left',x+'px');
  $s.css('top',y+'px');
  $s.css('width',width+'px');
  $s.css('height',height+'px');

  var obj = {
    'left':x+'px',
    'top':y+'px',
    'width':width+'px',
    'height':height+'px'
  }

  $(img).attr('data-actual-offset-left',obj.left)
  $(img).attr('data-actual-offset-width',obj.width)

  //console.log(obj)

  return obj
}

function parentUntilPositioned(elem) {
  var parents = []
  var parent;
  var position;
  do {
    parent = $(elem).parent()
    position = $(parent).css('position')
    parents.push(parent)
    //console.log(parent.tagName, position)
  }
  while ( parent != undefined && ['absolute','relative','fixed'].indexOf(position) < 0 )
}