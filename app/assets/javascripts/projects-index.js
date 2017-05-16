$(document).on('turbolinks:load', function(){

  // tags

  $('#project_selection__tags').change(updateProjectsFilter)
  
  // area

  $(document).on('click',function(event){

    $container = $('#project_selection__areas')
    $target = $(event.target)
    var active = $container.hasClass("active")
    console.log(event.target, active, event.target.tagName)

    if (active) {
      console.log("close")
      $container.removeClass("active")      
    }
    else if ( event.target.tagName == "LABEL" && $target.hasClass('area') )  {
      console.log("activate")
      $container.addClass("active") 
      event.preventDefault();
      event.stopPropagation()
      event.stopImmediatePropagation()
      return false;
    }

  })

  $('#project_selection__areas').change(updateProjectsFilter)

  // search

  $('#project_selection__search').on('keyup',updateProjectsFilter)

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

  var showSelector = '.project'+allSelectors

  console.log(showSelector)

  // filter
  $('.project').hide()  
  $(showSelector).show()
}