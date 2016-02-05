$.widget( "solution.storyboard", {
   
	// Default options.
    options: {
	},
   
	_create: function() {
		
		var $w = this;
		var $el = $w.element;
		
		// make sure create only happens once
		if (!$el.hasClass("storyboard")) {
			
			// add gallerize class
			$el.addClass("storyboard");
		}
    },
	
	/**
		Calling the public destroy method will trigger this.
	*/
	_destroy: function () {
		
		var $w = this;
		var $el = $w.element;
	},
	
	addStory: function () {
		
	}
});