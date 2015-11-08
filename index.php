<?php 

	$title = "Home page";
	
	$meta = "";

	$css = "<link rel='stylesheet' type='text/css' href='css/index.css'>";
	
	$js = "<script type='text/javascript' src='js/index.js'></script>";

	require($_SERVER['DOCUMENT_ROOT']."/header.php");
?>

<div id='main'>

	<p>Hello World!</p>
</div>

<?php 

	require($_SERVER['DOCUMENT_ROOT']."/footer.php");
?>