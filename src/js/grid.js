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
function mousePressed() {
	if (mouseButton == CENTER) {
		mousePt.setPoint(mouseX, mouseY);
	}
	if (mouseButton == LEFT) {
		if (!panSelected) {
			for (i = 0; i < componentList.length; i++) { // select component
				COMPONENT_SELECTED = componentList[i].isSelected(mouseX, mouseY);
				if (COMPONENT_SELECTED) {
					selectedComponent = componentList[i];
					console.log("selected!");
					if (selectedComponent instanceof IO) {
						if (selectedComponent.isStateSelected(mouseX, mouseY)) selectedComponent.state = !selectedComponent.state;
					}
					break;
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
}

function mouseDragged() {
	if (mouseButton == CENTER) {
		panScreen(mouseX, mouseY);
	}
	if (mouseButton == LEFT) {
		if (!panSelected) {
			if (COMPONENT_SELECTED) { // drag selected component
				hitBoxVerts = selectedComponent.getHitBoxVerts();

				let snappedXY = snapToGrid(
					mouseX - (hitBoxVerts[1].x - hitBoxVerts[0].x)/5 - grid.getOrigin().x,
					mouseY - (componentHeight = hitBoxVerts[1].y - hitBoxVerts[0].y)/2 - grid.getOrigin().y
				);

				selectedComponent.setXY(snappedXY[0], snappedXY[1]);
			}
		} else {
			panScreen(mouseX, mouseY);
		}
	}
}

function mouseReleased() {
	document.getElementById("workspacediv").style.cursor="auto";
	selectedComponent = null; // after we're done dragging, nothing is selected
	wasDragged = false;
}