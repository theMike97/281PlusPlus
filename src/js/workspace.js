var grid = null;

var gateList = [];
var componentList = [];

var component = -1;

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

	var workspace = document.getElementById("workspacediv");
	if (workspace.addEventListener) {
    	// IE9, Chrome, Safari, Opera
    	workspace.addEventListener("mousewheel", MouseWheelHandler, false);
    	// Firefox
    	workspace.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
	} // IE 6/7/8
	else {
	    workspace.attachEvent("onmousewheel", MouseWheelHandler);
	}

	grid.drawGrid();

	// draw sample and gate for use later.
	// let x = 200;
	// let y = 300;

	stroke(0);
	// strokeWeight(2);
	if (grid.getGridSize() < 5) {
		strokeWeight(1);
	} else if (grid.getGridSize() < 10) {
		strokeWeight(1.5);
	} else {
		strokeWeight(2);
	}
	var i;
	// draw all gates
	noFill();

	let gate = null;
	let gateDims = null;
	for (i = 0; i < gateList.length; i++) {
		gate = gateList[i];
		gateDims = gate.getDrawingDimens();
		if (gate instanceof NotGate) {
			// not gate body
			line(gateDims[0][0], gateDims[0][1], gateDims[0][2], gateDims[0][3]);
			line(gateDims[1][0], gateDims[1][1], gateDims[1][2], gateDims[1][3]);
			line(gateDims[2][0], gateDims[2][1], gateDims[2][2], gateDims[2][3]);
			ellipse(gateDims[3][0], gateDims[3][1], gateDims[3][2], gateDims[3][3]);
			line(gateDims[4][0], gateDims[4][1], gateDims[4][2], gateDims[4][3]);
			line(gateDims[5][0], gateDims[5][1], gateDims[5][2], gateDims[5][3]);
		} else if (gate instanceof AndGate) {
			// and gate body
			line(gateDims[0][0], gateDims[0][1], gateDims[0][2], gateDims[0][3]);
			line(gateDims[1][0], gateDims[1][1], gateDims[1][2], gateDims[1][3]);
			line(gateDims[2][0], gateDims[2][1], gateDims[2][2], gateDims[2][3]);
			arc(gateDims[3][0], gateDims[3][1], gateDims[3][2], gateDims[3][3], gateDims[3][4], gateDims[3][5]);
			// i/o nodes
			line(gateDims[4][0], gateDims[4][1], gateDims[4][2], gateDims[4][3]);
			line(gateDims[5][0], gateDims[5][1], gateDims[5][2], gateDims[5][3]);
			line(gateDims[6][0], gateDims[6][1], gateDims[6][2], gateDims[6][3]);
		} else if (gate instanceof OrGate) {
			// or gate body
			bezier(gateDims[0][0], gateDims[0][1], gateDims[0][2], gateDims[0][3], gateDims[0][4], gateDims[0][5], gateDims[0][6], gateDims[0][7]);
			line(gateDims[1][0], gateDims[1][1], gateDims[1][2], gateDims[1][3]);
			line(gateDims[2][0], gateDims[2][1], gateDims[2][2], gateDims[2][3]);
			bezier(gateDims[3][0], gateDims[3][1], gateDims[3][2], gateDims[3][3], gateDims[3][4], gateDims[3][5], gateDims[3][6], gateDims[3][7]);
			bezier(gateDims[4][0], gateDims[4][1], gateDims[4][2], gateDims[4][3], gateDims[4][4], gateDims[4][5], gateDims[4][6], gateDims[4][7]);
			// i/o nodes
			line(gateDims[5][0], gateDims[5][1], gateDims[5][2], gateDims[5][3]);
			line(gateDims[6][0], gateDims[6][1], gateDims[6][2], gateDims[6][3]);
			line(gateDims[7][0], gateDims[7][1], gateDims[7][2], gateDims[7][3]);
		} else if (gate instanceof XorGate) {
			// xor gate body
			bezier(gateDims[0][0], gateDims[0][1], gateDims[0][2], gateDims[0][3], gateDims[0][4], gateDims[0][5], gateDims[0][6], gateDims[0][7]);
			bezier(gateDims[1][0], gateDims[1][1], gateDims[1][2], gateDims[1][3], gateDims[1][4], gateDims[1][5], gateDims[1][6], gateDims[1][7]);
			line(gateDims[2][0], gateDims[2][1], gateDims[2][2], gateDims[2][3]);
			line(gateDims[3][0], gateDims[3][1], gateDims[3][2], gateDims[3][3]);
			bezier(gateDims[4][0], gateDims[4][1], gateDims[4][2], gateDims[4][3], gateDims[4][4], gateDims[4][5], gateDims[4][6], gateDims[4][7]);
			bezier(gateDims[5][0], gateDims[5][1], gateDims[5][2], gateDims[5][3], gateDims[5][4], gateDims[5][5], gateDims[5][6], gateDims[5][7]);
			// i/o nodes
			line(gateDims[6][0], gateDims[6][1], gateDims[6][2], gateDims[6][3]);
			line(gateDims[7][0], gateDims[7][1], gateDims[7][2], gateDims[7][3]);
			line(gateDims[8][0], gateDims[8][1], gateDims[8][2], gateDims[8][3]);
		} else if (gate instanceof NandGate) {
			// nand gate body
			line(gateDims[0][0], gateDims[0][1], gateDims[0][2], gateDims[0][3]);
			line(gateDims[1][0], gateDims[1][1], gateDims[1][2], gateDims[1][3]);
			line(gateDims[2][0], gateDims[2][1], gateDims[2][2], gateDims[2][3]);
			arc(gateDims[3][0], gateDims[3][1], gateDims[3][2], gateDims[3][3], gateDims[3][4], gateDims[3][5]);
			ellipse(gateDims[4][0], gateDims[4][1], gateDims[4][2], gateDims[4][3]);
			// i/o nodes
			line(gateDims[5][0], gateDims[5][1], gateDims[5][2], gateDims[5][3]);
			line(gateDims[6][0], gateDims[6][1], gateDims[6][2], gateDims[6][3]);
			line(gateDims[7][0], gateDims[7][1], gateDims[7][2], gateDims[7][3]);
		} else if (gate instanceof NorGate) {
			// nor gate body
			bezier(gateDims[0][0], gateDims[0][1], gateDims[0][2], gateDims[0][3], gateDims[0][4], gateDims[0][5], gateDims[0][6], gateDims[0][7]);
			line(gateDims[1][0], gateDims[1][1], gateDims[1][2], gateDims[1][3]);
			line(gateDims[2][0], gateDims[2][1], gateDims[2][2], gateDims[2][3]);
			bezier(gateDims[3][0], gateDims[3][1], gateDims[3][2], gateDims[3][3], gateDims[3][4], gateDims[3][5], gateDims[3][6], gateDims[3][7]);
			bezier(gateDims[4][0], gateDims[4][1], gateDims[4][2], gateDims[4][3], gateDims[4][4], gateDims[4][5], gateDims[4][6], gateDims[4][7]);
			ellipse(gateDims[5][0], gateDims[5][1], gateDims[5][2], gateDims[5][3]);
			// i/o nodes
			line(gateDims[6][0], gateDims[6][1], gateDims[6][2], gateDims[6][3]);
			line(gateDims[7][0], gateDims[7][1], gateDims[7][2], gateDims[7][3]);
			line(gateDims[8][0], gateDims[8][1], gateDims[8][2], gateDims[8][3]);
		} else if (gate instanceof XnorGate) {
			// xnor gate body
			bezier(gateDims[0][0], gateDims[0][1], gateDims[0][2], gateDims[0][3], gateDims[0][4], gateDims[0][5], gateDims[0][6], gateDims[0][7]);
			bezier(gateDims[1][0], gateDims[1][1], gateDims[1][2], gateDims[1][3], gateDims[1][4], gateDims[1][5], gateDims[1][6], gateDims[1][7]);
			line(gateDims[2][0], gateDims[2][1], gateDims[2][2], gateDims[2][3]);
			line(gateDims[3][0], gateDims[3][1], gateDims[3][2], gateDims[3][3]);
			bezier(gateDims[4][0], gateDims[4][1], gateDims[4][2], gateDims[4][3], gateDims[4][4], gateDims[4][5], gateDims[4][6], gateDims[4][7]);
			bezier(gateDims[5][0], gateDims[5][1], gateDims[5][2], gateDims[5][3], gateDims[5][4], gateDims[5][5], gateDims[5][6], gateDims[5][7]);
			ellipse(gateDims[6][0], gateDims[6][1], gateDims[6][2], gateDims[6][3]);
			// i/o nodes
			line(gateDims[7][0], gateDims[7][1], gateDims[7][2], gateDims[7][3]);
			line(gateDims[8][0], gateDims[8][1], gateDims[8][2], gateDims[8][3]);
			line(gateDims[9][0], gateDims[9][1], gateDims[9][2], gateDims[9][3]);
		}
	}
}

