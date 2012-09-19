$(document).ready(function() {
	// Main.init();
})

// Main class
var Main = {
	
	convertToArduino: function() {
		var pnml = Drawboard.toPNML();
		
		$.ajax({
			type: "POST",
			url: "/comm/convert",
			data: { pnml: pnml }
		}).done(function(msg) {
			console.log(msg);
		});
	}

}

