$(document).ready(function () {
	
	var $g = $("#gallerize").gallerize({
		gType: "art-by-bug"
	});
	
	// create dialog to preview images being uploaded before submitting
	var $iUploadDialog = $("#image-upload-dialog").dialog({
		autoOpen: false,
		width: 800,
		minWidth: 800,
		height: 550,
		minHeight: 550,
		title: "Image Uploader",
		buttons: {
			
			"Upload" : function () {
				
				$("#upload-file-form").submit();
			},
			
			"Close" : function () {$(this).dialog("close");}
		}
	});
	
	// handle new image uploads
	$("#new-image").on("change", function (e) {
		
		var files = e.target.files;
		
		var $uic = $iUploadDialog.find(".image-container");
		$uic.empty();
		
		if (files.length > 0) {
			
			for (var i = 0; i < files.length; i++) {
				
				var file = files[i];
				
				// Only process image files.
				if (!file.type.match('image.*')) {
					continue;
				}
				
				// append the file to the image upload tool dialog box
				var result = appendFile(file, $uic, function (message) {
					
					// this will make the system wait until each image is done loading
					console.log(message);
				});
				
				// the only reason this is false is because of a duplicate name
				if (result === false) { 
				
					alert("Duplicate name found! Please rename ["+file.name+"] image and try again.");
				}
			}
			
			$iUploadDialog.dialog("open");
		}
		else console.log("[SERVER] No files chosen!");
	});
	
	/**
		Pre loads an image file and appends it to the element provided.
		@param event (Javascript Event) Event triggered or could be an object containing the files.
		@param $element (jQuery) Element to append the image.
	*/
	var appendFile = function (f, $element, callback) {
		
		// get the entire file name with extension
		var fileName = f.name;
		
		// get only the name of the file
		var fSplit = fileName.split(".");
		var onlyName = fSplit[0];
		var fileExt = fSplit[1];
		
		// get the file size
		var fileSize = f.size;
		
		// get the file size in MB and round to nearest 10th
		var fileSize = Math.round(10*(fileSize/1024/1024))/10;
		
		// if it is greater than 1 we have MB
		if (fileSize > 1) {
			
			fileSize += " (MB)";
		}
		else {
			
			// if less than 1 we have KB
			fileSize = (fileSize*1024)+" (KB)";
		}
		
		var imageNameDup = false;
		$element.find(".image img").each(function () {
			
			var thisName = $(this).attr("name");
			
			if (onlyName === thisName) {
				
				imageNameDup = true;
				return false; // break each loop
			}
		});
		
		// if we found an image name duplicate
		if (imageNameDup) return false;
		
		// create image container
		var $ic = $("<div/>", {
			"class":"image"
		}).appendTo($element);
		
		// create image name
		var $iName = $("<div/>", {
			"class":"image-name",
			"title":"click to assign name",
			"text":onlyName
		}).appendTo($ic);
		
		// create an image element and append it to the given element
		var $i = $("<img/>").appendTo($ic);
		
		// set name
		$i.attr("name", onlyName);
		
		// set extension
		$i.attr("ext", fileExt);
		
		// set extension
		$i.attr("size", fileSize);
		
		// create image file size
		var $iFileSize = $("<div/>", {
			"class":"image-file-size",
			"text":fileSize
		}).appendTo($ic);
		
		// init the file reader
		var reader = new FileReader();
		
		// handle what happens when image is loaded
		reader.onload = function () {
			
			// load in the image
			$i.attr("src", reader.result);
			
			// send callback message
			callback("[SERVER] Successfully loaded "+onlyName+"!");
		};
		
		// handle image load errors
		reader.onerror = function () {
			
			callback("[SERVER] Error loading ["+onlyName+"."+fileExt+"]");
		};

		// Read in the image file as a data URL.
		reader.readAsDataURL(f);
	}
});