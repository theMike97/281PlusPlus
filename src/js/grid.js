var mousePt = null;
var origin = null;

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
function mousePressed() {
	if (mouseButton == CENTER) {
		mousePt.setPoint(mouseX, mouseY);
	}
}

function mouseDragged() {
	if (mouseButton == CENTER) {
		document.getElementById("workspacediv").style.cursor="grabbing";
		let dx = mouseX - mousePt.x;
		let dy = mouseY - mousePt.y;
		origin.setPoint(origin.x + dx, origin.y + dy);
		mousePt.setPoint(mouseX, mouseY);
	}
}

function mouseReleased() {
	if (mouseButton == CENTER) document.getElementById("workspacediv").style.cursor="auto";
}