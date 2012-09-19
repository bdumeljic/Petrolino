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
	
	isDrawing: false,
	
	startObject: null,
	possibleTargetObject: null,
	
	
	// Initialize the board
	init: function() {
		
		this.canvas = $("canvas#board");
		
		// Set canvas to fullscreen
		this.canvas.attr("width",  $(document).width());
		this.canvas.attr("height",  $(document).height());
		
		//add mousemove listerner
		this.canvas.bind("mousemove", this._updateLines);
		this.canvas.bind("mouseup", this._stopDrawing);

		// Initialize the board's event listeners
		this.events.init();
		console.log("Drawboard initialized");
	},
	
	hideToolTips: function() {
		$.each(this.places.concat(this.transitions), function() {
			this.hideToolTip();
		});
	},
	
	_updateLines: function() {
		//draw new line
		if(Drawboard.isDrawing == true) {
			//create and/or update existing dragging line
			var sO = Drawboard.startObject.actor;
			var l = Drawboard.canvas.getLayer("dragLine");
			
			if(!l) {
				Drawboard.canvas.drawLine({
					strokeStyle: "#000",
					strokeWidth: 2,
					x1: sO.x, y1: sO.y,
					x2: sO.mouseX, y2: sO.mouseY,
					layer: true,
					bringToFront: true,
					name: "dragLine",
				});
			} else {
				l.x1 = sO.x;
				l.y1 = sO.y;
				l.x2 = sO.mouseX;
				l.y2 = sO.mouseY;
				l.bringToFront = true;
				l.visible = true;
			}
		}
		
		
		//loop trhough actions and update connections
		$.each(Drawboard.actions, function(index, value) {
			Drawboard.actions[index].update();
		});
		
		
	},
	_stopDrawing: function() {
		Drawboard.isDrawing = false;
		if(Drawboard.startObject) {
			var sourceObject = Drawboard.startObject.actor;
			//check if target object is opposite
			if(Drawboard.possibleTargetObject) {
				if(Drawboard.startObject.type != Drawboard.possibleTargetObject.type) {
					var targetObject = Drawboard.possibleTargetObject.actor;
				}
			}
			
			if(!targetObject) {
				//add place when there is no hittest with a target
				if(Drawboard.startObject.type == 'place') {
					var tr = new Transition(sourceObject.mouseX,sourceObject.mouseY);
					Drawboard.transitions.push(tr);
					var targetObject = tr.actor;
				} else {
					var pl = new Place(sourceObject.mouseX,sourceObject.mouseY);
					Drawboard.places.push(pl);
					var targetObject = pl.actor;
				}
			}
			
			//connect source and target
			var ac = new Action(sourceObject, targetObject);
			Drawboard.actions.push(ac);
			
			// Drawboard.startObject.actor.visible = false;
			Drawboard.startObject = null;
			//_updateLines();
			var dL = Drawboard.canvas.getLayer("dragLine");
			dL.visible = false;
		}
	},
	addPlace: function(placeObject) {
		console.log("Adding placeObject");
		this.places.push(placeObject);
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
