function Action (source, target) {
	
	this.init = function(s, t) {
		this.source = s;
		this.target = t;

		// Generate unique id
		this.id = 'a' + Drawboard.actionCounter++;//actions.length;
		this.name = 'Action ' + Drawboard.actionCounter;//actions.length;
		this.type = 'action';
		
		// Set description
		this.description = "";//Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum."

        // Add the tooltip
        this.tooltip = new Tooltip(this);

        // Draw the actor
		this.actor = this.draw(this.id,this);
	}
	
	this.getX = function() {
		var x = this.actor.mouseX;//x1+(this.actor.x2/2);
		console.log('x=' + x)
		return x;
		
	}
	
	this.getY = function() {
		var y = this.actor.mouseY;//+(this.actor.y2/2);;
		console.log('y=' + y)
		return y;
	}
	
	this.draw = function(id, delegate) {
		var s = delegate.source.actor;
		var t = delegate.target.actor;
		
		Drawboard.canvas.drawBezier({
			strokeStyle: "#000",
			strokeWidth: 3,
			
			x1: s.x, y1: s.y,
			cx1: s.x + 50, cy1: s.y,
			cx2: t.x - 50, cy2: t.y,
			x2: t.x, y2: t.y,
			
			shadowColor: "rgba(0, 0, 0, 0.5)",
  			shadowBlur: 12,
			
			layer: true,
			bringToBack: true,
			name: "line" + id,

            mouseover: function(l) {
                $(this).css({cursor: "pointer"});
                Drawboard.possibleTargetObject = delegate;
            },
            mouseout: function(l) {
                $(this).css({cursor: "default"});
                Drawboard.possibleTargetObject = null;
            },
            mouseup: function(l) {
				console.log("action: " + this.beingClicked);
                if(this.beingClicked) {
                    delegate.tooltip.update();
                    delegate.tooltip.toggleToolTip();
                }
            },
            mousedown: function() {
                this.beingClicked = true;
            },
            click: function(l) {
            }
        });
		return Drawboard.canvas.getLayer("line" + id);
		
	};
	
	this.update = function() {
		var l = this.actor;
		var s = this.source.actor;
		var t = this.target.actor;
		// console.log(l);
		l.x1 = s.x;
		l.y1 = s.y;
		
		l.cx1 = s.x + 50; 	 
		l.cy1 = s.y;
		l.cx2 = t.x - 50; 
		l.cy2 = t.y;
				
		l.x2 = t.x;
		l.y2 = t.y;
	}
	
	this.toPNML = function() {
		res  = '<arc id="' + this.id + '" source="' + this.source.id + '" target="' + this.target.id + '">\n';
		
		res += '	<name>\n';
		res += '		<text>' + this.name + '</text>\n';
		res += '	</name>\n';
		
		res += '	<description>\n';
		res += '		<text>' + this.description + '</text>\n';
		res += '	</description>\n';
		
		res += '</arc>\n';
		
		return res;
	}
	
	this.breakDown = function() {
		console.log("remove line: " + this.id)
		Drawboard.canvas.removeLayer("line" + this.id);
		Drawboard.canvas.drawLayers();
	}
	
	this.init(source, target);
	
}
