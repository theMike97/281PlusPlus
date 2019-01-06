function setup() {
	let canvasdiv = document.getElementById("workspacediv");
	let canvasWidth = canvasdiv.clientWidth;
	let canvasHeight = canvasdiv.clientHeight;

	canvas = createCanvas(canvasWidth, canvasHeight);
	canvas.parent("workspacediv");
	grid = new Grid();
	counter = new ClockCounter();

	// noLoop();
	textFont("courier new");
	textAlign(CENTER, CENTER);

	// let str = "2 8 1 + +;and 260 100;input 140 80;led 440 120;clk 100 180 1000;wire 200 100 240 120;wire 360 140 440 140;wire 200 220 240 160";
	if (typeof(Storage) != "undefined") {
		let str = localStorage.getItem("string");
		if (str != "") {
			loadString(str);
		}
	} else {
		alert("Cannot load project!");
	}
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

	if (selectionBox != null) {
		let c = color("#0092DB");
		c._array[3] = 0.2;
		fill(c);
		noStroke();
		rect(selectionBox[0], selectionBox[1], selectionBox[2], selectionBox[3]);
	}

	grid.drawGrid();

	// draw sample and gate for use later.
	// let x = 200;
	// let y = 300;
	stroke(0);

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

	// // tri state buffer
	// // body
	// line(origin.x + x, origin.y + y, origin.x + 2*grid.getGridSize() + x, origin.y + grid.getGridSize() + y);
	// line(origin.x + x, origin.y + 2*grid.getGridSize()+ y, origin.x + 2*grid.getGridSize() + x, origin.y + grid.getGridSize() + y);
	// line(origin.x + x, origin.y + 2* grid.getGridSize() + y, origin.x + x, origin.y + y);
	// line(origin.x + x + grid.getGridSize(), origin.y + y + 0.5*grid.getGridSize(), origin.x + x + grid.getGridSize(), origin.y + y);
	// // nodes
	// line(origin.x + x, origin.y + y + grid.getGridSize(), origin.x + x - grid.getGridSize(), origin.y + y + grid.getGridSize());
	// line(origin.x + x + 2*grid.getGridSize(), origin.y + y + grid.getGridSize(), origin.x + x + 3*grid.getGridSize(), origin.y + y + grid.getGridSize());

	let component = null;
	let compDims = null;
	let wire = null;

	for (i = 0; i < componentList.length; i++) {

		component = componentList[i];
		compDims = component.getDrawingDimens();
		if (component instanceof NotGate) {
			// not gate body
			line(compDims[0][0], compDims[0][1], compDims[0][2], compDims[0][3]);
			line(compDims[1][0], compDims[1][1], compDims[1][2], compDims[1][3]);
			line(compDims[2][0], compDims[2][1], compDims[2][2], compDims[2][3]);
			ellipse(compDims[3][0], compDims[3][1], compDims[3][2], compDims[3][3]);
			line(compDims[4][0], compDims[4][1], compDims[4][2], compDims[4][3]);
			line(compDims[5][0], compDims[5][1], compDims[5][2], compDims[5][3]);

		} else if (component instanceof AndGate) {
			// and gate body
			line(compDims[0][0], compDims[0][1], compDims[0][2], compDims[0][3]);
			line(compDims[1][0], compDims[1][1], compDims[1][2], compDims[1][3]);
			line(compDims[2][0], compDims[2][1], compDims[2][2], compDims[2][3]);
			arc(compDims[3][0], compDims[3][1], compDims[3][2], compDims[3][3], compDims[3][4], compDims[3][5]);
			// i/o nodes
			line(compDims[4][0], compDims[4][1], compDims[4][2], compDims[4][3]);
			line(compDims[5][0], compDims[5][1], compDims[5][2], compDims[5][3]);
			line(compDims[6][0], compDims[6][1], compDims[6][2], compDims[6][3]);

			// console.log(component.state);

		} else if (component instanceof OrGate) {
			// or gate body
			bezier(compDims[0][0], compDims[0][1], compDims[0][2], compDims[0][3], compDims[0][4], compDims[0][5], compDims[0][6], compDims[0][7]);
			line(compDims[1][0], compDims[1][1], compDims[1][2], compDims[1][3]);
			line(compDims[2][0], compDims[2][1], compDims[2][2], compDims[2][3]);
			bezier(compDims[3][0], compDims[3][1], compDims[3][2], compDims[3][3], compDims[3][4], compDims[3][5], compDims[3][6], compDims[3][7]);
			bezier(compDims[4][0], compDims[4][1], compDims[4][2], compDims[4][3], compDims[4][4], compDims[4][5], compDims[4][6], compDims[4][7]);
			// i/o nodes
			line(compDims[5][0], compDims[5][1], compDims[5][2], compDims[5][3]);
			line(compDims[6][0], compDims[6][1], compDims[6][2], compDims[6][3]);
			line(compDims[7][0], compDims[7][1], compDims[7][2], compDims[7][3]);

		} else if (component instanceof XorGate) {
			// xor gate body
			bezier(compDims[0][0], compDims[0][1], compDims[0][2], compDims[0][3], compDims[0][4], compDims[0][5], compDims[0][6], compDims[0][7]);
			bezier(compDims[1][0], compDims[1][1], compDims[1][2], compDims[1][3], compDims[1][4], compDims[1][5], compDims[1][6], compDims[1][7]);
			line(compDims[2][0], compDims[2][1], compDims[2][2], compDims[2][3]);
			line(compDims[3][0], compDims[3][1], compDims[3][2], compDims[3][3]);
			bezier(compDims[4][0], compDims[4][1], compDims[4][2], compDims[4][3], compDims[4][4], compDims[4][5], compDims[4][6], compDims[4][7]);
			bezier(compDims[5][0], compDims[5][1], compDims[5][2], compDims[5][3], compDims[5][4], compDims[5][5], compDims[5][6], compDims[5][7]);
			// i/o nodes
			line(compDims[6][0], compDims[6][1], compDims[6][2], compDims[6][3]);
			line(compDims[7][0], compDims[7][1], compDims[7][2], compDims[7][3]);
			line(compDims[8][0], compDims[8][1], compDims[8][2], compDims[8][3]);

		} else if (component instanceof NandGate) {
			// nand gate body
			line(compDims[0][0], compDims[0][1], compDims[0][2], compDims[0][3]);
			line(compDims[1][0], compDims[1][1], compDims[1][2], compDims[1][3]);
			line(compDims[2][0], compDims[2][1], compDims[2][2], compDims[2][3]);
			arc(compDims[3][0], compDims[3][1], compDims[3][2], compDims[3][3], compDims[3][4], compDims[3][5]);
			ellipse(compDims[4][0], compDims[4][1], compDims[4][2], compDims[4][3]);
			// i/o nodes
			line(compDims[5][0], compDims[5][1], compDims[5][2], compDims[5][3]);
			line(compDims[6][0], compDims[6][1], compDims[6][2], compDims[6][3]);
			line(compDims[7][0], compDims[7][1], compDims[7][2], compDims[7][3]);

		} else if (component instanceof NorGate) {
			// nor gate body
			bezier(compDims[0][0], compDims[0][1], compDims[0][2], compDims[0][3], compDims[0][4], compDims[0][5], compDims[0][6], compDims[0][7]);
			line(compDims[1][0], compDims[1][1], compDims[1][2], compDims[1][3]);
			line(compDims[2][0], compDims[2][1], compDims[2][2], compDims[2][3]);
			bezier(compDims[3][0], compDims[3][1], compDims[3][2], compDims[3][3], compDims[3][4], compDims[3][5], compDims[3][6], compDims[3][7]);
			bezier(compDims[4][0], compDims[4][1], compDims[4][2], compDims[4][3], compDims[4][4], compDims[4][5], compDims[4][6], compDims[4][7]);
			ellipse(compDims[5][0], compDims[5][1], compDims[5][2], compDims[5][3]);
			// i/o nodes
			line(compDims[6][0], compDims[6][1], compDims[6][2], compDims[6][3]);
			line(compDims[7][0], compDims[7][1], compDims[7][2], compDims[7][3]);
			line(compDims[8][0], compDims[8][1], compDims[8][2], compDims[8][3]);

		} else if (component instanceof XnorGate) {
			// xnor gate body
			bezier(compDims[0][0], compDims[0][1], compDims[0][2], compDims[0][3], compDims[0][4], compDims[0][5], compDims[0][6], compDims[0][7]);
			bezier(compDims[1][0], compDims[1][1], compDims[1][2], compDims[1][3], compDims[1][4], compDims[1][5], compDims[1][6], compDims[1][7]);
			line(compDims[2][0], compDims[2][1], compDims[2][2], compDims[2][3]);
			line(compDims[3][0], compDims[3][1], compDims[3][2], compDims[3][3]);
			bezier(compDims[4][0], compDims[4][1], compDims[4][2], compDims[4][3], compDims[4][4], compDims[4][5], compDims[4][6], compDims[4][7]);
			bezier(compDims[5][0], compDims[5][1], compDims[5][2], compDims[5][3], compDims[5][4], compDims[5][5], compDims[5][6], compDims[5][7]);
			ellipse(compDims[6][0], compDims[6][1], compDims[6][2], compDims[6][3]);
			// i/o nodes
			line(compDims[7][0], compDims[7][1], compDims[7][2], compDims[7][3]);
			line(compDims[8][0], compDims[8][1], compDims[8][2], compDims[8][3]);
			line(compDims[9][0], compDims[9][1], compDims[9][2], compDims[9][3]);

		} else if (component instanceof Input) {
			// Input Body
			line(compDims[0][0], compDims[0][1], compDims[0][2], compDims[0][3]);
			line(compDims[1][0], compDims[1][1], compDims[1][2], compDims[1][3]);
			line(compDims[2][0], compDims[2][1], compDims[2][2], compDims[2][3]);
			line(compDims[3][0], compDims[3][1], compDims[3][2], compDims[3][3]);
			line(compDims[4][0], compDims[4][1], compDims[4][2], compDims[4][3]);
			// State indicator
			state = compDims[5];
			// console.log(state);
			if (!state) {
				fill(0);
			} else {
				fill(0, 255, 0);
			}
			ellipse(compDims[6][0], compDims[6][1], compDims[6][2], compDims[6][3]);
			noFill();
			// console.log(component);
		} else if (component instanceof Led) {
			line(compDims[0][0], compDims[0][1], compDims[0][2], compDims[0][3]);
			line(compDims[1][0], compDims[1][1], compDims[1][2], compDims[1][3]);
			line(compDims[2][0], compDims[2][1], compDims[2][2], compDims[2][3]);
			line(compDims[3][0], compDims[3][1], compDims[3][2], compDims[3][3]);
			line(compDims[4][0], compDims[4][1], compDims[4][2], compDims[4][3]);
			// state indicator
			state = compDims[5];
			if (!state) {
				fill(0);
			} else {
				fill(0, 255, 0);
			}
			ellipse(compDims[6][0], compDims[6][1], compDims[6][2], compDims[6][3]);
			noFill();
		} else if (component instanceof SevenSeg) {
			// body
			line(compDims[0][0], compDims[0][1], compDims[0][2], compDims[0][3]);
			line(compDims[1][0], compDims[1][1], compDims[1][2], compDims[1][3]);
			line(compDims[2][0], compDims[2][1], compDims[2][2], compDims[2][3]);
			line(compDims[3][0], compDims[3][1], compDims[3][2], compDims[3][3]);
			// text
			fill(255,0,0);
			stroke(255,255,255);
			textFont("segment7");
			textSize(6*grid.getGridSize());
			text(compDims[4][0], compDims[4][1], compDims[4][2]);
			noFill();
			stroke(0);
			textFont("courier");
			// nodes
			line(compDims[5][0], compDims[5][1], compDims[5][2], compDims[5][3]);
			line(compDims[6][0], compDims[6][1], compDims[6][2], compDims[6][3]);
			line(compDims[7][0], compDims[7][1], compDims[7][2], compDims[7][3]);
			line(compDims[8][0], compDims[8][1], compDims[8][2], compDims[8][3]);
		} else if (component instanceof Vcc) {
			// body
			line(compDims[0][0], compDims[0][1], compDims[0][2], compDims[0][3]);
			line(compDims[1][0], compDims[1][1], compDims[1][2], compDims[1][3]);
			line(compDims[2][0], compDims[2][1], compDims[2][2], compDims[2][3]);
			// node
			line(compDims[3][0], compDims[3][1], compDims[3][2], compDims[3][3]);
		} else if (component instanceof Gnd) {
			// body
			line(compDims[0][0], compDims[0][1], compDims[0][2], compDims[0][3]);
			line(compDims[1][0], compDims[1][1], compDims[1][2], compDims[1][3]);
			line(compDims[2][0], compDims[2][1], compDims[2][2], compDims[2][3]);
			// node
			line(compDims[3][0], compDims[3][1], compDims[3][2], compDims[3][3]);
		} else if (component instanceof Clock) {
			// body
			line(compDims[0][0], compDims[0][1], compDims[0][2], compDims[0][3]);
			line(compDims[1][0], compDims[1][1], compDims[1][2], compDims[1][3]);
			line(compDims[2][0], compDims[2][1], compDims[2][2], compDims[2][3]);
			line(compDims[3][0], compDims[3][1], compDims[3][2], compDims[3][3]);
			// inner design
			line(compDims[4][0], compDims[4][1], compDims[4][2], compDims[4][3]);
			line(compDims[5][0], compDims[5][1], compDims[5][2], compDims[5][3]);
			line(compDims[6][0], compDims[6][1], compDims[6][2], compDims[6][3]);
			textSize(0.75*grid.getGridSize());
			text(compDims[7][0], compDims[7][1], compDims[7][2]);
			// node
			line(compDims[8][0], compDims[8][1], compDims[8][2], compDims[8][3]);
		} else if (component instanceof SBuffer) {
			// body
			line(compDims[0][0], compDims[0][1], compDims[0][2], compDims[0][3]);
			line(compDims[1][0], compDims[1][1], compDims[1][2], compDims[1][3]);
			line(compDims[2][0], compDims[2][1], compDims[2][2], compDims[2][3]);
			// nodes
			line(compDims[3][0], compDims[3][1], compDims[3][2], compDims[3][3]);
			line(compDims[4][0], compDims[4][1], compDims[4][2], compDims[4][3]);
		}

		component.updateNodes();
		component.updateOutput();
		let nodes = component.getNodes();
		// console.log(component);
		for (let j = 0; j < nodes.length; j++) {
			if (nodes[j].isOverNode(mouseX, mouseY)) {
				strokeWeight(1);
				// console.log("node hovering");
				rect(nodes[j].x - 0.25*grid.getGridSize(), nodes[j].y - 0.25*grid.getGridSize(), 0.5*grid.getGridSize(), 0.5*grid.getGridSize());
				strokeWeight(2);
			}
		}
	}
	// draw wires after component nodes are updated.
	for (i = 0; i < wires.length; i++) {
		wire = wires[i];
		compDims = wire.getDrawingDimens();

		if (wire.state) {
			stroke(0,255,0);
		}
		line(compDims[0][0], compDims[0][1], compDims[0][2], compDims[0][3]);
		stroke(0);

		wire.updateState();
		// console.log(wire.state);
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
    			offsetX = componentList[i].x / grid.getGridSize();
    			offsetY = componentList[i].y / grid.getGridSize();
    			componentList[i].changeXY(delta * offsetX, delta * offsetY);
    		}
    		grid.changeGridSize(delta);
    	}
    	if (delta > 0) {
    		let i;
    		let newX = 0;
    		let newY = 0;
    		for (i = 0; i < componentList.length; i++) {
    			offsetX = componentList[i].x / grid.getGridSize();
    			offsetY = componentList[i].y / grid.getGridSize();
    			componentList[i].changeXY(delta * offsetX, delta * offsetY);
    		}
    		grid.changeGridSize(delta);
    	}
    	return false;
	}
}

