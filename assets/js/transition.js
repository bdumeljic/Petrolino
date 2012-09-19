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
	var name = this.id;
	
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
			bringToFront: false,
		
			mouseover: function(l) {
				$(this).css({cursor: "pointer"});
			},
			mouseout: function() {
				$(this).css({cursor: "default"});  
			},
			mousedown: function() {
				console.log("Mouse down");
			},
			mouseup: function(l) {
				console.log("Mouse up");
				var cP = Drawboard.canvas.getLayer(l.name + '_centerPoint');
				cP.x = l.x;
				cP.y = l.y;
			},
			mousemove: function(l) {
				var cP = Drawboard.canvas.getLayer(l.name + '_centerPoint');
				cP.x = l.x;
				cP.y = l.y;
			},
			click: function(l) {
			},
			drag: function() {
				console.log("Drag");
			}
		});
		Drawboard.canvas.drawArc({
			fillStyle: "#f00",
			x: x, y: y,
			radius: 5,
			name: name + '_centerPoint',
			
			layer: true,
			bringToFront: true,
			mousedown: function(l) {
				console.log("start drawing line");
				Drawboard.isDrawing = true;
				Drawboard.startObject = l;
			},
			
			mouseup: function(l) {
				console.log("stop drawing line");
				Drawboard.isDrawing = false;
				Drawboard.startObject = null;
			},
		});
		
		console.log("Transition drawn");
	};

	this.init();
}
