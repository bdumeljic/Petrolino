<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

// Used as API 
class Comm extends CI_Controller {

	// Converts pnml to c
	public function convert() {	
		$pnml = $_POST['pnml'];
		$app_root = realpath(BASEPATH . "/../");
		// $fileName = $app_root . "/tmp/test";// . (md5(microtime() + rand()));
		$fileName = $app_root . "/tmp/" . (md5(microtime() + rand()));
		$fh = fopen($fileName . ".pnml", 'w+') or die("can't open file" . $fileName);
		fwrite($fh, $pnml);
		fclose($fh);
		
		echo shell_exec("python " . $app_root . "/assets/petripy/petripy.py " . $fileName . ' 2>&1');	
	}
	
}

?>
