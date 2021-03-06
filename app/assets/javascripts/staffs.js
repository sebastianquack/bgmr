$(document).on('turbolinks:load', initStaffsTrigger)
$(document).on('turbolinks:load', initStaffsRows)
$(document).on('turbolinks:load', initCompanySlider)
$(window).on('resize', initStaffsRows)

function initStaffsRows(){
  var items = $(".staffs_list_entry");
  
  // init
  $(items).css("height","initial")
  $(items).css("max-height","initial")

  // get row data
  items.addClass("no-transition").css("visibility","hidden")
  items.addClass("show_cont")
  var rowsOpen = getRows(items)
  items.removeClass("show_cont")
  var rowsClosed = getRows(items)
  items.removeClass("no-transition").css("visibility","visible")

  // set height, max-height
  $(rowsClosed).each(function(index,row){
    $(row.items).each(function(index2, item){
      $(item).css("height", rowsClosed[index].height)
      $(item).css("max-height", rowsOpen[index].height)
      $(item).attr("data-row", rowsOpen[index].row_index)
    })
  })
}

function initStaffsTrigger(){
  var items = $(".staffs_list_entry");
  // bind trigger
  items.click(function(event){
    if ($(event.target).hasClass("read_more")) {
      var row = $(this).attr("data-row")
      var row_items = $('[data-row='+row+']')
      if ($(row_items).filter(".show_cont").length == 0 && $(this).css("max-height") != $(this).css("height")){
        $(row_items).css("height",$(this).css("max-height"))
        $(this).one("transitionend", function(){
          $(this).addClass("show_cont")
        })
      }
      else {
        $(this).addClass("show_cont")
      }
    }
  })
}  

function getRows(items) {
  // find tallest item per row
  var list = []
  var list_index = -1
  var last_top = 0
  items.each(function(index,item){
    var top = $(item).offset().top
    var height = $(item).height()
    if (top != last_top) {
      list_index++
      list.push({
        row_index: list_index,
        top: top,
        height: height,
        items: [item],
      })
      last_top = top
    }
    else {
      if (height > list[list_index].height) {
        list[list_index].height = height
      }
      list[list_index].items.push(item)
    }
  })
  return list  
}

function initCompanySlider(){
  var $company_slides = $('#staffs .company_image')

  $company_slides.on('init', initCompanySliderCursor);

  $company_slides.slick({
    autoplay: true,
    adaptiveHeight: true,
    arrows: false,
    fade: true,
    autoplaySpeed: 7000,
    speed: 1500,
    waitForAnimate: false,
    pauseOnHover: false,
    pauseOnFocus: false,
    infinite: true,
    lazyLoad:  'progressive',
  })
}

function initCompanySliderCursor(event, slick){

  // set slide direction left or right depending on cursor position

  currentCursorDirection = false // reset

  $this = $(this)

  $this.mousemove(function(event){
    //console.log(event.pageX, window.innerWidth)
    if (event.pageX > window.innerWidth/2) { // if pointer is in the right half of the window
      var cursorDirection = 'right'
    }
    else {
      var cursorDirection = 'left'
    }
    if (cursorDirection != currentCursorDirection) {
      if (cursorDirection == "left") {
        $this.toggleClass('cursorLeft',true)
        $this.toggleClass('cursorRight',false)
      }
      else {
        $this.toggleClass('cursorLeft',false)
        $this.toggleClass('cursorRight',true)        
      }
      currentCursorDirection = cursorDirection
    }
  }) 

  // handle click  

  $this.on('click', function(){
    var $slides = $(this)
    if (currentCursorDirection == "left") {
      $this.slick('slickPrev')
    }
    else {
      $this.slick('slickNext')
    }
  })
}
