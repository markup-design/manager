$.widget( "solutions.profile", {
   
	// Default options.
    options: {
		storyPoints: 0,
		uid: false,
		uname: "default"
	},
   
	_create: function() {
		
		var $w = this;
		var $el = $w.element;
		
		var uid = $el.attr("uid");
		
		$w.option("uid", uid);
		
		// make sure create only happens once
		if (!$el.hasClass("profile")) {
			
			// add gallerize class
			$el.addClass("profile");
			
			// output the story points
			$w.storyPoints(11);
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
		Update the story points of the user's profile.
		@param points (Int) User's story points we are changing to. If voided then this function is turned into a getter :)
	*/
	storyPoints: function (points) {
		
		var $w = this;
		var $el = $w.element;
		
		// see if we have points
		if (typeof points === "number") {
			
			// get the story points element
			var $sp = $el.find(".story-points");
			var $points = $sp.find(".points");
			
			// check to see if there is already a story points element
			if ($sp.length === 0 && $points.length === 0) {
				
				$sp = $("<div/>", {
					"class":"story-points"
				}).appendTo($el);
				
					$title = $("<div/>", {
						"class":"title",
						"text":"Story Points"
					}).appendTo($el);
					
					$points = $("<div/>", {
						"class":"points",
						"text":points
					}).appendTo($el);
			}
			else {
				
				$points.text(points);
			}
			
		}// else return the story points
		else return $w.option(storyPoints);
	}
});