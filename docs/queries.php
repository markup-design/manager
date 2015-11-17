<?php 

	if (@$_GET['encode-html']) {
		
		echo htmlentities($_GET['encode-html']);
	}
?>