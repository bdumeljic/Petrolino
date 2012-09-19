function Action (source, target) {
	
	this.init = function(s, t) {
		this.source = s;
		this.target = t;

		// Generate unique id
		this.id = "pl" + Drawboard.actions.length;

		// Draw the actor
		this.actor = this.draw(this.id,this);
	}
	
	
	
	this.draw = function(id, delegate) {
		var s = delegate.source;
		var t = delegate.target;
		
		Drawboard.canvas.drawLine({
			strokeStyle: "#000",
			strokeWidth: 2,
			x1: s.x, y1: s.y,
			x2: t.x, y2: t.y,
			layer: true,
			bringToFront: true,
			name: "line" + id,
		});
		return Drawboard.canvas.getLayer("line" + id);
		
	};
	
	this.update = function() {
		var l = this.actor;
		var s = this.source;
		var t = this.target;
		// console.log(l);
		l.x1 = s.x;
		l.y1 = s.y;
		l.x2 = t.x;
		l.y2 = t.y;
	}
	
	this.init(source, target);
	
}