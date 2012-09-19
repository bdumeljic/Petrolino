$(document).ready(function() {
	Drawboard.init();
})

// Main class
var Drawboard = {
	
	// Array of all place objects
	places: [],

	// Array of all transition objects	
	transitions: [],
	
	// Array of all action objects
	actions: [],
	
	// Canvas
	canvas: null,
	
	
	// Initialize
	init: function() {
		this.canvas = $("canvas#board");
		
		this.events.init();
		console.log("Drawboard initialized");
	},
	
	addPlace: function(placeObject) {
		console.log("Adding placeObject");
		this.places.push(placeObject);
	},
	
	removePlace: function(placeObject) {
	 objectPosition = this.places.indexOx(placeObject);
	 this.places.splice(objectPosition,1);
	},
	
	getPlaces: function() {
		return this.places;
	},
	
	addTransition: function(transitionObject) {
		console.log("Adding transitionObject");
		this.transitions.push(transitionObject);
	},
	
	getTransitions: function() {
		return this.transitions;
	},
	
	removeTransition: function(transitionObject) {
	 objectPosition = this.places.indexOx(transitionObject);
	 this.transitions.splice(objectPosition,1);
	},
	
	addAction: function(actionObject) {
	
	},
	
	getActions: function() {
		return this.actions;
	},
	
	removeAction: function(actionObject) {
	 objectPosition = this.places.indexOx(actionObject);
	 this.actions.splice(objectPosition,1);
	},
	
	

}

Drawboard.events = {

	init: function() {
		console.log("Drawboard.events initialized");
		$("#createPlace").click( function() { Drawboard.layout.addPlace(); });
		$("#createTransition").click( function() { Drawboard.layout.addTransition(); });
	}
}

Drawboard.layout = {
	addPlace: function() {
		console.log("Drawboard.layout Place added");
		var placeObject = new place();
		placeObject.draw();
		
		Drawboard.addPlace(placeObject);
		console.log("Drawboard.layout Total places: "+Drawboard.getPlaces().length);
	},
	addTransition: function() {
		console.log("Drawboard.layout Transition added");
		var transitionObject = new transition();
		transitionObject.draw();
		
		Drawboard.addTransition(transitionObject);
		console.log("Drawboard.layout Total transition: "+Drawboard.getTransitions().length);
	}
}