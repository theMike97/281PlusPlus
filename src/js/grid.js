function Grid() {

	origin = new Point(0,0);
	mousePt = new Point(0,0);
	this.gridSize = 20;

	this.drawGrid = function() {
		strokeWeight(1);
		stroke(180);
		let offsetx = origin.x;
		let offsety = origin.y;
		let adjustedGridSize = this.gridSize;
		if (this.gridSize < 10) adjustedGridSize = this.gridSize*2;

		while (offsetx < canvas.width) {
			line(offsetx, 0, offsetx, canvas.height);
			offsetx += adjustedGridSize;
		}
		while (offsetx > 0) {
			line(offsetx, 0, offsetx, canvas.height);
			offsetx -= adjustedGridSize;
		}
		while (offsety < canvas.height) {
			line(0, offsety, canvas.width, offsety);
			offsety += adjustedGridSize;
		}
		while (offsety > 0) {
			line(0, offsety, canvas.width, offsety);
			offsety -= adjustedGridSize;
		}
	}

	this.getOrigin = function() {
		return origin;
	}

	this.getMousePt = function() {
		return mousePt;
	}

	this.changeGridSize = function(offset) {
		this.gridSize += offset;
	}

	this.changeOrigin = function(offset) {
		origin.x += offset;
		origin.y += offset;
	}

	this.getGridSize = function() {
		return this.gridSize;
	}
}

// i want a mouse clicked for placing components onto the workspace
var selectedComponent = null;
let selectedNode = null;
let currentWire = null;
let dummyNode = null;
let mouseXOffset = 0;
let mouseYOffset = 0;

function mousePressed() {
	NODE_SELECTED = false;
	if (mouseButton == CENTER) {
		mousePt.setPoint(mouseX, mouseY);
	}
	if (mouseButton == LEFT) {
		if (!panSelected) {
			for (i = 0; i < componentList.length; i++) { // select component
				for (let j=0; j < componentList[i].nodes.length; j++) {
					if (componentList[i].nodes[j].isOverNode(mouseX, mouseY)) {
						NODE_SELECTED = true;
						dummyNode = new Node(mouseX, mouseY);
						selectedNode = componentList[i].nodes[j];
						currentWire = new Wire(selectedNode, dummyNode); // create wire 0 dimension wire
						currentWire.nodeA = selectedNode;
						wires.push(currentWire);
					}
				}
				COMPONENT_SELECTED = componentList[i].isSelected(mouseX, mouseY);
				if (COMPONENT_SELECTED && !NODE_SELECTED) {
					selectedComponent = componentList[i];
					let hitbox = selectedComponent.getHitBoxVerts();
					selectionBox = [hitbox[0].x, hitbox[0].y, hitbox[1].x - hitbox[0].x, hitbox[1].y - hitbox[0].y];
					// console.log("selected!");
					mouseXOffset = mouseX - (selectedComponent.x);
					mouseYOffset = mouseY - (selectedComponent.y);
					if (selectedComponent instanceof Input) {
						if (selectedComponent.isStateSelected(mouseX, mouseY)) selectedComponent.state = !selectedComponent.state;
					}
					break;
				}
				if (!COMPONENT_SELECTED && !NODE_SELECTED) {
					selectionBox = null;
					selectedComponent = null;
				}
			}
		} else {
			mousePt.setPoint(mouseX, mouseY);
		}
	}
}

panScreen = function(mx, my) {
	document.getElementById("workspacediv").style.cursor="grabbing";
	let dx = mx - mousePt.x;
	let dy = my - mousePt.y;
	origin.setPoint(origin.x + dx, origin.y + dy);
	mousePt.setPoint(mx, my);
	// redraw();
}

function mouseDragged() {
	if (mouseButton == CENTER) {
		panScreen(mouseX, mouseY);
	}
	if (mouseButton == LEFT) {
		if (!panSelected) {
			if (COMPONENT_SELECTED && !NODE_SELECTED) { // drag selected component
				hitBoxVerts = selectedComponent.getHitBoxVerts();

				let snappedXY = snapToGrid(
					// mouseX - (hitBoxVerts[1].x - hitBoxVerts[0].x)/5 - grid.getOrigin().x,
					// mouseY - (componentHeight = hitBoxVerts[1].y - hitBoxVerts[0].y)/2 - grid.getOrigin().y
					mouseX - mouseXOffset,
					mouseY - mouseYOffset
				);

				console.log(mouseX - mouseXOffset);
				console.log(mouseY - mouseYOffset);

				selectedComponent.setXY(snappedXY[0], snappedXY[1]);
				selectionBox = [hitBoxVerts[0].x, hitBoxVerts[0].y, hitBoxVerts[1].x - hitBoxVerts[0].x, hitBoxVerts[1].y - hitBoxVerts[0].y];
			} else if (NODE_SELECTED) {
				selectedNode = null;
				currentWire.nodeB.x = mouseX;
				currentWire.nodeB.y = mouseY;
			}
			// redraw();
		} else {
			panScreen(mouseX, mouseY);
			let hitbox = selectedComponent.getHitBoxVerts();
			selectionBox = [hitbox[0].x, hitbox[0].y, hitbox[1].x - hitbox[0].x, hitbox[1].y - hitbox[0].y];
		}
	}
}

function mouseReleased() {
	document.getElementById("workspacediv").style.cursor="auto";
	if (selectedComponent != null) {
		let hitbox = selectedComponent.getHitBoxVerts();
		selectionBox = [hitbox[0].x, hitbox[0].y, hitbox[1].x - hitbox[0].x, hitbox[1].y - hitbox[0].y];
	}
	for (i = 0; i < componentList.length; i++) {
		for (let j=0; j < componentList[i].nodes.length; j++) {
			if (componentList[i].nodes[j].isOverNode(mouseX, mouseY)) {
				selectedNode = componentList[i].nodes[j];
				NODE_SELECTED = true;
			}
		}
	}
	if (NODE_SELECTED) {
		if (selectedNode != null) {
			currentWire.nodeB = selectedNode;
			console.log(selectedNode);
		} else {
			wires.pop();
		}
	}
}
