$(document).ready(function () {
	
	$(".application").accordion({
		active: false,
		collapsible: true,
		heightStyle: "content" 
	});
	
	/**
		Handle encodes.
	*/
	$("#encode-html").button().on("click", function () {
		
		var html = $("#encode-html-io").val();
		
		var encodedHTML = htmlEncode(html);
		
		$("#encode-html-io").val(encodedHTML);
	});
});

/**
	Encode html.
*/
function htmlEncode(value){
	
  //create a in-memory div, set it's inner text(which jQuery automatically encodes)
  //then grab the encoded contents back out.  The div never exists on the page.
  return $('<div/>').text(value).html();
}

/**
	Decode html.
*/
function htmlDecode(value){
  return $('<div/>').html(value).text();
}