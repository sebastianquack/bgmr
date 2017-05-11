// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};


//// functions for expandable ////

function auto_set_height(elem) {
  var $elem = $(elem)
  var actualHeight = $elem.height();
  var scrollHeight = elem.scrollHeight;
  console.log(actualHeight, scrollHeight)
  if (actualHeight < 0.5 * scrollHeight) {
    $elem.css('height', scrollHeight)  
    $elem.one('transitionend', function(){
      $elem.css('height', 'auto')
    })
  }
  else {
    $elem.css('height', actualHeight)  
  }
    
}

function toggle_expandable(elem, options) {
  console.log(elem)
  var rootElem = $(elem).closest(options.root).get(0)
  var autoHeightElem = $(rootElem).find(options.autoHeight).get(0)
  auto_set_height(autoHeightElem);
  setTimeout(function(){
    $(rootElem).toggleClass('open');
  },1)
}
