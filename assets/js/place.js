function Place(x, y) {
	
	this.init = function() {
		// Set x and y defaults
		if(!x) {
			x = 350;
		}

		if(!y) {
			y = 150;
		}
		
		this.type = 'place';
		
		// Generate unique id
		this.id = 'pl' + Drawboard.placeCounter++;//places.length;
		this.name = 'Place ' + Drawboard.placeCounter;//places.length;
		
		// Set description
		this.description = "";//"Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum."
		// 
// 		
// 		// Build ToolTip
// 		this.toolTip = $('<div class="popover right"><div class="arrow"></div><h3 class="popover-title">' + this.id + '</h3><div class="popover-content"><p>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</p></div></div>');
// 		
// 		this.toolTip.css('position', 'absolute');
// 		this.toolTip.css('display', 'none');
// 		this.toolTip.css('z-index', '1000');		
// 		
// 		$('body').append(this.toolTip);
// 		
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
		Drawboard.canvas.drawArc({
			name: id,
		
			strokeStyle: "#111",
			fillStyle: "#c00",
			strokeWidth: 3,
			
			shadowColor: "rgba(0, 0, 0, .5)",
			shadowX: 0,
			shadowY: 0,
  			shadowBlur: 15,
		
			x: x, 
			y: y,
			radius:15,	
		
			layer: true,
			draggable: true,
		
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
			mousedown: function() {
				this.beingClicked = true;
			},
			mouseup: function(l) {
				if(this.beingClicked) {
					delegate.tooltip.update();
					delegate.tooltip.toggleToolTip();	
				}
				var cP = Drawboard.canvas.getLayer(l.name + '_centerPoint');
				cP.x = l.x;
				cP.y = l.y;
			},
			click: function(e) {
				$(this).addClass("active");				
			},
			drag: function(l) {
				this.beingClicked = false;
				var cP = Drawboard.canvas.getLayer(l.name + '_centerPoint');
				cP.visible = false;
				delegate.tooltip.hideToolTip();
			}
		});
		
		Drawboard.canvas.drawArc({
			fillStyle: "#000",
			x: x, y: y,
			radius: 5,
			name: id + '_centerPoint',
			
			layer: true,
			bringToFront: true,
			mousedown: function(l) {
				Drawboard.isDrawing = true;
				Drawboard.startObject = delegate;
				l.visible = true;
			},
		});
		
		return Drawboard.canvas.getLayer(id);
	};
	
	this.toPNML = function() {
		res  = '<place id="' + this.id + '">\n';
		
		res += '	<name>\n';
		res += '		<text>' + this.name + '</text>\n';
		res += '	</name>\n';
		
		res += '	<description>\n';
		res += '		<text>' + this.description + '</text>\n';
		res += '	</description>\n';
		
		res += '	<graphics>\n';
		res += '		<position x="' + this.actor.x + '" y="' + this.actor.y + '" />\n';
		res += '		<dimension x="' + this.actor.radius * 2 + '" y="' + this.actor.radius * 2 + '" />\n';
		res += '	</graphics>\n';
		
		res += '</place>\n';
		
		return res;
	}
	
	this.breakDown = function() {
		Drawboard.canvas.removeLayer(this.id);
		Drawboard.canvas.removeLayer(this.id + '_centerPoint');
		Drawboard.canvas.drawLayers();
	}

	
	this.init();
}
