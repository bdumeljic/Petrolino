<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Git_hook extends CI_Controller {

	public function index()
	{
		//exec("/bin/bash");
		//exec("cd /var/www/petrolino && git pull", $output);
		
		//$output = `cd /var/www/petrolino && git pull`;
		echo(nl2br(shell_exec('git pull 2>&1'));
		
		/*$output = `cd /var/www/`;
		print_r($output);

		$output = `ls -al`;
		print_r($output);*/

		echo "<br />Enough?";
	}
}	

?>	
