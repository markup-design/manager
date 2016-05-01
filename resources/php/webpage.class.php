<?php
class WebPage
{
    // property declaration
    public $headers = false;
    public $includes = false;
	public $path = false;
	public $name = false;

    public function __construct ($path, $name) {
		
		$this->path = $path;
		$this->name = $name;
	}
	
	public function createDir ($path) {
		
		// if the path does not exist create it
		if (!file_exists($path)) {
			
			$result = mkdir($path);
			
			if ($result) echo "<div>Successfully created directory [".$path."]</div>";
			else echo "<div class='ui-state-error'>Failed to create directory [".$path."]</div>";
			
			return $result;
		}
		else return false;
	}
	
	public function createFile ($file) {
	
		$path = $this->path;
	
		// if there is a folder in the file path
		if (strpos($file, "/") !== false) {
			
			// get the folder path
			$exFile = explode("/", $file);
			array_pop($exFile);
			$folder = implode("/", $exFile);
			
			// check to make sure the folder is already created
			$this->createDir($_SERVER["DOCUMENT_ROOT"].$path.$folder);
		}
		
		// create file
		$result = fopen($_SERVER["DOCUMENT_ROOT"].$path.$file, "w");
		
		$pathinfo = pathinfo($file);
		$filetype = $pathinfo["extension"];
		
		// if the file was create successfully
		if ($result) {
			
			echo "<div>Successfully created file [".$_SERVER["DOCUMENT_ROOT"].$path.$file."]</div>";
			
			// create the file based on type
			switch ($filetype) {
				
				case "php":
				
					// should return string
					$php = $this->generatePHP();
				
					// write to the file
					fwrite($result, $php);
				break;
				
				default:
				
					// write to the file
					fwrite($result, "");
				break;
			}
			
			
			fclose($result);
		}
		else echo "<div class='ui-state-error'>Failed to create file [".$_SERVER["DOCUMENT_ROOT"].$path.$file."]</div>";
	}
	
	/**
		Generate PHP page based off attributes set in this class.
		@returns $text (String) PHP text for the page.
	*/
	private function generatePHP () {
		
		$title = $this->getHeader("Title");
		$links = $this->getHeader("Links");
		$js = $this->getHeader("JS");
		$includes = $this->includes;
		
		// start php
		$text = "<?php";
		
		// add title if we have one
		if (trim($title) !== "") $text .= "\n\t\$title = \"".$title."\";";
		
		// add links if we have them
		if (is_array($links) && count($links) > 0) {
			
			$text .= "\n\n\t\$links = \"";
			foreach ($links as $l) {
				
				$text .= "\n\t<link rel='stylesheet' type='text/css' href='".$l."'>";
			}
			$text .= "\";";
		}
		
		// add javascript if we have them
		if (is_array($js) && count($js) > 0) {
			
			$text .= "\n\n\t\$js = \"";
			foreach ($js as $j) {
				
				$text .= "\n\t<script type='text/javascript' src='".$j."'></script>";
			}
			$text .= "\";";
		}
		
		// add included files if we have them
		if (is_array($includes) && count($includes) > 0) {
			
			$text .= "\n";
			foreach ($includes as $i) {
				
				$text .= "\n\trequire_once \$_SERVER['DOCUMENT_ROOT'].\"".$i."\";";
			}
		}
		
		// end php
		$text .= "\n\n?>";
		
		return trim($text);
	}
	
	public function getHeader ($header) {
		
		return $this->headers[$header];
	}
	
	public function getLinks () {
		
		$name = $this->name;
		$path = $this->path;
	}

	public function includeFile ($filepath) {
		
		$this->includes[] = $filepath;
	}
	
	public function setHeader ($header, $title) {
		
		$this->headers[$header] = $title;
	}
	
	public function setLink ($linkPath) {
		
	}
}
?>