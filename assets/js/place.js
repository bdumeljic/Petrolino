function Place(x, y) {
	
	this.init = function() {
		// Set x and y defaults
		if(!x) {
			x = 150;
		}

		if(!y) {
			y = 150;
		}
		
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
		
			mouseover: function() {
				$(this).css({cursor: "pointer"});
			},
			mouseout: function() {
				$(this).css({cursor: "default"});  
			},
			mousedown: function() {
				this.beingClicked = true;
			},
			mouseup: function() {
				if(this.beingClicked) {
					delegate.toggleToolTip();	
				}
			},
			click: function(e) {
				$(this).addClass("active");				
			},
			drag: function() {
				this.beingClicked = false;
				delegate.hideToolTip();
			}
		});
		
		return Drawboard.canvas.getLayer(id);
	};
	
	this.init();
}
