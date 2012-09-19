<?include_once('include/header.php');?>
	<div class="modal hide" id="codeModal"  tabindex="1" role="dialog" aria-labelledby="myModalLabel">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			<h3 id="myModalLabel">C / Arduino Code</h3>
		</div>
		<div class="modal-body">
			<textarea class="span5 code-area" readonly="readonly" rows="18"></textarea>
		</div>
		<div class="modal-footer">
			<div class="alert alert-info">
				<strong>Tip!</strong> Copy the code above to your Arduino.
			</div>
		</div>
	</div>
	<div class="modal hide" id="aboutModal"  tabindex="1" role="dialog" aria-labelledby="myModalLabel">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			<h3 id="myModalLabel">Welcome to Petrolino!</h3>
		</div>
		<div class="modal-body">
			<strong>What is Petrolino?</strong>

			<p>Petrolino is a Web-based Graphical Editor meant to create, export and convert petri-nets.</p>

			<strong>Why should I use Petrolino?</strong>

			<p>Petrolino is an intuitive graphical editor from which you can easily create petri-nets.<br>
			Unless all others, Petrolino is Web-based so that you can work on you petri-nets from wherever you are!</p>

			<strong>Features</strong>

			<ul>
				<li>Web-based
				<li>Easy and intuitive UI
				<li>Export as PNML
				<li>Import previous PNML
				<li>Convert PNML to C-code
			</ul>

			<p><small>Brought to you by: Joost, Pieter, Bojana and Thomas.</small></p>
		</div>
		<div class="modal-footer">
			<p><small>Powered by CodeIgniter, Bootstrap and Petripy.</small></p>
		</div>
	</div>

	<div class="inspector well" >
		<h1>Petrolino</h1>
		<hr>
		<div class="btn-group row-fluid">
			<button class="btn" id="createTransition"><i class="icon-asterisk"></i> Add transition</button>
			<button class="btn" id="createPlace"><i class="icon-map-marker"></i> Add place</button>
		</div>
		<hr>
		<div class="row-fluid">
			<fieldset>
				<input type="text" name="name" placeholder="Name" class="span12"/><br>
				<textarea id="globals-area" rows="7" placeholder="Globals" class="span12 code-area"></textarea>
            	<button type="submit" id="convertbutton" class="btn btn-block btn-primary" data-toggle="modal" data-target="#codeModal">Convert to Arduino code</button>
				<button type="submit" class="btn btn-block disabled">Download PNML file</button>
				<button type="submit" id="uploadbutton" class="btn btn-block disabled">Upload a PNML file</button>
			</fieldset>
		</div>
		<hr>
		<p>Petrolino is a Web-based Graphical Editor meant to create, export and convert petri-nets. <a data-toggle="modal" href="#aboutModal">Learn more &gt;</a></p>
		<hr>
		<p><small>Version 0.0.1 (<a href="https://github.com/bdumeljic/Petrolino">github</a>)</small></p>
		
	</div>

	<canvas id="board" width="700" height="500"></canvas>
	
	
<?include_once('include/footer.php');?>