snapToGrid = function(x, y) {
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

	return [x,y];
}

function mouseClicked() {
	let gate;
	let sideNav = document.getElementById("mySidenav");
	let workspace = document.getElementById("workspacediv");
	if (mouseButton == LEFT) { // place component
		console.log(COMPONENT_SELECTED);
		if (!COMPONENT_SELECTED && !NODE_SELECTED) { // dont place component if mouse is inside hitbox of another component
			if (mouseX > 0 && mouseY > 0 && mouseX < workspace.clientWidth - sideNav.clientWidth) { // sideNav doesnt change workspacediv size
				// snap to grid code
				let snappedXY = snapToGrid(mouseX - grid.getOrigin().x, mouseY - grid.getOrigin().y);
				let x = snappedXY[0];
				let y = snappedXY[1];

				// place component
				switch(COMPONENT) {
					case NOT_GATE:
						gate = new NotGate(x, y);
						componentList.push(gate);
						break;
					case AND_GATE:
						gate = new AndGate(x, y);
						componentList.push(gate);
						break;
					case OR_GATE:
						gate = new OrGate(x, y);
						componentList.push(gate);
						break;
					case XOR_GATE:
						gate = new XorGate(x, y);
						componentList.push(gate);
						break;
					case NAND_GATE:
						gate = new NandGate(x, y);
						componentList.push(gate);
						break;
					case NOR_GATE:
						gate = new NorGate(x, y);
						componentList.push(gate);
						break;
					case XNOR_GATE:
						gate = new XnorGate(x, y);
						componentList.push(gate);
						break;
					case INPUT_IO:
						gate = new Input(x, y);
						componentList.push(gate);
						break;
					case LED_IO:
						gate = new Led(x, y);
						componentList.push(gate);
						break;
					case SEG_7_IO:
						gate = new SevenSeg(x, y);
						componentList.push(gate);
						break;
					case VCC_IO:
						gate = new Vcc(x, y);
						componentList.push(gate);
						break;
					case GND_IO:
						gate = new Gnd(x, y);
						componentList.push(gate);
						break;
					case CLOCK_IO:
						gate = new Clock(x, y);
						componentList.push(gate);
						break;
					case BUFF_CONN:
						gate = new SBuffer(x, y);
						componentList.push(gate);
						break;
					default:
						break;
				}
				// redraw();
			}
		}
	}
}

function windowResized() {
	resizeCanvas(document.getElementById("workspacediv").clientWidth, document.getElementById("workspacediv").clientHeight);
	// redraw();
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

function ClockCounter() {
	this.lastTime = 0;

	this.checkTime = function(time, timer) {
		timeDiff = time - this.lastTime;
		if (timeDiff >= timer - 9.91) {
			this.lastTime = time;
			this.timeDiffSum += timeDiff;
			this.averageCounter++;
			return true;
		}
	}
	return false;
}
