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
		return (delegate.getX() -this.layout.width()/ 2);
	}
	
	// Returns the y position relative to parent
	this.getY = function() {
		return (delegate.getY() + 25);
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
		// alert(e.target);
		var title = $(refObj.layout).find(".popover-title");//.unbind();
		var content = $(refObj.layout).find(".popover-content:first");//.unbind();
		title.unbind();
		content.unbind();
		
		var title_txt = title.find('#toolTipTitle').text();
		if(!title_txt) {
			title_txt = title.text();
		}
		
		var code = content.find('#toolTipCode').text();
		if(!code) {
			code = content.text();
		}
		if(code == 'Click to edit') {
			code = '';
		}

		title.html('<input type="text" id="toolTipTitle" value="' + title_txt + '" />');
		content.html('<textarea rows="6" class="code-area" style="margin-right: 15px;" id="toolTipCode" placeholder="Click to edit">' + code + '</textarea>');
		content.after('<div class="popover-content"><button type="submit" class="btn btn-block btn-primary" id="tooltipAction">Save</button></div>');
		
		$('#tooltipAction').click(function(e) {
			// alert(title);
			var title_val = $('#toolTipTitle').val();
			refObj.delegate.name = title_val;//'<p>' + code + '</p>';

			// var name = toolTipCode;
			var code_val = $('#toolTipCode').val();
			if(code_val != 'Click to edit') {
				refObj.delegate.description = code_val;//'<p>' + code + '</p>';
			}
			if (code_val == ''){
				code_val = 'Click to edit';
			}
			//alert(title + " cvs " + $(refObj.layout).find(".popover-title").html());
			title.html(title_val).bind("click", refObj.makeEditable);
			content.html(code_val).bind("click", refObj.makeEditable);
			$(this).parent().remove();
			// title.bind("click", refObj.makeEditable);
			/*
			content.click(function(e) {
				 alert('test');
				 refObj.makeEditable(e);
			});
			*/
		});
		//e.preventDefault();
		
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
		$(this.layout).find(".popover-title").html(this.name).bind("click", this.makeEditable);
		$(this.layout).find(".popover-content:first").html(this.description).bind("click", this.makeEditable);
	}
}
