$(document).ready(function() {
	Inspector.init();
})

var Inspector = {

	init: function() {
		this.events.init();
	}
}

Inspector.events = {

	init: function() {
		$("#startbutton").click(function() {
			Inspector.layout.showProjectInspector()
		});
		
		$("#downloadbutton").click(function() {
			Main.downloadPNML();
		});
		
		$("#convertbutton").click(function() {
			$('#codeModal .modal-body textarea').html(Main.convertToArduino());
		});	
		
		$("#createPlace").click( function() {
			var pl = new Place();
			Drawboard.places.push(pl);
		});
		
		$("#createTransition").click( function() { 
			var tr = new Transition();
			Drawboard.transitions.push(tr);
		});
	},
}

Inspector.layout = {
	
	showProjectInspector: function() {
		$("#inspector_intro").hide();
		$("#inspector_project").show();
	}
}
