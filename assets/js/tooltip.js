function Tooltip(delegate) {
	
	// Parent object
	this.delegate = delegate;
	
	// Template
	this.layout = $('<div class="popover right"><div class="arrow"></div><h3 class="popover-title">' + this.name + '</h3><div class="popover-content"><p>' + this.description + '</p></div></div>');
	
	// CSS
	this.layout.css('position', 'absolute');
	this.layout.css('display', 'none');
	this.layout.css('z-index', '1000');		
	
	// Add to canvas
	$('body').append(this.layout);

	// Returns the x position relative to parent
	this.getX = function() {
		return (delegate.getX() + 25);
	}
	
	// Returns the y position relative to parent
	this.getY = function() {
		return (delegate.getY() - this.layout.height()/ 2);
	}
	
	// Toggle tooltip
	this.showToolTip = function() {
		Drawboard.hideToolTips();
		this.layout.css({top: this.getY(), left: this.getX()});
		this.layout.show();
	}
	
	// Hide tooltip
	this.hideToolTip = function() {
		this.layout.hide();
	}
	
	this.toggleToolTip = function() {
		if($(this.layout).is(":hidden"))
			this.showToolTip();
		else
			this.hideToolTip();
	}
	
	// Update tooltip
	this.update = function() {
		console.log("Update");
		// Update variables
		this.name = delegate.name;
		this.description = delegate.description;
		
		// Update layout
		$(this.layout).find(".popover-title").html(this.name);
		$(this.layout).find(".popover-content").html(this.description);
	}
}