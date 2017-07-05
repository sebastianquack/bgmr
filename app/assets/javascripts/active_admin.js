#= require active_admin/base
#= require ckeditor-jquery
#= require ckeditor/config.js
#= require blueimp-file-upload/js/jquery.fileupload.js
#= require common_functions
#= require activeadmin_reorderable

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

  if ($(fieldset).hasClass('slide_link')) {
    $(fieldset).addClass("new").css('left','50%').css('top','50%')
  }

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

  $(elem).css('left', orig_x+"%")
  $(elem).css('top', orig_y+"%")

  $(elem).draggable()
  $(elem).on('dragstop', function(event){
    var val_x = $(this).position().left
    var val_y = $(this).position().top
    var parent_width = $(this).parent().width()
    var parent_height = $(this).parent().height()
    var val_x_percentage = 100*val_x/parent_width
    var val_y_percentage = 100*val_y/parent_height

    $(this).css('left',val_x_percentage+"%")
    $(this).css('top',val_y_percentage+"%")
    $(target_x).val(val_x_percentage)
    $(target_y).val(val_y_percentage)

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
