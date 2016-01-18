$(document).ready(function () {
	
	$("button").button();
	
	function escapeRegExp(str) {
		return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
	}
	
	function replaceAll(str, find, replace) {
		
	  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
	}
});