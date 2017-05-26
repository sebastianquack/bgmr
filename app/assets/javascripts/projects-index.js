area_handler = false

$(document).on('turbolinks:load', function(){

  // tags

  $('#project_selection__tags').change(updateProjectsFilter)
  
  // area

  if (area_handler === false) {

    var moved = false;

    area_handler = $(document).on('click touchend',function(event){ // attached to document - take care not to do twice

      if (moved === true) { moved = false; return; }

      $container = $('#project_selection__areas')
      $target = $(event.target)
      var active = $container.hasClass("active")
  
      if (active) {
        setTimeout(function(){
          $container.removeClass("active")        // for touch delay
        }, 550)
        
      }
      else if ( event.target.tagName == "LABEL" && $target.hasClass('area') )  {
        $container.addClass("active") 
        event.preventDefault();
        event.stopPropagation()
        event.stopImmediatePropagation()
        return false;
      }
  
    })
    .on("touchmove", function(){
      moved = true;
    })
  }

  $('#project_selection__areas').change(updateProjectsFilter)

  // search

  $('#project_selection__search').on('keyup',updateProjectsFilter)

})


$(document).on('turbolinks:render', function(){
  // reset form on normal visits. let intact on restoration (browser back button) visits

  if (document.documentElement.hasAttribute("data-turbolinks-preview")) {
    // Turbolinks is displaying a preview
    var project_selection = $('#project_selection')
    if (project_selection.length > 0) {
      project_selection.get(0).reset()
      updateProjectsFilter()
    }
  }
}) 


function updateProjectsFilter() {

  // gather constraints
  var tagsList = $('#project_selection__tags input:checked')
    .map(function() {return $(this).val()})
    .get();

    console.log(tagsList)

  var area = $('#project_selection__areas input:checked').val()

  var search = $('#project_selection__search input').val()

  // make selectors
  var tagsSelector = $(tagsList).map(function(){return '[data-tags~=' +this+ ']'}).get().join("")

  var areaSelector = (area == "" ? '' : '[data-areas~=' +area+ ']')

  var searchSelector = (search == "" ? '' : '[title*="' +search+ '"i]')

  // combine selectors
  var allSelectors = tagsSelector + areaSelector + searchSelector

  console.log(allSelectors)

  var showElems = $('.project'+allSelectors)
  var hideElems = $('.project:not('+allSelectors+')')

  console.log("show " + showElems.length + ", hide " + hideElems.length)

  // filter
  if (allSelectors == "") {
    $(showElems).toggleClass("hidden", false)
  }
  else {
    $(hideElems).toggleClass("hidden", true)
    $(showElems).toggleClass("hidden", false)
  }

}