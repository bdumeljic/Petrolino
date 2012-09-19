$(document).ready(function() {
	Drawboard.init();
})

// Drawboard
// This class works as the main class
// and represents the canvas
var Drawboard = {
	
	// Array of all place objects
	places: [],

	// Array of all transition objects	
	transitions: [],
	
	// Array of all action objects
	actions: [],
	
	// Canvas
	canvas: null,
	
	
	// Initialize the board
	init: function() {
		
		this.canvas = $("canvas#board");
		
		// Set canvas to fullscreen
		this.canvas.attr("width",  $(document).width());
		this.canvas.attr("height",  $(document).height());
		
		// Initialize the board's event listeners
		this.events.init();
		console.log("Drawboard initialized");
	},
	
	// Remove place from array
	removePlace: function(placeObject) {
	 objectPosition = this.places.indexOx(placeObject);
	 this.places.splice(objectPosition,1);
	},
	
	// Remove transition from array
	removeTransition: function(transitionObject) {
	 objectPosition = this.places.indexOx(transitionObject);
	 this.transitions.splice(objectPosition,1);
	},
	
	// Remove action from array
	removeAction: function(actionObject) {
	 objectPosition = this.places.indexOx(actionObject);
	 this.actions.splice(objectPosition,1);
	},
	
	

}

// Drawboard.events
// This class holds all the event listeners for the drawboard
Drawboard.events = {

	init: function() {
		console.log("Drawboard.events initialized");
		$("#createPlace").click( function() {
			var pl = new Place();
			Drawboard.places.push(pl);
		});
		
		$("#createTransition").click( function() { 
			var tr = new Transition();
			Drawboard.transitions.push(tr);
		});
		
		$("#createAction").click( function() { 
			var ac = new Action();
			Drawboard.actions.push(ac);
		});
	}
}

Drawboard.layout = {
	
}
