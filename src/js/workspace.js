var canvasWidth = 0;
var canvasHeight = 0;
var grid = null;

function setup() {
	const canvasdiv = select("#workspacediv");
	canvasWidth = canvasdiv.width;
	canvasHeight = canvasdiv.height;

	var canvas = createCanvas(canvasWidth, canvasHeight);
	canvas.parent("workspacediv");
	grid = new Grid();
}

function draw() {

	background(255);

	grid.show();

}