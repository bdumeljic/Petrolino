// tmp js
function dump(a) {
	var acc = []
	$.each(a, function(index, value) {
	    acc.push(index + ': ' + value);
	});
	alert(JSON.stringify(acc));
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