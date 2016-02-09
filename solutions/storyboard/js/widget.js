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
			
			// take away border spacing
			$el.attr("cellspacing", 0);
			
			// take away border
			$el.attr("border", 0);
			
			// add tfooter
			var $tfoot = $("<tfoot/>").appendTo($el);
			
				// add controls container row
				var $ccr = $("<tr/>").appendTo($tfoot);
			
					// add controls container
					var $cc = $("<td/>", {
						"colspan":4
					}).appendTo($ccr);
					
						// output to json button
						$("<button/>", {
							"text":"Output as JSON"
						}).button().appendTo($cc);
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
		Add a story to the storyboard.
		@param testString (String) Title of the story.
	*/
	_testForLettersAndNumbers: function (testString) {
		
		var $w = this;
		var $el = $w.element;
		
		var myRe = /^[a-zA-Z0-9 ]+$/g;
		var reTest = myRe.exec(testString);
		
		if (reTest) return reTest;
		else return false;
	},
	
	/**
		Add a story to the storyboard.
		@param title (String) Title of the story.
		@param description (String) Description of the story.
		@param points (Integer) How many points this story
		@param reinforcement (Array) List of reasons why this point value.
		@param volunteers (Array) List of volunteers to complete the story.
		@param status (Boolean) Whether the work is done or not.
		@param $override (jQuery) DOM object to override $el.
	*/
	addStory: function (title, description, points, reinforcement, volunteers, status, $override) {
		
		var $w = this;
		var $el = $w.element;
		
		if ($override) $el = $override;
		
		var titleCheck = $w._testForLettersAndNumbers(title);
		var pointsCheck = $w._testForLettersAndNumbers(points);
		
		// make sure we have a title
		if ($.trim(title) != "" && titleCheck) {
			
			var nameCheck = $el.find("tr[name='"+title+"']").length;
			
			// make sure we do not have the same name already
			if (nameCheck < 1) {
						
				// output the story row with name
				var $storyRow = $("<tr/>", {
					"name":title
				}).appendTo($el);
				
				// output story declaration container
				var $declaration = $("<td/>", {
					"class":"declaration story-column"
				}).appendTo($storyRow);
				
				// output the title of the story
				var $title = $("<h3/>", {
					"class":"title",
					"text":title
				}).appendTo($declaration);
				
				// makes sure we have a description
				if ($.trim(description) != "") {
					
					// output the description
					var $description = $("<div/>", {
						"class":"description",
						"text":description
					}).appendTo($declaration);
					
					// make sure we have points
					if ($.trim(points) != "" && pointsCheck) {
						
						// output points
						var $points = $("<td/>", {
							"class":"points",
							"text":points
						}).appendTo($storyRow);
						
						// check for reinforcements
						if (typeof reinforcement == "object") {
							
							// output reinforcement list
							var $rList = $("<ul/>", {
								"class":"reinforcement"
							}).appendTo($declaration);
							
							for (var x in reinforcement) {
								
								// output reinforcement list item
								var $rListItem = $("<li/>", {
									"class":"reinforcement",
									"text":reinforcement[x]
								}).appendTo($rList);
							}
						}
						else console.log("[Error] No reinforcements!");
						
						// check for volunteers
						if (typeof volunteers == "object") {
							
							// output list of volunteers
							var $volunteers = $("<td/>", {
								"class":"volunteers",
								"text":volunteers
							}).appendTo($storyRow);
						}
						else console.log("[Error] No volunteers!");
						
						// check status
						if (status === true) {
							
							var $status = $("<td/>", {
								"class":"status complete",
								"text":"Complete"
							}).appendTo($storyRow);
						}
						else if (status === false) {
							
							var $status = $("<td/>", {
								"class":"status in-progress",
								"text":"In Progress"
							}).appendTo($storyRow);
						}
						else console.log("[Error] No boolean value given for status!");
					}
					else console.log("[Error] Points did not contain only letters and numbers!");
				}
				else console.log("[Error] Description did not contain only letters and numbers!");
			}
			else console.log("[Error] Story ["+title+"] already exists!");
		}
		else console.log("[Error] Title did not contain only letters and numbers!");
	}
});