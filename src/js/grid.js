var mousePt = null;
var origin = null;

function Grid() {

	origin = new Point(0,0);
	mousePt = new Point(0,0);
	this.gridSize = 20;

	this.draw = function() {
		stroke(180);
		let offsetx = origin.x;
		let offsety = origin.y;
		while (offsetx < canvas.width) {
			line(offsetx, 0, offsetx, canvas.height);
			offsetx += this.gridSize;
		}
		while (offsetx > 0) {
			line(offsetx, 0, offsetx, canvas.height);
			offsetx -= this.gridSize;
		}
		while (offsety < canvas.height) {
			line(0, offsety, canvas.width, offsety);
			offsety += this.gridSize;
		}
		while (offsety > 0) {
			line(0, offsety, canvas.width, offsety);
			offsety -= this.gridSize;
		}
	}
}

function mousePressed() {
	mousePt.setPoint(mouseX, mouseY);
}

function mouseDragged() {
	if (mouseButton == CENTER) {
		let dx = mouseX - mousePt.x;
		let dy = mouseY - mousePt.y;
		origin.setPoint(origin.x + dx, origin.y + dy);
		mousePt.setPoint(mouseX, mouseY);
	}
}