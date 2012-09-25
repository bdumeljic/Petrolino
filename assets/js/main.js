$(document).ready(function() {
	// Main.init();
})

// Main class
var Main = {
	
	convertToArduino: function() {
		var pnml = Drawboard.toPNML();
		var res;
		
		$.ajax({
			type: "POST",
			url: "index.php/comm/convert",
			data: { pnml: pnml },
			async: false
		}).done(function(msg) {
			res = msg;
		});
		
		return res;
	},
	
	downloadPNML: function() {
		var pnml = Drawboard.toPNML();
		
		//window.location = "index.php/comm/createPNML/"+pnml;
	 	$.post("index.php/comm/createPNML",{pnml:pnml},
 		function(msg){
 				window.location = "index.php/comm/downloadPNML";
 		});
	}

}

