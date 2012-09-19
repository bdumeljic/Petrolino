<?include_once('include/header.php');?>

	
	
	<div class="btn-group">
		<button class="btn" id="createTransition"><i class="icon-asterisk"></i> Add transition</button>
		<button class="btn" id="createPlace"><i class="icon-map-marker"></i> Add place</button>
	</div>
	
	<canvas id="board" width="700" height="500"></canvas>

	<div class="inspector" >
	
		<div id="inspector_intro" style="display:block">
			<div class="inspector_intro_header">
				<div class="brand inspector_intro_title"><center>Petrolino<br/><br/>Get Started!</center></div>
			</div>
			
			<div class="inspector_intro_content" >
				
				<div>
					<center><u>Start a new Project</u></center>
					<div style="margin-top:10px;">
						<center>
							<input type="text" name="name" placeholder="Name"/><br>
							<button type="submit" id="startbutton" class="btn btn-primary pull-right" style="width:100%;">Start</button>
						</center>
					</div>
				</div>
				
				<div style="margin-top:40px">
					<center>Or<br><u>Upload a PNML</u></center>
					<div style="margin-top:10px;">
						<center>
							
							<button type="submit" id="uploadbutton" class="btn btn-primary pull-right" style="width:100%;">Upload</button>
						</center>
					</div>
				</div>
				
				<div style="clear:both"></div>
			</div>
		</div>
		
		<div id="inspector_project" style="display:none">
			<div class="inspector_intro_header">
				<div class="brand inspector_project_title">Petrolino - Inspector</div>
			</div>
			
			<div class="inspector_intro_content">
				
				<div>
					Description
					<textarea style="width:94%;" rows="7"></textarea>
				</div>
				<div style="bottom:0px;">
					<button type="submit" class="btn btn-primary pull-right" style="width:100%">Download PNML file</button><br><br>
					<button type="submit" class="btn btn-primary pull-right" style="width:100%">Convert to Arduino code</button>
				</div>
			</div>
			<div style="clear:both"></div>
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
