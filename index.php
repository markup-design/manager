<?php 

	$title = "Home page";
	
	$meta = "";

	$css = "<link rel='stylesheet' type='text/css' href='css/index.css'>";
	
	$js = "<script type='text/javascript' src='js/index.js'></script>";

	$root = getcwd();
	
	require($root."/header.php");
?>

<div id='main'>

	<p>Hello World!</p>
</div>

<?php 

	require($root."/footer.php");
?>