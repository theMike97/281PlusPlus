var origin = null;
var mousePt = null;
var gridSize = 20;

function Grid() {

	origin = new Point(0,0);
	mousePt = new Point(0,0);

	this.show = function() {
		stroke(175);
		let offsetx = origin.x;
		let offsety = origin.y;
		while (offsetx < canvasWidth) {
			line(offsetx, 0, offsetx, canvasHeight);
			offsetx += gridSize;
		}
		while (offsetx > 0) {
			line(offsetx, 0, offsetx, canvasHeight);
			offsetx -= gridSize;
		}
		while (offsety < canvasHeight) {
			line(0, offsety, canvasWidth, offsety);
			offsety += gridSize;
		}
		while (offsety > 0) {
			line(0, offsety, canvasWidth, offsety);
			offsety -= gridSize;
		}
	}
}

function mousePressed() {
	mousePt.setPoint(mouseX, mouseY);
}

function mouseDragged() {
	let dx = mouseX - mousePt.x;
	let dy = mouseY - mousePt.y;
	origin.setPoint(origin.x + dx, origin.y + dy);
	mousePt.setPoint(mouseX, mouseY);
}