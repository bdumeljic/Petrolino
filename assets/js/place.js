function dump(a) {
	var acc = []
	$.each(a, function(index, value) {
	    acc.push(index + ': ' + value);
	});
	alert(JSON.stringify(acc));
}

function place () {

	this.name = "Place name";
	this.description = "Description";
	
	this.draw = function() {
		var _isDrawing = false;
		var _startX = 200;
		var _startY = 200;
		
		Drawboard.canvas.drawArc({
			strokeStyle: "#000",
			fillStyle: "#c33",
			strokeWidth: 1,
			x: _startX, y: _startY,
			radius: 50,
			layer: true,
			draggable: true,
			mouseover: function(l) {
				// console.log("Place mouseover");
				$(this).css({cursor: "pointer"});
				l.fillStyle = "#c66";
			},
			mouseout: function(l) {
				$(this).css({cursor: "default"});  
				l.fillStyle = "#c33";
			},
			/*
			mousedown: function(l) {
				console.log("start drawing line");
				_isDrawing = true;
				_startX = l.x;
				_startY = l.y;
				// dx = layer.mouseX - layer.x;
				    // dy = layer.mouseY - layer.y;
			},
			mousemove: function(l) {
				if(_isDrawing) {
					Drawboard.canvas.drawLine({
					  strokeStyle: "#000",
					  strokeWidth: 10,
					  x1: _startX, y1: _startY,
					  x2: l.mouseX, y2: l.mouseY,
					});
				}
				
				// console.log("update dragging line");
			},
			mouseup: function(l) {
				console.log("stop drawing line");
				_isDrawing = false;
			},
			*/
			click: function(l) {
				console.log("Place Clicked");
				// alert(l.x);
			},
			drag: function() {
				//console.log("Place dragged");
			},
		});
		console.log("Place drew");
	};
}