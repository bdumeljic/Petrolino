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
		
		var layer = Drawboard.canvas.drawRect({
			name: name,
		
			strokeStyle: "#000",
			fillStyle: "#666",
			strokeWidth: 1,
			cornerRadius: 5,
		
			x: x, 
			y: y,
			width: 50,
			height: 50,	
		
			layer: true,
			draggable: true,
			bringToFront: false,
		
			mouseover: function(l) {
				$(this).css({cursor: "pointer"});
				var cP = Drawboard.canvas.getLayer(l.name + '_centerPoint');
				cP.x = l.x;
				cP.y = l.y;
				cP.visible = true;
			},
			mouseout: function(l) {
				$(this).css({cursor: "default"});
				if(!Drawboard.isDrawing) {
					var cP = Drawboard.canvas.getLayer(l.name + '_centerPoint');
					cP.x = l.x;
					cP.y = l.y;
					cP.visible = false; 
				}
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
				l.visible = true;
			},
			
			mouseup: function(l) {
				// console.log("stop drawing line");
				// Drawboard.isDrawing = false;
				// Drawboard.startObject = null;
				// l.visible = false;
			},
		});
		
		console.log("Transition drawn");
	};

	this.init();
}
