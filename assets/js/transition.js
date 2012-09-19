function Transition(x, y) {

	this.init = function() {
		// Set x and y defaults
		if(!x) {
			x = 350;
		}

		if(!y) {
			y = 150;
		}
		
		this.type = "transition";
		
		// Generate unique id and name
		this.id = 'tr' + Drawboard.transitions.length;
		this.name = 'Transition ' + Drawboard.transitions.length;
		
		// Set description
		this.description = "Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum."
		
		this.tooltip = new Tooltip(this);
		// Draw the actor
		this.actor = this.draw(this.id, x, y, this);
	}
	
	this.getX = function() {
		var x = this.actor.x;
		console.log('x=' + x)
		return x;
		
	}
	
	this.getY = function() {
		var y = this.actor.y;
		console.log('y=' + y)
		return y;
	}
	
	this.hideCentralPoint = function() {
		var l = Drawboard.canvas.getLayer(this.id + '_centerPoint');
		l.visible = false;
	}
	
	this.draw = function(id, x, y, delegate) {
		
		Drawboard.canvas.drawRect({
			name: id,
		
			strokeStyle: "#333",
			fillStyle: "#999",
			strokeWidth: 0,
			cornerRadius: 6,
			
			shadowColor: "rgba(0, 0, 0, 0.2)",
  			shadowBlur: 10,
		
			x: x, 
			y: y,

			width: 40,
			height: 40,	
		
			layer: true,
			draggable: true,
			bringToFront: false,
		
			mouseover: function(l) {
				$(this).css({cursor: "pointer"});
				var cP = Drawboard.canvas.getLayer(l.name + '_centerPoint');
				cP.x = l.x;
				cP.y = l.y;
				cP.visible = true;
				Drawboard.possibleTargetObject = delegate;
			},
			mouseout: function(l) {
				$(this).css({cursor: "default"});
				if(!Drawboard.isDrawing) {
					var cP = Drawboard.canvas.getLayer(l.name + '_centerPoint');
					cP.x = l.x;
					cP.y = l.y;
					cP.visible = false; 
				}
				Drawboard.possibleTargetObject = null;
			},
			mousedown: function(l) {
				this.beingClicked = true;
				var cP = Drawboard.canvas.getLayer(l.name + '_centerPoint');
				cP.visible = false;
				
			},
			mouseup: function(l) {
				var cP = Drawboard.canvas.getLayer(l.name + '_centerPoint');
				cP.x = l.x;
				cP.y = l.y;
				cP.visible = true;
				
				if(this.beingClicked) {
					delegate.tooltip.update();
					delegate.tooltip.toggleToolTip();
				}
			},
			mousemove: function(l) {
			},
			click: function(l) {
			},
			drag: function() {
				this.beingClicked = false;
				delegate.tooltip.hideToolTip();
			}
		});
		
		Drawboard.canvas.drawArc({
			fillStyle: "#f00",
			x: x, y: y,
			radius: 5,
			name: id + '_centerPoint',
			
			layer: true,
			bringToFront: true,
			mousedown: function(l) {
				console.log("start drawing line");
				Drawboard.isDrawing = true;
				Drawboard.startObject = delegate;
				l.visible = true;
			},
			
			mouseup: function(l) {
				// console.log("stop drawing line");
				// Drawboard.isDrawing = false;
				// Drawboard.startObject = null;
				// l.visible = false;
			},
		});
		
		return Drawboard.canvas.getLayer(id);
	};
	
	this.toPNML = function() {
		res  = '<transition id="' + this.id + '">\n';
		
		res += '	<name>\n';
		res += '		<text>' + this.name + '</text>\n';
		res += '	</name>\n';
		
		res += '	<description>\n';
		res += '		<text>' + this.description + '</text>\n';
		res += '	</description>\n';
		
		res += '	<graphics>\n';
		res += '		<position x="' + this.actor.x + '" y="' + this.actor.y + '" />\n';
		res += '		<dimension x="' + this.actor.width + '" y="' + this.actor.height + '" />\n';
		res += '	</graphics>\n';
		
		res += '</transition>\n';
		
		return res;
	}

	this.init();
}
