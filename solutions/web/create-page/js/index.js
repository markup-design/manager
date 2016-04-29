$(document).ready(function () {
	
	$("button").button();
	
	checkPageType();
	
	$("#page-type").on("change", function () {
		
		checkPageType();
	});
	
	function checkPageType () {
		
		var value = $("#page-type").val();
		
		if (value === "index") {
			
			$("#page-name").val("index").parent().addClass("display-none");
		}
		else $("#page-name").val("").parent().removeClass("display-none");
	};
});