function MouseWheelHandler(e) {
	if (shift == 1) { // shift+scroll allows user to scroll physical web page if screen is compressed (split screen perhaps)
    	// cross-browser wheel delta
    	var e = window.event || e; // old IE support
    	var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

    	if (grid.getGridSize() > 1 && delta < 0) {
    		let i;
    		let newX = 0;
    		let newY = 0;
    		for (i = 0; i < componentList.length; i++) {
    			offsetX = componentList[i].getXY().x / grid.getGridSize();
    			offsetY = componentList[i].getXY().y / grid.getGridSize();
    			componentList[i].changeXY(delta * offsetX, delta * offsetY);
    		}
    		grid.changeGridSize(delta);
    	}
    	if (delta > 0) {
    		let i;
    		let newX = 0;
    		let newY = 0;
    		for (i = 0; i < componentList.length; i++) {
    			offsetX = componentList[i].getXY().x / grid.getGridSize();
    			offsetY = componentList[i].getXY().y / grid.getGridSize();
    			componentList[i].changeXY(delta * offsetX, delta * offsetY);
    		}
    		grid.changeGridSize(delta);
    	}
    	return false;
	}
}

function mouseClicked() {
	let gate;
	let sideNav = document.getElementById("mySidenav");
	let workspace = document.getElementById("workspacediv");
	if (mouseButton == LEFT) { // place component
		if (mouseX > 0 && mouseY > 0 && mouseX < workspace.clientWidth - sideNav.clientWidth) { // sideNav doesnt change workspacediv size
			// snap to grid code
			let x = mouseX - grid.getOrigin().x;
			let y = mouseY - grid.getOrigin().y;
			xdiff = x % grid.getGridSize();
			ydiff = y % grid.getGridSize();
			if (xdiff <= grid.getGridSize() / 2)
				x -= xdiff;
			else
				x += grid.getGridSize() - xdiff;

			if (ydiff <= grid.getGridSize() / 2)
				y -= ydiff;
			else
				y += grid.getGridSize() - ydiff;

			// place component
			switch(component) {
				case NOT_GATE:
					gate = new NotGate(x, y);
					gateList.push(gate);
					componentList.push(gate);
					break;
				case AND_GATE:
					gate = new AndGate(x, y);
					gateList.push(gate);
					componentList.push(gate);
					break;
				case OR_GATE:
					gate = new OrGate(x, y);
					gateList.push(gate);
					componentList.push(gate);
					break;
				case XOR_GATE:
					gate = new XorGate(x, y);
					gateList.push(gate);
					componentList.push(gate);
					break;
				case NAND_GATE:
					gate = new NandGate(x, y);
					gateList.push(gate);
					componentList.push(gate);
					break;
				case NOR_GATE:
					gate = new NorGate(x, y);
					gateList.push(gate);
					componentList.push(gate);
					break;
				case XNOR_GATE:
					gate = new XnorGate(x, y);
					gateList.push(gate);
					componentList.push(gate);
					break;
				default:
					break;
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

