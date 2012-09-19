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
	
	isDrawing: false,
	
	startObject: null,
	
	
	// Initialize
	init: function() {
		this.canvas = $("canvas#board");
		
		//fullscreen canvas
		this.canvas.attr("width",  $(document).width());
		this.canvas.attr("height",  $(document).height());
		
		//add mousemove listerner
		this.canvas.bind("mousemove", this._updateLines);
		this.canvas.bind("mouseup", this._stopDrawing);
		
		
		
		this.events.init();
		console.log("Drawboard initialized");
	},
	
	_updateLines: function() {
		if(Drawboard.isDrawing == true) {
			// console.log("Drawing " + Drawboard.isDrawing);
			
			var sO = Drawboard.startObject;
			// var sO = Drawboard.startObj;
			console.log("Drawing " + sO.mouseY);
			var l = Drawboard.canvas.getLayer("dragLine");
			
			if(!l) {
				Drawboard.canvas.drawLine({
					strokeStyle: "#000",
					strokeWidth: 10,
					x1: sO.x, y1: sO.y,
					x2: sO.mouseX, y2: sO.mouseY,
					layer: true,
					brinToFront: true,
					name: "dragLine",
				});
			} else {
				l.x1 = sO.x;
				l.y1 = sO.y;
				l.x2 = sO.mouseX;
				l.y2 = sO.mouseY;
			}
			// alert('line');
		}
		// alert('move');
	},
	_stopDrawing: function() {
		Drawboard.isDrawing = false;
		Drawboard.startObject = null;
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
		
		$("#createTransition").click( function() { 
			var tr = new Transition();
			Drawboard.transitions.push(tr);
		});
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
