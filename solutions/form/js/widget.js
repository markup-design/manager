$.widget( "solutions.formGen", {
   
	// Default options.
    options: {
		creation: false, // whether or not we are creating the form in the editor
		enctype: false, // multipart/form-data | application/x-www-form-urlencoded | text/plain
		recaptcha: true, // toggles recaptcha; this requires captcha already being setup
		requiredFields: "*", // searches for any form field that has an asterisk
		type: false
	},
   
	_create: function() {
		
		var $w = this;
		var $el = $w.element;
		
		// make sure create only happens once
		if (!$el.hasClass(".form-gen")) {
			
			// add gallerize class
			$el.addClass("form-gen");
			
			$w.initForm();
		}
    },
	
	/**
		Calling the public destroy method will trigger this.
	*/
	_destroy: function () {
		
		var $w = this;
		var $el = $w.element;
		
		$w.removeClass("form-gen");
	},
	
	/**
		Adds a field to the dialog editor.
		@param $input (jQuery) This must have an ID and a name.
		@param $addingTo (jQuery) This must be a valid DOM element.
	*/
	addField: function ($input, $addingTo) {
		
		// make sure the element we are adding the field to exists
		if ($addingTo.length > 0) {
			
			// get the inputs id
			var inputID = $input.attr("id");
			var inputName = $input.attr("name");
			
			if (inputID) {
			
				if (!inputName) inputName = inputID;
				
				var $row = $("<div/>", {
					"class":"form-gen-row",
				}).appendTo($addingTo);
				
				// create a label for the field
				var $l = $("<label/>", {
					"for":inputID,
					"text":inputName
				}).appendTo($row);
				
				$input.appendTo($row);
			}
			else console.log("No input ID found!");
		}
		else console.log("Element not found!");
	},
	
	getFormFields: function () {
		
	},
	
	/**
		Initializes the form by creating default form elements.
	*/
	initForm: function ($override) {
		
		var $w = this;
		var $el = $w.element;
		var formAttrs = {};
		var enctype = $w.option("enctype");
		var creation = $w.option("creation");
		
		// set the override if there is one
		if ($override) $el = $override;
		
		// empty the element
		$el.empty();
		
		// if we have an encode type set it to the form's attributes
		if (enctype) formAttrs["enctype"] = enctype;
		
		// add the form
		var $form = $("<form/>", formAttrs).appendTo($el);
		
		// if creation is turned on
		if (creation == true) {
			
			var $addNewField = $("<div/>", {
				"id":"form-gen-add-new-field"
			})
			.appendTo($el).
			dialog({
				autoOpen: false,
				width: 500,
				height: 400,
				title:"Add New Field",
				buttons: {
					
					"Add Field" : function () {
						
						var $efd = $("#edit-form-dialog");
						
						if ($efd.length > 0) {
							
							var fieldName = $("#form-gen-new-name").val();
							
							// check to see if that field already exists
							if ($("#form-gen-"+fieldName).length === 0) {
								
								// create name field for form
								var $nameOfForm = $("<input/>", {
									"id":"form-gen-"+fieldName,
									"name":fieldName,
									"placeholder":"",
									"type":"text"
								});
								$w.addField($nameOfForm, $efd);
							}
							else console.log("That field already exists!");
						}
						else console.log("Edit dialog not created yet!");
						
						// close the dialog
						$(this).dialog("close");
					}
				}
			});
			
			// add the form editor dialog box
			var $fDialog = $("<div/>", {
				"id":"edit-form-dialog"
			})
			.appendTo($el)
			.dialog({
				autoOpen: true,
				width: 500,
				height: 400,
				title:"Form Editor",
				buttons: {
					
					"Add Field" : function () {
						
						$addNewField.dialog("open");
					},
					
					"Update Form" : function () {
						
						// get the name of the form from the edit dialog form
						var formName = $("#form-gen-name").val();
						
						// add a form title element if the name is valid
						if (formName) {
							
							var $formName = $form.children("h2");
							
							// if a formname already exists update it
							if ($formName.length === 1) {
								
								$formName.text(formName);
							}
							else {
								
								// otherwise add it
								$formName = $("<h2/>", {
									"text":formName
								}).appendTo($form);
							}
						}
					}
				}
			});
			
			// create name field for form
			var $nameOfForm = $("<input/>", {
				"id":"form-gen-name",
				"name":"Name of Form",
				"placeholder":"Give the form a name",
				"type":"text"
			});
			$w.addField($nameOfForm, $fDialog);
			
			// add new name field
			var $nameOfField = $("<input/>", {
				"id":"form-gen-new-name",
				"name":"Name",
				"placeholder":"Field Name",
				"type":"text"
			});
			$w.addField($nameOfField, $addNewField);
		}
	}
});