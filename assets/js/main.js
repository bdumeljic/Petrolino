$(document).ready(function() {
	Main.init();
})

// Main class
var Main = {
	
	
	places: [],
	
	transitions: [],
	
	actions: [],
	
	
	//
	init: function() {
		this.canvas = $("canvas#board");
	},
	

}

/*function Place() {
	
	var id = "pl" + Main.places.length;

	Main.canvas.drawArc({
		strokeStyle: "#000",
		fillStyle: "#c33",
		
		strokeWidth: 1,
		x: 180, y: 200,
		radius: 50,
		
		name: "pl" + Place.n,
		
		layer: true,
		draggable: true,
		mouseover: function() {
			$(this).css({cursor: "pointer"});  
		},
		mouseout: function() {
			$(this).css({cursor: "default"});  
		},
	});	
	
	var actor = Main.canvas.getLayer(id);	
	
	function x() {
		return actor.x();
	}
	
	function y() {
		return actor.y();
	}
}*/
