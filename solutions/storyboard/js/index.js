$(document).ready(function () {
	
	var $ssb = $("#scrum-story-board").storyboard();
	
	$ssb.storyboard("addStory", "Menu", "Need Main menu", 20, ["very important", "startup need"], ["mark inman"], true);
	$ssb.storyboard("addStory", "Mobile Menu", "Need mobile menu functionality", 5, ["just a nice feature"], ["mark inman"], true);
	$ssb.storyboard("addStory", "Join", "When you join our team you get a freebie!", 1, ["Self Esteem Booster"], ["mark inman", "nathan baca", "travis glover"], true);
	$ssb.storyboard("addStory", "Login", "Need system that logs in user", 10, ["very important", "startup need"], ["nathan baca"], false);
});