$(document).ready(function () {

	var $ssb = $("#scrum-story-board").storyboard({
		data: {
			"Join": {
				"Description": "When you join our team you get a freebie!",
				"Points": "1",
				"Contributors": ["mark inman",
				"nathan baca",
				"travis glover"],
				"Status": true,
				"Reinforcement": ["Self Esteem Booster"]
			},
			"Menu": {
				"Description": "Need Main Menu",
				"Points": "20",
				"Contributors": ["mark inman"],
				"Status": true,
				"Reinforcement": ["very important",
				"startup need"]
			},
			"Mobile Menu": {
				"Description": "Need mobile menu functionality",
				"Points": "5",
				"Contributors": ["mark inman"],
				"Status": true,
				"Reinforcement": ["just a nice feature"]
			},
			"Login": {
				"Description": "Need session system that logs in user",
				"Points": "10",
				"Contributors": ["nathan baca"],
				"Status": false,
				"Reinforcement": ["very important",
				"startup need"]
			},
			"User Profiles": {
				"Description": "Need database table to store users and system to access them",
				"Points": "50",
				"Contributors": [],
				"Status": false,
				"Reinforcement": ["extremely important",
				"startup need"]
			},
		}
	});
});