function place () {

	this.name = "Place name";
	this.description = "Description";
	
	this.draw = function() {
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
			click: function() {
				//console.log("Place Clicked");
			},
			drag: function() {
				//console.log("Place dragged");
			},
		});
		console.log("Place drew");
	};
}