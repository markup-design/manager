<?php 	$title = "Solutions";		$css = "<link rel='stylesheet' type='text/css' href='css/index.css'>";		$js = "<script type='text/javascript' src='js/index.js'></script>";		require($_SERVER['DOCUMENT_ROOT']."/manager/header.php");		// [SCB]?><div id='main'>		<h1>Gallerize</h1>		<div id='gallerize'>		<?php 			$folder = $_SERVER['REQUEST_URI']; // this must contain a folder called images, with image files present			loadImages($folder);	?>	</div></div><?php 	// [End]	// [SCB]	/** 		Init Image Load.		@param $path (String) Path images are located.	*/	function loadImages ($path, $imgPath = "images/", $lrgImgPath = "large/") {				$imageTypes = array(			0 => "wide",			1 => "tall",			2 => "normal"		);				$images = array();		if ($handle = opendir($_SERVER['DOCUMENT_ROOT'].$path.$imgPath)) {			/* This is the correct way to loop over the directory. */			while (false !== ($entry = readdir($handle))) {								if (!is_dir($entry) && $entry != "large") {										$classes = "image ";										$type = rand(0, (count($imageTypes)-1));										$classes .= $imageTypes[$type];										$images[] = "					<div class='".$classes."' type='".$type."'>						<a href='".$path.$imgPath.$lrgImgPath.$entry."'>							<img src='".$path.$imgPath.$entry."' title='".$entry." (click to see larger)'>						</a>					</div>";				}			}			closedir($handle);		}				// count the image total		$imgCount = count($images);				// if we have no images output an error		if ($imgCount === 0) {							echo "<div class='ui-state-error'>No Images Found in [".$path."]! Try adding files to the images folder.</div>";		}		else {						$alreadyUsedImages = array();						// go through each image and output it			for ($x=0; $x < $imgCount; $x++) {								// generate a random image				$random = rand(0, $imgCount-1);								// make sure we are not already using the random image				while (in_array($random, $alreadyUsedImages)) {										$random = rand(0, $imgCount-1);				}								// record the image has been used				$alreadyUsedImages[] = $random;								// output the image HTML				echo $images[$random];			}		}	}	// [End]?>