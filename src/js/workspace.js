var canvasdiv = null;
var grid = null;
var canvas = null;

function setup() {
	canvasdiv = select("#workspacediv");
	let canvasWidth = canvasdiv.width;
	let canvasHeight = canvasdiv.height;

	canvas = createCanvas(canvasWidth, canvasHeight);
	canvas.parent("workspacediv");
	grid = new Grid();
}

function draw() {
	background(255);

	// canvas.height = document.getElementById("workspacediv").clientHeight;
	// canvas.width = document.getElementById("workspacediv").clientWidth;

	// console.log(document.getElementById("workspacediv").clientHeight);

	grid.draw();

}

function Point(x, y) {
	this.x = x;
	this.y = y;

	this.setX = function(x) {
		this.x = x;
	}

	this.setY = function(y) { 
		this.y = y;
	}

	this.setPoint = function(x,y) {
		this.setX(x);
		this.setY(y);
	}
	
}