$(document).ready(function () {
	
	// add jQuery to submit button
	$("button[type='submit']").button();
	
	// select all options in the includes before submitting
	$("form").submit(function () {
		
		$(this).find("select[multiple] option").prop("disabled", false).attr("selected", "selected");
	});
	
	var $fi = $("#file-includes");
	
	// add file include button
	$("#add-file-include")
	.button({
		text: false,
		icons: {
			primary: "ui-icon-plusthick"
		}
	})
	.on("click", function () {
		
		var r = prompt("Relative path to file\nEx: css/index.css", "");
		
		if (r) {
			
			$("<option/>", {
				"value":r,
				"text":r
			}).appendTo($fi);
		}
	});
	
	// file include select
	$fi.on("click", function () {
		
		var selected = $fi.find("option:selected").length;
		
		if (selected > 0) $("#remove-file-include").button("option", "disabled", false);
		else $("#remove-file-include").button("option", "disabled", true);
	});
	
	// remove file include button
	$("#remove-file-include")
	.button({
		text: false,
		icons: {
			primary: "ui-icon-trash"
		}
	})
	.on("click", function () {
		
		$fi.find("option:selected").remove();
		
		$("#remove-file-include").button("option", "disabled", true);
	});
	
	checkPageType();
	
	// when the page type changes
	$("#page-type").on("change", function () {
		
		checkPageType();
	});
	
	// open file manager on click
	$("#relative-path-button")
	.button({
		text: false,
		icons: {
			primary: "ui-icon-folder-collapsed"
		}
	})
	.qtip({
		content: {
			text: "Click to browse folder structure and select path. [Coming soon!]"
		},
		position: {
			my: 'left center',
			at: 'right center',
		},
		style: {
			widget: true, // Use the jQuery UI widget classes
			def: false // Remove the default styling (usually a good idea, see below)
		}
	}).on("click", function () {
		
	});
	
	$("[info]").each(function () {
		
		var info = $(this).attr("info");
		
		$(this).qtip({
			content: {
				text: info
			},
			position: {
				my: 'left center',
				at: 'right center',
			},
			style: {
				widget: true, // Use the jQuery UI widget classes
				def: false // Remove the default styling (usually a good idea, see below)
			}
		});
	});
	
	
	/**
		This will hide the name field if page type is home/index, because
		it should auto default to index.php and create necessary files.
	*/
	function checkPageType () {
		
		var $pt = $("#page-type");
		var value = $pt.val();
		
		switch (value) {
			
			case "index":
			
				$("#page-name").val("index").parent().addClass("display-none");
			break;
			
			default:
				$("#page-name").val("").parent().removeClass("display-none");
			break;
		}
	};
});