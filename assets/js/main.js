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
			url: "/comm/convert",
			data: { pnml: pnml },
			async: false
		}).done(function(msg) {
			res = msg;
		});
		
		return res;
	}

}

