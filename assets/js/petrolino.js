// tmp js
function dump(a) {
	var acc = []
	$.each(a, function(index, value) {
	    acc.push(index + ': ' + value);
	});
	return (JSON.stringify(acc));
}

function mousePos(e) {
	var x;
	var y;
	if (e.pageX || e.pageY) { 
	  x = e.pageX;
	  y = e.pageY;
	}
	else { 
	  x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
	  y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
	} 
	// x -= gCanvasElement.offsetLeft;
	// y -= gCanvasElement.offsetTop;
	var out = [x,y];
	return out;
}
function createTransition() {

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
		click: function(e) {
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
	});
}

// function createPlace() {
// 
// 	$("canvas#board").drawArc({
// 		strokeStyle: "#000",
// 		fillStyle: "#c33",
// 		strokeWidth: 1,
// 		x: 180, y: 200,
// 		radius: 50,
// 		layer: true,
// 		draggable: true,
// 		mouseover: function() {
// 			$(this).css({cursor: "pointer"});  
// 		},
// 		mouseout: function() {
// 			$(this).css({cursor: "default"});  
// 		},
// 	});
// }
$(document).ready(function() {
	$("#createTransition").bind('click',createTransition)
	//$("#createPlace").bind('click',createPlace)
})