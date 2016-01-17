<?php 	$title = "Solutions";		$css = "<link rel='stylesheet' type='text/css' href='css/index.css'>";		$js = "<script type='text/javascript' src='js/index.js'></script>";		require($_SERVER['DOCUMENT_ROOT']."/manager/header.php");?><div id='main'>		<h1>Solutions</h1>	<p class='intro'>Choose a solution below to begin a demo.</p>		<div id='accordion'>		<h3>Gallerize</h3>		<div>			<div class='info-table color-scheme-mark'>				<div class='info'>					<div class='row'>						<div class='data name'>Author:</div>						<div class='data'>Mark Inman</div>					</div>										<div class='row'>						<div class='data name'>Last Updated:</div>						<div class='data'><?php $file = $_SERVER['DOCUMENT_ROOT'].$_SERVER['REQUEST_URI']."gallerize/index.php";							echo date("M d, Y H:i:s", filemtime($file));						?></div>					</div>										<div class='row'>						<div class='data name'>Description:</div>						<div class='data'>Add this program to a folder on a website that has images then navigate to said folder to see the gallery auto-generated!</div>					</div>				</div>			</div>						<a href='/manager/solutions/gallerize/gallerize.zip'><button>Gallerize</button></a>			<a href='/manager/solutions/gallerize/'><button>View Demo</button></a>			<button class='raw-activate'>View Code Snippet</button>			<div class='raw-documentation display-none'>				<?php 									$file = $_SERVER['REQUEST_URI']."gallerize/index.php";									outputImportantDocs($file);				?>			</div>		</div>				<h3>Nate's First Solution</h3>		<div>			<p>These buttons don't do anything yet! This will be a place to keep track of your solutions (programs) you build.</p>			<a href='/manager/solutions/'><button>Solution Link</button></a>			<a href='/manager/solutions/'><button>Solution Demo</button></a>			<button class='raw-activate'>View Code Snippet</button>			<div class='raw-documentation display-none'>				<?php 									//$file = $_SERVER['REQUEST_URI']."gallerize/index.php";									//outputImportantDocs($file);				?>			</div>		</div>				<h3>Travis's First Solution</h3>		<div>			<p>These buttons don't do anything yet! This will be a place to keep track of your solutions (programs) you build.</p>			<a href='/manager/solutions/'><button>Solution Link</button></a>			<a href='/manager/solutions/'><button>Solution Demo</button></a>			<button class='raw-activate'>View Code Snippet</button>			<div class='raw-documentation display-none'>				<?php 									//$file = $_SERVER['REQUEST_URI']."gallerize/index.php";									//outputImportantDocs($file);				?>			</div>		</div>				<h3>Kevin's First Solution</h3>		<div>			<p>These buttons don't do anything yet! This will be a place to keep track of your solutions (programs) you build.</p>			<a href='/manager/solutions/'><button>Solution Link</button></a>			<a href='/manager/solutions/'><button>Solution Demo</button></a>			<button class='raw-activate'>View Code Snippet</button>			<div class='raw-documentation display-none'>				<?php 									//$file = $_SERVER['REQUEST_URI']."gallerize/index.php";									//outputImportantDocs($file);				?>			</div>		</div>	</div></div><?php 	function outputImportantDocs ($pathToFile) {				$fileContents = file_get_contents($_SERVER['DOCUMENT_ROOT'].$pathToFile);				$allStarts = strpos_all($fileContents, "[SCB]");				$allEnds = strpos_all($fileContents, "[End]");				if (count($allStarts) === count($allEnds)) {			for ($x=0; $x < count($allStarts); $x++) {								$start = $allStarts[$x] + 5;				$end = ($allEnds[$x] - $start) - 3;								// set the string				$fileString = substr($fileContents, $start, $end);								// output the code				echo "<pre>".htmlentities($fileString)."</pre>";			}		}	}		/**		Returns an array of all string positions.	*/	function strpos_all($haystack, $needle) {				$offset = 0;		$allpos = array();		while (($pos = strpos($haystack, $needle, $offset)) !== FALSE) {			$offset   = $pos + 1;			$allpos[] = $pos;		}		return $allpos;	}?>