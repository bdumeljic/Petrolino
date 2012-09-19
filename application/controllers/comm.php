<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

// Used as API 
class Comm extends CI_Controller {

	// Converts pnml to c
	public function convert() {	
		$pnml = $_POST['pnml'];
		
		$fileName = BASEPATH . "/../tmp/" . (md5(microtime() + rand()));
		$fh = fopen($fileName . ".pnml", 'w+') or die("can't open file" . $fileName);
		
		fwrite($fh, $pnml);
		
		fclose($fh);
		
		echo nl2br(shell_exec("python " . BASEPATH . "/../assets/petripy/petripy.py " . $fileName . ' 2>&1'));	
	}
	
}

?>
