var Node = function(x, y, direction) {
	this.x = origin.x + x;
	this.y = origin.x + y;
	this.direction = direction;
	this.state = false; // might have a state to communicate with wires
}
Node.prototype.getHitBoxVerts = function() {
	let topLeft = new Point(this.x - 0.25*grid.getGridSize(), this.y - 0.25*grid.getGridSize());
	let bottomRight = new Point(this.x + 0.25*grid.getGridSize(), this.y + 0.25*grid.getGridSize());
	return [topLeft, bottomRight];
}
Node.prototype.isOverNode = function(x, y) {
	let hitBoxVerts = this.getHitBoxVerts();
	return (x > hitBoxVerts[0].x && y > hitBoxVerts[0].y) && (x < hitBoxVerts[1].x && y < hitBoxVerts[1].y);
}