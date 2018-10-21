var canvasdiv = null;
var grid = null;
var canvas = null;

var gateList = [];

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

	grid.drawGrid();

	// draw sample and gate for use later.
	let x = 500;
	let y = 300;
	stroke(0);
	strokeWeight(1.25);
	var i;
	// draw all gates
	noFill();
	for (i = 0; i < gateList.length; i++) {
		line(gateList[i].getDrawingDimens()[0][0], gateList[i].getDrawingDimens()[0][1], gateList[i].getDrawingDimens()[0][2], gateList[i].getDrawingDimens()[0][3]);
		line(gateList[i].getDrawingDimens()[1][0], gateList[i].getDrawingDimens()[1][1], gateList[i].getDrawingDimens()[1][2], gateList[i].getDrawingDimens()[1][3]);
		line(gateList[i].getDrawingDimens()[2][0], gateList[i].getDrawingDimens()[2][1], gateList[i].getDrawingDimens()[2][2], gateList[i].getDrawingDimens()[2][3]);
		arc(gateList[i].getDrawingDimens()[3][0], gateList[i].getDrawingDimens()[3][1], gateList[i].getDrawingDimens()[3][2], gateList[i].getDrawingDimens()[3][3], gateList[i].getDrawingDimens()[3][4], gateList[i].getDrawingDimens()[3][5]);

		line(gateList[i].getDrawingDimens()[4][0], gateList[i].getDrawingDimens()[4][1], gateList[i].getDrawingDimens()[4][2], gateList[i].getDrawingDimens()[4][3]);
		line(gateList[i].getDrawingDimens()[5][0], gateList[i].getDrawingDimens()[5][1], gateList[i].getDrawingDimens()[5][2], gateList[i].getDrawingDimens()[5][3]);
		line(gateList[i].getDrawingDimens()[6][0], gateList[i].getDrawingDimens()[6][1], gateList[i].getDrawingDimens()[6][2], gateList[i].getDrawingDimens()[6][3]);
	}
}

function mouseClicked() {
	if (mouseButton == LEFT) {
		gateList.push(new AndGate(mouseX, mouseY));
	}
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

