#= require active_admin/base
#= require ckeditor-jquery
#= require jquery-fileupload/basic

$(document).on("ready",function() {
  $('.js-upload').on('change', function(){previewImage(this)});
});

function previewImage(input) {
  var preview = $(input).siblings(".inline-hints").find("img").get(0);
  console.log(preview);
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {

      preview.setAttribute('src', e.target.result);

      var img = preview;
      var canvas = document.createElement("canvas");

      img.width = (img.width * 0.1) / 100
      img.height = (img.height * 0.1) / 100

      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);

      

      console.log(e)
      
    }
    reader.readAsDataURL(input.files[0]);
  } else {
    preview.setAttribute('src', 'placeholder.png');
  }
}