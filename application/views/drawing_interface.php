<?include_once('include/header.php');?>

	<div class="inspector well" >
		<h1>Petrolino</h1>
		<hr>
		<div class="btn-group row-fluid">
			<button class="btn" id="createTransition"><i class="icon-asterisk"></i> Add transition</button>
			<button class="btn" id="createPlace"><i class="icon-map-marker"></i> Add place</button>
		</div>
		<hr>

		<!-- <div id="inspector_intro" style="display:block; text-align: center;margin-top: 20px" class="row-fluid"> -->
		<div class="row-fluid">
			<fieldset>
				<input type="text" name="name" placeholder="Name" class="span12"/><br>
				<textarea rows="7" placeholder="Scope code" class="span12"></textarea>
				<button type="submit" class="btn btn-block btn-primary">Convert to Arduino code</button>
				<button type="submit" class="btn btn-block disabled">Download PNML file</button>
				<button type="submit" id="uploadbutton" class="btn btn-block disabled">Upload a PNML file</button>
			</fieldset>
		</div>
<<<<<<< HEAD
		
		<div id="inspector_project" style="display:none; text-align: center;">
			<h1>Petrolino</h1>
			
			Description
			<textarea style="width:94%;" rows="7"></textarea>
			<button type="submit" class="btn btn-block">Download PNML file</button><br>

            <div class="modal" id="codeModal" tabindex="1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
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

			<button type="submit" class="btn btn-block btn-primary" href="#codeModal" data-toggle="modal">Convert to Arduino code</button>
					
		</div>
		
		<!--
		
		<div class="content">
		
			<input type="text" name="name" placeholder="Name"/>

			<div style="bottom:0px;position:absolute">
				<button type="submit" class="btn btn-primary pull-right" style="width:100%">Upload PNML file</button>
				<button type="submit" class="btn btn-primary pull-right" style="width:100%">Download PNML file</button>
				<button type="submit" class="btn btn-primary pull-right" style="width:100%">Convert to Arduino code</button>
			</div>
		</div>
		
		-->
		
=======
		<hr>
		<p><small>Petrolino is a Web-based Graphical Editor meant to create, export and convert petri-nets. <a href="<?=site_url('/welcome/help/');?>">Learn more &gt;</a></small></p>
	</div>
	<canvas id="board" width="700" height="500"></canvas>
>>>>>>> updated control panel
	
	
<?include_once('include/footer.php');?>
