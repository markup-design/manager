$.widget( "solution.storyboard", {
   
	// Default options.
    options: {
		data: false, // this should be an object of data
	},
   
	_create: function() {
		
		var $w = this;
		var $el = $w.element;
		var $data = $w.option("data");
		var elType = $el.prop('nodeName').toLowerCase();
		
		if (elType === "table") {
		
			// make sure create only happens once
			if (!$el.hasClass("storyboard")) {
				
				// add storyboard class and empty the element
				$el.addClass("storyboard").empty();
				
				// take away border spacing
				$el.attr("cellspacing", 0);
				
				// take away border
				$el.attr("border", 0);
				
				// add tfooter
				var $tfoot = $("<tfoot/>").appendTo($el);
				
					// add controls container row
					var $ccr = $("<tr/>").appendTo($tfoot);
					
					// add output container row
					var $ocr = $("<tr/>").appendTo($tfoot);
				
						// add controls container
						var $cc = $("<td/>", {
							"colspan":4
						}).appendTo($ccr);
						
							// output to json button
							var $ojb = $("<button/>", {
								"text":"Output as JSON"
							}).button().appendTo($cc);
							
						// add output container
						var $oc = $("<td/>", {
							"colspan":4
						}).appendTo($ocr);
						
							// output for json
							var $ofj = $("<div/>", {
								"id":"story-list-json",
								"class":"display-none"
							}).appendTo($oc);

				
				
				$ojb.on("click", function () {
					
					if ($ofj.text().trim() === "") {
						
						// get and set the storyboard json text to the output container
						var json = $w.storyToJSON(true);
						$ofj.text(json);
					}
					
					$ofj.toggleClass("display-none");
				});
							
				// if we have data
				if (typeof $data === "object") {
					
					$.each($data, function (storyTitle, story) {
						
						$w.addStory(storyTitle, story.Description, story.Points, story.Reinforcement, story.Contributors, story.Status, story.Override);
					});
				}
			}
		}
		else console.log("[Error] Element must be of type table, ["+elType+"] given.");
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
		@param contributors (Array) List of contributors to complete the story.
		@param status (Boolean) Whether the work is done or not.
		@param $override (jQuery) DOM object to override $el.
	*/
	addStory: function (title, description, points, reinforcement, contributors, status, $override) {
		
		var $w = this;
		var $el = $w.element;
		
		if ($override) $el = $override;
		
		var titleCheck = $w._testForLettersAndNumbers(title);
		var descriptionCheck = $w._testForLettersAndNumbers(descriptionCheck);
		var pointsCheck = $w._testForLettersAndNumbers(points);
		
		// make sure we have a title
		if ($.trim(title) != "" && titleCheck) {
			
			var nameCheck = $el.find("tr[name='"+title+"']").length;
			
			// make sure we do not have the same name already
			if (nameCheck === 0) {
						
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
				if (descriptionCheck != "") {
					
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
								"class":"r-list"
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
						
						// check for contributors
						if (typeof contributors == "object") {
							
							// output list of contributors
							var $contributors = $("<td/>", {
								"class":"contributors",
								"text":contributors
							}).appendTo($storyRow);
						}
						else console.log("[Error] No contributors!");
						
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
	},
	
	/**
		Outputs the story as a JSON file.
		@param toString (Boolean) If true outputs JSON as string. If False returns JSON object.
		@returns json (Object) Storyboard in a JSON readable format.
	*/
	storyToJSON: function (toString) {
		
		var $w = this;
		var $el = $w.element;
		
		var json = {};
		
		$el.find("tbody tr").each(function () {
			
			var $tr = $(this);
			var title = $tr.find(".title").text();
			
			// check to make sure this does not already exist
			if (!json[title]) {
			
				var description = $tr.find(".description").text();
				var points = $tr.find(".points").text();
				var contributors = $tr.find(".contributors").text().trim().split(",");
				var status = $tr.find(".status").text();
				var $rList = $tr.find(".r-list .reinforcement");
				var rList = [];
				
				if (status.toLowerCase() === "complete") status = true;
				else status = false;
				
				if ($rList.length > 0) {
					
					$rList.each(function () {
						
						rList.push($(this).text());
					});
				}
				
				json[title] = {
					Description:description,
					Points:points,
					Contributors:contributors,
					Status:status,
					Reinforcement:rList
				};
			}
			else console.log("[Error] Story ["+title+"] already exists!");
		});
		
		if (toString) return JSON.stringify(json);
		else return json;
	}
});