$(document).ready(function () {
	
	var $ssb = $("#scrum-story-board").storyboard({
		data: {"Menu":{"Description":"Need Main Menu","Points":"20","Contributors":["mark inman"],"Status":true,"Reinforcement":["very important","startup need"]},"Mobile Menu":{"Description":"Need mobile menu functionality","Points":"20","Contributors":["mark inman"],"Status":true,"Reinforcement":["just a nice feature"]},"Join":{"Description":"When you join our team you get a freebie!","Points":"1","Contributors":["mark inman","nathan baca","travis glover"],"Status":true,"Reinforcement":["Self Esteem Booster"]},"Login":{"Description":"Need system that logs in user","Points":"10","Contributors":["nathan baca"],"Status":false,"Reinforcement":["very important","startup need"]}}
	});
	
	$ssb.storyboard("addStory", "Join", "When you join our team you get a freebie!", 1, ["Self Esteem Booster"], ["mark inman", "nathan baca", "travis glover"], true);
	$ssb.storyboard("addStory", "Login", "Need system that logs in user", 10, ["very important", "startup need"], ["nathan baca"], false);

});