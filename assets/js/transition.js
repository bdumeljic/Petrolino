function Transition(x, y) {

	if(!x) {
		x = 150;
	}
	
	if(!y) {
		y = 150;
	}
	
	this.init = function() {
		this.draw(this.id, x, y);
	}	
	
	this.id = "tr" + Drawboard.transitions.length;
	
	this.draw = function(id, x, y) {
		Drawboard.canvas.drawRect({
			name: name,
		
			strokeStyle: "#000",
			fillStyle: "#666",
			strokeWidth: 3,
			cornerRadius: 5,
		
			x: x, 
			y: y,
			width: 100,
			height: 100,	
		
			layer: true,
			draggable: true,
		
			mouseover: function() {
				$(this).css({cursor: "pointer"});
			},
			mouseout: function() {
				$(this).css({cursor: "default"});  
			},
			mousedown: function() {
				console.log("Mouse down");
			},
			mouseup: function() {
				console.log("Mouse up");
			},
			click: function(e) {
				$(this).addClass("active");  		
			},
			drag: function() {
				console.log("Drag");
			}
		});
		
		console.log("Transition drawn");
	};
	
	this.init();
}
