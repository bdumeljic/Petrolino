$(document).ready(function() {
	Inspector.init();
})

var Inspector = {

	init: function() {
		this.events.init();
	}
}

Inspector.events = {

	init: function() {
		$("#startbutton").click(function(){Inspector.layout.showProjectInspector()});
	},
	
}

Inspector.layout = {
	
	showProjectInspector: function() {
		$("#inspector_intro").hide();
		$("#inspector_project").show();
	}
}