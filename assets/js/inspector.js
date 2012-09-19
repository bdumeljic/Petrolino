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
		$("#downloadbutton").click(function(){console.log("Inspector.events Dowload button clicked")});
		$("#convertbutton").click(function(){console.log("Inspector.events Convert button clicked")});		
	},
}

Inspector.layout = {
	
	showProjectInspector: function() {
		$("#inspector_intro").hide();
		$("#inspector_project").show();
	}
}