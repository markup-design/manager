$(document).ready(function () {
	
	var initHeight = $(window).height();
	var initWidth = $(window).width();
	
	console.log("Window Dimensions [h: "+initHeight+"px, w: "+initWidth+"px]");
	
	var $iContainer = $("<div/>", {
		"class":"image-container"
	}).appendTo("#gallerize");
	
	var totalWidth = 0;
	$("#gallerize .image").each(function () {
		
		var $img = $(this);
		var imgWidth = parseInt($img.width());
		totalWidth += imgWidth+42;
		
		var $dImage = $img.detach();
		$dImage.appendTo($iContainer);
	});
	
	$iContainer.width(totalWidth);
});