
// progressively load images

$(document).on('turbolinks:load', function(){
  setTimeout(loadNext, 1000)
});

function loadNext() {
  var img = $('img[data-src]').get(0)
  if (!img) return;
  img.setAttribute('srcset', img.getAttribute('data-srcset'));
  img.setAttribute('src', img.getAttribute('data-src'));
  img.removeAttribute('data-src');
  $(img).on("load", loadNext)
  setTimeout(loadNext, 1500)
}
