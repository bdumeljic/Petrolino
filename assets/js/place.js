function Place(x, y) {
	
	this.init = function() {
		// Set x and y defaults
		if(!x) {
			x = 150;
		}

		if(!y) {
			y = 150;
		}
		
		this.type = "place";
		
		// Generate unique id
		this.id = "pl" + Drawboard.places.length;
		
		
		// Build ToolTip
		this.toolTip = $('<div class="popover right"><div class="arrow"></div><h3 class="popover-title">' + this.id + '</h3><div class="popover-content"><p>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</p></div></div>');
		
		this.toolTip.css('position', 'absolute');
		this.toolTip.css('display', 'none');
		this.toolTip.css('z-index', '1000');		
		
		$('body').append(this.toolTip);
		
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
	
	this.toggleToolTip = function() {
		Drawboard.hideToolTips();
		this.toolTip.css({top: this.getY() - this.toolTip.height()/ 2 , left: this.getX() + 25});
		this.toolTip.toggle();
	}
	
	this.hideToolTip = function() {
		this.toolTip.hide();
	}
	
	this.draw = function(id, x, y, delegate) {
		Drawboard.canvas.drawArc({
			name: id,
		
			strokeStyle: "#000",
			fillStyle: "#c33",
			strokeWidth: 1,
			cornerRadius: 5,
		
			x: x, 
			y: y,
			radius:20,	
		
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
					delegate.toggleToolTip();	
				}
				var cP = Drawboard.canvas.getLayer(l.name + '_centerPoint');
				cP.x = l.x;
				cP.y = l.y;
			},
			click: function(e) {
				$(this).addClass("active");				
			},
			drag: function() {
				this.beingClicked = false;
				delegate.hideToolTip();
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
				Drawboard.isDrawing = true;
				Drawboard.startObject = delegate;
				l.visible = true;
			},
		});
		
		return Drawboard.canvas.getLayer(id);
	};
	
	this.init();
}
