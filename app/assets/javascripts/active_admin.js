#= require active_admin/base
#= require ckeditor-jquery
#= require jquery-fileupload/basic

$(document).on("ready",function() {
  $('.js-upload').on('change', function(){ previewImage(this) });
  $('.slide_image img').on('load', function(){ positionSlidelinks(this) })
  $('.slide_link').each(function(i,elem) {activateSlideLink(elem)});
  $('.has_many_delete input[type="checkbox"]').on('change', function(){
    $(this).closest('.has_many_fields').toggleClass('delete_checked')
  })
});

$(document).on('has_many_add:after', '.has_many_container', function(e, fieldset, container) {
  $(container).find('.js-upload').on('change', function(){previewImage(this)});
  $(container).find('.slide_image img').on('load', function(){ positionSlidelinks(this) })
  $(container).find('.slide_link:not(.ui-draggable)').each(function(i,elem) {activateSlideLink(elem)});
});

$(window).on('resize', function(){ 
  $('.slide_image img').each(function(i,elem){ 
    positionSlidelinks(elem) 
  });
});

function activateSlideLink(elem) {

  var target_x = $(elem).find('.pos_x')
  var target_y = $(elem).find('.pos_y')

  var orig_x = $(target_x).val()
  var orig_y = $(target_y).val()

  $(elem).css('left', orig_x+"px")
  $(elem).css('top', orig_y+"px")

  $(elem).draggable()
  $(elem).on('dragstop', function(event){
    var val_x = $(this).position().left
    var val_y = $(this).position().top

    $(target_x).val(val_x)
    $(target_y).val(val_y)

    console.log("dragstop", elem, target_x, orig_x, val_x)
  })
}

function previewImage(input) {
  var preview = $(input).siblings(".inline-hints").find("img").get(0);
  console.log(preview);
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {


      preview.setAttribute('src', e.target.result);

      console.log(preview)
      
    }
    reader.readAsDataURL(input.files[0]);
  } else {
    preview.setAttribute('src', 'placeholder.png');
  }
}

function positionSlidelinks(img) {
  var slide_links = $(img).closest('.slide').find('.slide_links');

  var img_actual_width = img.naturalWidth/img.naturalHeight * img.height;

  var x_object_fit = (img.width - img_actual_width)/2 // assumes object-fit: contain
  var x_parent  = parseInt($(img).parent().css('marginLeft'), 10) + parseInt($(img).parent().css('paddingLeft'), 10);
  var x_parent2  = parseInt($(img).parent().parent().css('marginLeft'), 10) + parseInt($(img).parent().parent().css('paddingLeft'), 10);
  var x = x_object_fit + x_parent + x_parent2

  var width = img_actual_width;

  var y_parent = parseInt($(img).parent().css('marginTop'), 10) + parseInt($(img).parent().css('paddingTop'), 10);
  var y_parent2 = $(img).parent().position().top;
  var y = y_parent + y_parent2

  var height = img.height;

  $(slide_links).css('left',x+'px');
  $(slide_links).css('top',y+'px');
  $(slide_links).css('width',width+'px');
  $(slide_links).css('height',height+'px');
}

$(document).on('has_many_remove:after', '.has_many_container', function(e, fieldset, container) {
  //var list_item_count;
  //list_item_count = container.find('.has_many_fields').length;
  //return alert("There are now " + list_item_count + " items in the list");
});

