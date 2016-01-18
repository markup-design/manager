$.widget( "solutions.gallerize", {
   
	// Default options.
    options: {
		gType: false // default is false, this will output all pictures in a straight line
	},
   
	_create: function() {
		
		var $w = this;
		var $el = $w.element;
		
		// make sure create only happens once
		if (!$el.hasClass(".gallerize")) {
			
			// add gallerize class
			$el.addClass(".gallerize");
			
			// change the type to display the images
			$w.changeType();
		}
    },
	
	/**
		Calling the public destroy method will trigger this.
	*/
	_destroy: function () {
		
		var $w = this;
		var $el = $w.element;
	},
	
	_addControls: function () {
		
		var $w = this;
		var $el = $w.element;
		
		// list of known types; from changeType method's switch statement
		var knownTypes = ["art-by-bug", "default"];
		
		// create control container
		var $cc = $("<div/>", {
			"id":"gallerize-controls",
			"class":"gallerize-control-container"
		}).insertBefore($el);
		
			// create button container
			var $bc = $("<div/>", {
				"class":"gallerize-button-container"
			}).appendTo($cc);
			
				// go through each known type and add a button to switch the gallerize display
				for (var x in knownTypes) {
					
					var typeName = knownTypes[x];
					
					// create button container
					var $b = $("<button/>", {
						"class":"gallerize-button",
						"type":"button",
						"name":typeName
					}).appendTo($bc).button({
						label:typeName
					}).on("click", function () {
						
						var type = $(this).attr("name");
						
						// change the type
						$w.changeType(type);
					});
				}
	},
	
	_removeControls: function () {
		
		if ($("#gallerize-controls").length > 0) $("#gallerize-controls").remove();
	},
	
	/**
		Change the type of gallery we are displaying.
		@param typeOverride (String) Ability to override type with user given type.
	*/
	changeType: function (typeOverride) {
		
		var $w = this;
		var $el = $w.element;
		var galleryType = $w.option("gType");
		
		// if there is a type given by the user
		if (typeOverride) galleryType = typeOverride;
		
		// if there are images
		if ($el.find(".image").length > 0) {
		
			var savedImages = [];
		
			// save the images
			$el.find(".image").each(function () {
				
				var $image = $(this).detach();
				savedImages.push($image);
			});
			
			// clear out the gallerize element
			$el.empty();
			
			// remove the controls if we have any
			$w._removeControls();
			
			// add gallerize controls
			$w._addControls();
			
			// put the images back
			for (var x in savedImages) {
				
				savedImages[x].appendTo($el);
			}
		
			switch (galleryType) {
				
				case "art-by-bug":
				
				break;
				
				default:
				
					// create an image container
					var $iContainer = $("<div/>", {
						"class":"image-container"
					}).appendTo($el);
					
					/**
						Go through each image and get the widths.
						Add all the widths up and that is how big to make the image container.
					*/
					var totalWidth = 0;
					$el.find(".image").each(function () {
						
						var $img = $(this);
						var imgWidth = parseInt($img.width());
						totalWidth += imgWidth+42;
						
						var $dImage = $img.detach();
						$dImage.appendTo($iContainer);
					});
					
					// set the total width of the display image container
					$iContainer.width(totalWidth);
				
				break;
			}
		}
		else console.log("[SERVER] No images found in gallerize!");
	}
});