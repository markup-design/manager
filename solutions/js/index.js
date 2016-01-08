$(document).ready(function () {
	
	$("#accordion").accordion({
		heightStyle: "content"
	});
	
	$("button").button();
	
	$(".raw-activate").on("click", function () {
		
		$(this).parent().find(".raw-documentation").toggleClass("display-none");
	});
	
	/*
	My attempt to make some sort of color scheme in the <pre> tag code block
	
	$(".raw-documentation pre").each(function () {
		
		var text = $(this).text();
		
		var newText = replaceAll(text, "function", "<div class='function'>function</div>");
		
		$(this).html(newText);
	});*/
	
	function escapeRegExp(str) {
		return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
	}
	
	function replaceAll(str, find, replace) {
		
	  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
	}
});