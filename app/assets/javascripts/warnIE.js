window.onload = function() {
	if (navigator.appName == 'Microsoft Internet Explorer' ||  !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)) || (typeof $.browser !== "undefined" && $.browser.msie == 1))
	{
	  isIE = true;
	  $("body").addClass("IE");
	  setTimeout(function(){
	  	alert("Diese Seite ist nicht für Internet Explorer optimiert. Bitte benutzen Sie einen aktuellen Browser.");	
	  },500)
	}
}