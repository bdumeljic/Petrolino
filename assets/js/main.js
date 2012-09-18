$(document).ready(function() {
	Main.init();
})

// Main class
var Main = {
	canvas: $("canvas#board"),
	
	places: [],
	
	transitions: [],
	
	actions: [],
	
	
	//
	init: function() {
		
	},
	

}

function place() {
	$("canvas#board").drawArc({
		strokeStyle: "#000",
		fillStyle: "#c33",
		strokeWidth: 1,
		x: 180, y: 200,
		radius: 50,
		layer: true,
		draggable: true,
		mouseover: function() {
			$(this).css({cursor: "pointer"});  
		},
		mouseout: function() {
			$(this).css({cursor: "default"});  
		},
	});
}

var Place = {
	n: 0,
	
	newPlace: function() {
	
		Main.canvas.drawArc({
			strokeStyle: "#000",
			fillStyle: "#c33",
			
			strokeWidth: 1,
			x: 180, y: 200,
			radius: 50,
			
			name: "pl" + Place.n;
			
			layer: true,
			draggable: true,
			mouseover: function() {
				$(this).css({cursor: "pointer"});  
			},
			mouseout: function() {
				$(this).css({cursor: "default"});  
			},
		});
		
		var id = "pl" + this.n;
		
		this.n++;
		return Main.canvas.getLayer(id);
	
	},
	
}


