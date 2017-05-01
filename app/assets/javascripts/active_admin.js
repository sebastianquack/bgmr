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

  $(".slide-move-button").click(initSlideMoveEvent);

});

$(document).on('has_many_add:after', '.has_many_container', function(e, fieldset, container) {
  $(container).find('.js-upload').on('change', function(){previewImage(this)});
  $(container).find('.slide_image img').on('load', function(){ positionSlidelinks(this) })
  $(container).find('.slide_link:not(.ui-draggable)').each(function(i,elem) {activateSlideLink(elem)});

  // initialize slide order value
  var slides = $("fieldset.slide");
  $(slides[slides.length-1]).find(".order_input").val(slides.length);

  $(".slide-move-button").off("click").click(initSlideMoveEvent);
});

$(document).on('has_many_remove:after', function(e) {
  // re-initialize slide order values after has_many_remove
  var slides = $("fieldset.slide");
  for(var i=0; i < slides.length; i++) {
    $(slides[i]).find(".order_input").val(i+1);  
  }
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


function initSlideMoveEvent(event) {

  // buttons to change slide order
  
    event.preventDefault();
    var slides = $("fieldset.slide");
    var myPosition = slides.index($(event.target).parent().parent().parent());
    console.log(myPosition);

    var myOrderInput = $("#project_slides_attributes_"+myPosition+"_order");
    var myOrderInputValue = myOrderInput.val();
        
    if($(event.target).hasClass("up")) {
      if(myPosition == 0) {
        console.log("this is top");
        alert("Slide ist bereits an erster Stelle.");
      } else {
        // change order field with previous slide
        var previousOrderInput = $("#project_slides_attributes_"+(myPosition-1)+"_order");
        var previousOrderInputValue = previousOrderInput.val();
        previousOrderInput.val(myOrderInputValue);
        myOrderInput.val(previousOrderInputValue);

        // move elemet up in DOM
        $(slides[myPosition]).insertBefore(slides[myPosition-1]);

        updateSlideLinksAfterMove(myOrderInputValue, previousOrderInputValue);
      }
    }
    if($(event.target).hasClass("down")) {
      if(myPosition + 1 == slides.length) {
        console.log("this is bottom");
        alert("Slide ist bereits an letzter Stelle.");
      } else {
        // exchange order field with next slide
        var nextOrderInput = $("#project_slides_attributes_"+(myPosition+1)+"_order");
        var nextOrderInputValue = nextOrderInput.val();
        nextOrderInput.val(myOrderInputValue);
        myOrderInput.val(nextOrderInputValue);

        // move elemet down in DOM
        $(slides[myPosition+1]).insertBefore(slides[myPosition]);

        updateSlideLinksAfterMove(myOrderInputValue, nextOrderInputValue);
      }
    }
  
}

function updateSlideLinksAfterMove(value1, value2) {  
  var slides = $("fieldset.slide");
  var slideLinkSelects = $("fieldset .slide_link select");
  slideLinkSelects.each(function(index, select) {
    $(select).find("option").each(function(index, option) {
      if(option.innerHTML == value1) {
        $(option).html(value2);
      }
      else if(option.innerHTML == value2) {
        $(option).html(value1);
      }
    });
  });
}
