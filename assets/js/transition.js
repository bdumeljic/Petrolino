function transition () {

	this.name = "Transition name";
	this.description = "Description";
	
	this.draw = function() {
		$("canvas#board").drawRect({
		strokeStyle: "#000",
		fillStyle: "#666",
		strokeWidth: 3,
		x: 150, y: 100,
		width: 100,
		height: 100,
		cornerRadius: 5,
		layer: true,
		draggable: true,
		mouseover: function() {
			$(this).css({cursor: "pointer"});
		},
		mouseout: function() {
			$(this).css({cursor: "default"});  
		},
		mousedown: function() {
			console.log("Mouse down");
		},
		mouseup: function() {
			console.log("Mouse up");
		},
		click: function(e) {
			//console.log("Transition Clicked");
			$(this).addClass("active");  
			// var myContext = $(this).parent();
			// alert(tmp.fillStyle);
			// tmp.fillStyle = "#f00";
			// var tmp = mousePos(e);
			// alert(e.pageX +', '+ e.pageY);
			// alert(dump(tmp));
			/*
			var myCanvas = document.getElementById("board");
			var myContext = myCanvas.getContext("2d");
			myContext.moveTo(0,0);
			myContext.quadraticCurveTo(0,100,100,250);
			myContext.stroke();
			*/
		},
		drag: function() {
			//console.log("Transition Dragged");
		}
	});
		console.log("Transition drew");
	};
}