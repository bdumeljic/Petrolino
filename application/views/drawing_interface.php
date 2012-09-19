<?include_once('include/header.php');?>

	
	
	<div class="btn-group">
		<button class="btn" id="createTransition"><i class="icon-asterisk"></i> Add transition</button>
		<button class="btn" id="createPlace"><i class="icon-map-marker"></i> Add place</button>
	</div>
	
	<canvas id="board" width="700" height="500"></canvas>

	<div class="inspector well pull-right" >
	
		<div id="inspector_intro" style="display:block; text-align: center;">
			<h1>Petrolino</h1>
			<fieldset>
				<input type="text" name="name" placeholder="Name"/><br>
				<button type="submit" id="startbutton" class="btn btn-primary btn-block">Start</button>
			</fieldset>
			<p><br/>Or</p>
			<button type="submit" id="uploadbutton" class="btn btn-block">Upload a PNML file</button>
		</div>
		
		<div id="inspector_project" style="display:none; text-align: center;">
			<h1>Petrolino</h1>
			
			Description
			<textarea style="width:94%;" rows="7"></textarea>
			<button type="submit" class="btn btn-block">Download PNML file</button><br>

            <a href="#myModal" role="button" class="btn" data-toggle="modal">Launch demo modal</a><br>

            <div class="modal" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h3 id="myModalLabel">C / Arduino Code</h3>
                </div>
                <div class="modal-body">
                    <p>One fine body…</p>
                </div>
                <div class="modal-footer">
                    <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
                </div>
            </div>

			<button type="submit" class="btn btn-block btn-primary">Convert to Arduino code</button>
					
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
		
	
	
		
	</div>
<?include_once('include/footer.php');?>
