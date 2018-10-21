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
	// let x = 500;
	// let y = 300;
	stroke(0);
	strokeWeight(1.25);
	var i;
	// draw all gates
	noFill();
	// bezier(
	// 	grid.getOrigin().x + x, grid.getOrigin().y + y,
	// 	grid.getOrigin().x + 0.75*grid.getGridSize() + x, grid.getOrigin().y + grid.getGridSize() + y,
	// 	grid.getOrigin().x + 0.75*grid.getGridSize() + x, grid.getOrigin().y + 3*grid.getGridSize() + y,
	// 	grid.getOrigin().x + x, grid.getOrigin().y + 4*grid.getGridSize() + y
	// 	);
	// line(grid.getOrigin().x + x, grid.getOrigin().y + y, grid.getOrigin().x + 2*grid.getGridSize() + x, grid.getOrigin().y + y);
	// line(grid.getOrigin().x + x, grid.getOrigin().y + 4*grid.getGridSize() + y, grid.getOrigin().x + 2*grid.getGridSize() + x, grid.getOrigin().y + 4*grid.getGridSize() + y);
	// bezier(
	// 	grid.getOrigin().x + 2*grid.getGridSize() + x, grid.getOrigin().y + y, 
	// 	grid.getOrigin().x + 3.8*grid.getGridSize() + x, grid.getOrigin().y + y, 
	// 	grid.getOrigin().x + 3.8*grid.getGridSize() + x, grid.getOrigin().y + 1.8*grid.getGridSize() + y, 
	// 	grid.getOrigin().x + 4*grid.getGridSize() + x, grid.getOrigin().y + 2*grid.getGridSize() + y
	// 	);
	// bezier(
	// 	grid.getOrigin().x + x + 2*grid.getGridSize(), grid.getOrigin().y + y + 4*grid.getGridSize(), 
	// 	grid.getOrigin().x + 3.8*grid.getGridSize() + x, grid.getOrigin().y + 4*grid.getGridSize() + y, 
	// 	grid.getOrigin().x + 3.8*grid.getGridSize() + x, grid.getOrigin().y + 2.2*grid.getGridSize() + y, 
	// 	grid.getOrigin().x + 4*grid.getGridSize() + x, grid.getOrigin().y + 2*grid.getGridSize() + y
	// 	);
	// line(grid.getOrigin().x + 0.4*grid.getGridSize() + x, grid.getOrigin().y + grid.getGridSize() + y, grid.getOrigin().x - grid.getGridSize() + x, grid.getOrigin().y + grid.getGridSize() + y);
	// line(grid.getOrigin().x + 0.4*grid.getGridSize() + x, grid.getOrigin().y +3*grid.getGridSize() + y, grid.getOrigin().x - grid.getGridSize() + x, grid.getOrigin().y + 3*grid.getGridSize() + y);

	// line(grid.getOrigin().x + 4*grid.getGridSize() + x, grid.getOrigin().y + 2*grid.getGridSize() + y, grid.getOrigin().x + 5*grid.getGridSize() + x, grid.getOrigin().y + 2*grid.getGridSize() + y);
	
	let gate = null;
	let gateDims = null;
	for (i = 0; i < gateList.length; i++) {
		gate = gateList[i];
		gateDims = gate.getDrawingDimens();
		if (gate instanceof AndGate) {
			line(gateDims[0][0], gateDims[0][1], gateDims[0][2], gateDims[0][3]);
			line(gateDims[1][0], gateDims[1][1], gateDims[1][2], gateDims[1][3]);
			line(gateDims[2][0], gateDims[2][1], gateDims[2][2], gateDims[2][3]);
			arc(gateDims[3][0], gateDims[3][1], gateDims[3][2], gateDims[3][3], gateDims[3][4], gateDims[3][5]);

			line(gateDims[4][0], gateDims[4][1], gateDims[4][2], gateDims[4][3]);
			line(gateDims[5][0], gateDims[5][1], gateDims[5][2], gateDims[5][3]);
			line(gateDims[6][0], gateDims[6][1], gateDims[6][2], gateDims[6][3]);
		} else if (gate instanceof OrGate) {
			bezier(gateDims[0][0],gateDims[0][1],gateDims[0][2],gateDims[0][3],gateDims[0][4],gateDims[0][5],gateDims[0][6],gateDims[0][7]);
			line(gateDims[1][0],gateDims[1][1],gateDims[1][2],gateDims[1][3]);
			line(gateDims[2][0],gateDims[2][1],gateDims[2][2],gateDims[2][3]);
			bezier(gateDims[3][0],gateDims[3][1],gateDims[3][2],gateDims[3][3],gateDims[3][4],gateDims[3][5],gateDims[3][6],gateDims[3][7]);
			bezier(gateDims[4][0],gateDims[4][1],gateDims[4][2],gateDims[4][3],gateDims[4][4],gateDims[4][5],gateDims[4][6],gateDims[4][7]);
			line(gateDims[5][0],gateDims[5][1],gateDims[5][2],gateDims[5][3]);
			line(gateDims[6][0],gateDims[6][1],gateDims[6][2],gateDims[6][3]);
			line(gateDims[7][0],gateDims[7][1],gateDims[7][2],gateDims[7][3]);
		}
	}
}

function mouseClicked() {
	let component = 1;
	if (mouseButton == LEFT) {
		if (mouseX > 0 && mouseY > 0) {
			switch(component) {
				case 0:
					gateList.push(new AndGate(mouseX, mouseY));
					break;
				case 1:
					gateList.push(new OrGate(mouseX, mouseY));
			}
		}
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

