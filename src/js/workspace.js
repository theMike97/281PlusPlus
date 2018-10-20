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

	grid.draw();

}

function windowResized() {
	resizeCanvas(document.getElementById("workspacediv").clientWidth, document.getElementById("workspacediv").clientHeight);
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