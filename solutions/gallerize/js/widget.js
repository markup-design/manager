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
			
			$el.addClass(".gallerize")
			
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
	
	/**
		Change the type of gallery we are displaying.
	*/
	changeType: function () {
		
		var $w = this;
		var $el = $w.element;
		var galleryType = $w.option("gType");
		
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
});