function dump(a) {
	var acc = []
	$.each(a, function(index, value) {
	    acc.push(index + ': ' + value);
	});
	alert(JSON.stringify(acc));
}

function Tooltip(delegate) {
	var refObj = this;
	
	// Parent object
	this.delegate = delegate;

	// Template
	this.layout = $('<div class="popover bottom"><div class="arrow"></div><h3 class="popover-title">' + this.name + '</h3><div class="popover-content"><p>' + this.description + '</p></div></div>');
	
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
	this.makeEditable = function(e) {
		$(e.target).unbind();
		var code = $(e.target).find('#toolTipCode').text();
		if(!code) {
			code = $(e.target).text();
		}
		if(code == 'Click to edit') {
			code = '';
		}
		$(e.target).html('<textarea rows="10" style="margin-right: 15px;" id="toolTipCode" placeholder="Click to edit">' + code + '</textarea>');
		$(e.target).append('<button type="submit" class="btn btn-block btn-primary" id="tooltipAction">Save</button>');
		$('#tooltipAction').bind('click',function() {
			// var name = toolTipCode;
			var code = $('#toolTipCode').val();
			if(code != 'Click to edit') {
				refObj.delegate.description = code;//'<p>' + code + '</p>';
			}
			if (code == ''){
				code = 'Click to edit';
			}
			$(refObj.layout).find(".popover-content").html(code).bind("click", refObj.makeEditable);
		
			
		});
	// .hide();//('ts');
	}
	this.saveData = function(e) {
		// alert('test');
		// var name = toolTipCode;
		// var code = $('#toolTipCode').val();
		// alert(code);
	}
	// Update tooltip
	this.update = function() {
		console.log("Update");
		// Update variables
		this.name = delegate.name;
		this.description = delegate.description;
		
		if(this.description == '') {
			 this.description = 'Click to edit';
		}
		
		// Update layout
		$(this.layout).find(".popover-title").html(this.name);
		$(this.layout).find(".popover-content").html(this.description).bind("click", this.makeEditable);
	}
}