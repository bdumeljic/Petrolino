<?include_once('include/header.php');?>
	<div class="modal hide" id="codeModal"  tabindex="1" role="dialog" aria-labelledby="myModalLabel">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			<h3 id="myModalLabel">C / Arduino Code</h3>
		</div>
		<div class="modal-body">
			<p>One fine body…</p>
		</div>
		<div class="modal-footer">
			<div class="alert alert-info">
				<strong>Tip!</strong> Copy the code above to your Arduino.
			</div>
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
				<textarea rows="7" placeholder="Scope code" class="span12"></textarea>
            	<button type="submit" class="btn btn-block btn-primary" href="comm/convert" data-toggle="modal" data-target="#codeModal">Convert to Arduino code</button>
				<button type="submit" class="btn btn-block disabled">Download PNML file</button>
				<button type="submit" id="uploadbutton" class="btn btn-block disabled">Upload a PNML file</button>
			</fieldset>
		</div>
		<hr>
		<p><small>Petrolino is a Web-based Graphical Editor meant to create, export and convert petri-nets. <a href="<?=site_url('/welcome/help/');?>">Learn more &gt;</a></small></p>
	</div>
	
	<div class="modal" id="codeModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h3 id="myModalLabel">C / Arduino Code</h3>
                </div>
                <div class="modal-body">
                    <p>One fine body… that is not behaving properly ...</p>
                </div>
                <div class="modal-footer">
                    <div class="alert alert-info">
                        <span id="tip"></span><strong>Tip!</strong> Copy the code above to your Arduino.</span>
                        <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
                    </div>
                </div>
            </div>
	<canvas id="board" width="700" height="500"></canvas>
	
	
<?include_once('include/footer.php');?>
