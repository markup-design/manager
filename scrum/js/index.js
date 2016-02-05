$(document).ready(function () {
	
	$(".editable").each(function (e) {
		
		var $el = $(this);
		var elType = $el.prop('nodeName').toLowerCase();
		var elClass = $el.attr("class");
		var elID = $el.attr("id");
		
		$el.qtip({
			content: $("#solutions").html(), // Use a pre-formatted element for the content
			position: {
				target: 'mouse', // Position it where the click was...
				adjust: { mouse: false } // ...but don't follow the mouse
			},
			hide: 'unfocus',
			show: 'mousedown', // Can't use click event for this, sorry!
			events: {
				show: function(event, api) {
					
					event.stopPropagation();
					
					
					$(this).find(".element-selected").text("<"+elType+" id='"+elID+"' class='"+elClass+"'/>");
					
					/*
					 * event.originalEvent contains the event that caused the callback to be fired.
					 * event.originalEvent.button tells us which button was clicked e.g. 1= left, 2 = right;
					 */
					if(event.originalEvent.button !== 2) {
						
						
						// IE might throw an error calling preventDefault(), so use a try/catch block.
						try { event.preventDefault(); } catch(e) {}
					}
				}
			},
			style: {
				classes: 'qtip-blue qtip-shadow'
			}
		});
		
		// Little snippet that stops the regular right-click menu from appearing
		$el.bind('contextmenu', function(){ return false; });
		$el.parent().bind('contextmenu', function(){ return false; });
	});
});