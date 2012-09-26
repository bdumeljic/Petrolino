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
	
	placeCounter: 0,
	transitionCounter: 0,
	actionCounter: 0,
	
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
		
		//create Emitter
		Drawboard.emitter = new Emitter();

		// Initialize the board's event listeners
		// this.events.init();
		console.log("Drawboard initialized");
	},
	
	toPNML: function() {
	
		// General PNML
		res  = '﻿<?xml version="1.0" encoding="utf-8"?>\n';
		res += '<pnml>\n';
		// res += '	<net id="n1" type="http://www.pnml.org/version-2009/grammar/ptnet">\n';
		res += '	<net type="http://www.yasper.org/specs/epnml-1.1" id="do32">\n';
	  
		res += '		<description>\n';
		res += '			<text>\n';
		res += 					$('#globals-area').val();
		res += '			</text>\n';
		res += '		</description>\n';
		
		res += this.emitter.toPNML();
		
		// Generate transitions
		$.each(this.transitions, function() {
			res += this.toPNML();
		});
		
		// Generate places
		$.each(this.places, function() {
			res += this.toPNML();
		});
		
		// Generate actions
		$.each(this.actions, function() {
			res += this.toPNML();
		});
		
		// .. and closing tags.
		res += '	</net>\n';
		res += '</pnml>\n';
		
		return res;
	},
	
	hideToolTips: function() {
		$.each(this.places.concat(this.transitions).concat(this.emitter).concat(this.actions), function() {
			this.tooltip.hideToolTip();
		});
	},
	
	_updateLines: function() {
		//draw new line
		if(Drawboard.isDrawing == true) {
			//create and/or update existing dragging line
			var sO = Drawboard.startObject.actor;
			var l = Drawboard.canvas.getLayer("dragLine");
			
			if(!l) {
				Drawboard.canvas.drawBezier({
					strokeStyle: "#000",
					strokeWidth: 2,
					
					x1: sO.x, y1: sO.y,

					cx1: sO.x + 50, 	 cy1: sO.y,
					cx2: sO.mouseX - 50, cy2: sO.mouseY,

					x2: sO.mouseX, y2: sO.mouseY,
					
					shadowColor: "rgba(0, 0, 0, 0.5)",
  					shadowBlur: 12,
					
					layer: true,
					bringToFront: true,
					name: "dragLine",
				});
			} else {
				l.x1 = sO.x;
				l.y1 = sO.y;
				
				l.cx1 = sO.x + 50; 	 
				l.cy1 = sO.y;
				l.cx2 = sO.mouseX - 50; 
				l.cy2 = sO.mouseY;
				
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
			var sourceObject = Drawboard.startObject;
			//check if target object is opposite
			if(Drawboard.possibleTargetObject) {
				if(Drawboard.startObject.type != Drawboard.possibleTargetObject.type && Drawboard.possibleTargetObject.type != 'emitter') {
					var targetObject = Drawboard.possibleTargetObject;
				}
				//unset target if emitter tries to connect with transition
				if(Drawboard.startObject.type == 'emitter' && targetObject.type == 'transition') {
					var targetObject = null;
				}
				
			} else {
				//add place when there is no hittest with a target
				if(Drawboard.startObject.type == 'place') {
					var tr = new Transition(sourceObject.actor.mouseX,sourceObject.actor.mouseY);
					Drawboard.transitions.push(tr);
					var targetObject = tr;
				} else {
					var pl = new Place(sourceObject.actor.mouseX,sourceObject.actor.mouseY);
					Drawboard.places.push(pl);
					var targetObject = pl;
				}
			}
			
			if(targetObject && sourceObject) {
				//connect source and target
				var ac = new Action(sourceObject, targetObject);
				Drawboard.actions.push(ac);
			}
			Drawboard.startObject.hideCentralPoint();
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
	
	//remove connected actions
	removeConnections: function(refObject) {
		// var rem = [];
		// var col = Math.floor(Math.random()*16777215).toString(16);
		$.each(this.actions, function(index, value) {
			if (value != undefined) {
				// value.actor.strokeStyle = '#'+col;
				var s = value.source;
				var t = value.target;
				if(s == refObject) {
					// rem.push(value);
					Drawboard.removeAction(value);
				} else if(t == refObject) {
					// rem.push(value);
					Drawboard.removeAction(value);
				}
				if(s == undefined || t == undefined) {
					// rem.push(value);
					Drawboard.removeAction(value);
				}
				value.update();
			}
		});
	},
	
	
	// Remove place from array
	removePlace: function(placeObject) {
		this.removeConnections(placeObject);
		placeObject.breakDown();
		objectPosition = this.places.indexOf(placeObject);
		this.places.splice(objectPosition,1);
	},
	
	// Remove transition from array
	removeTransition: function(transitionObject) {
		this.removeConnections(transitionObject);
		transitionObject.breakDown();
		objectPosition = this.places.indexOf(transitionObject);
		this.transitions.splice(objectPosition,1);
	},
	
	// Remove action from array
	removeAction: function(actionObject) {
		actionObject.breakDown();
		// actionObject = undefined;
		objectPosition = this.places.indexOf(actionObject);
		this.actions[objectPosition] = {};
		// this.actions.splice(objectPosition,1);
	},
	removeObj: function(removeObject) {
		console.log("remove type: " + removeObject.type);
		switch(removeObject.type) {
			case "transition":
				this.removeTransition(removeObject);
				break;
			case "place":
				this.removePlace(removeObject);
				break;
			case "action":
				this.removeAction(removeObject);
				break;
		}
	}
	

}

