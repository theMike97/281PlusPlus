inherits = function(ctor, superCtor) {
	ctor.super_ = superCtor;
	ctor.prototype = Object.create(superCtor.prototype, {
		constructor: {
			value: ctor,
			enumerable: false,
			writable: true,
			configurable: true
		}
	});
};
// base component (always has a position)
var Component = function(x, y) {
	this.nodes = [];
	this.x = x;
	this.y = y;
}
Component.prototype.setXY = function(x, y) {
	this.x = x;
	this.y = y;
}
Component.prototype.changeXY = function(offsetx, offsety) {
	this.x += offsetx;
	this.y += offsety;
}
Component.prototype.getXY = function() {
	return new Point(this.x, this.y);
}
Component.prototype.getNodes = function() {
	return this.nodes;
}
// Component.prototype.isSelected = function(x, y) { // looks at mouse x/y to determine if mouse is hovering
// 	let isSelected = false;
// 	for (i = 0; i < componentList.length; i++) {

// 	}
// 	return isSelected;
// }

/*
 * gates here
 */
// base gate (always has (at most) 2 inputs)
var Gate = function(x, y) {
	Gate.super_.call(this, x, y);

	// this.nodeA = null;
	// this.nodeB = null;
	// this.out = null;
}
inherits(Gate, Component);
// Gate.prototype.setInputNodes = function(nodeA, nodeB) {
	
// 	this.nodeA = nodeA;
// 	this.nodeB = nodeB;
// }

// Not Gate
var NotGate = function(x, y) {
	NotGate.super_.call(this, x, y);
}
inherits(NotGate, Gate);
NotGate.prototype.getOutput = function() {
	return !this.nodeA;
}
NotGate.prototype.getHitBoxVerts = function() { //returns point at top left and bottom right
	topLeft = new Point(grid.getOrigin().x + this.x - grid.getGridSize(), grid.getOrigin().y + this.y);
	bottomRight = new Point(grid.getOrigin().x + this.x + 3*grid.getGridSize(), grid.getOrigin().y + this.y + 2*grid.getGridSize());
	return [topLeft, bottomRight];
}
NotGate.prototype.isSelected = function(x, y) {
	let hitBoxVerts = this.getHitBoxVerts();
	return (x > hitBoxVerts[0].x && y > hitBoxVerts[0].y) && (x < hitBoxVerts[1].x && y < hitBoxVerts[1].y);
}
NotGate.prototype.getDrawingDimens = function() {
	let dimens = [
	[grid.getOrigin().x + this.x, grid.getOrigin().y + this.y, grid.getOrigin().x + 2*grid.getGridSize() + this.x, grid.getOrigin().y + grid.getGridSize() + this.y],
	[grid.getOrigin().x + this.x, grid.getOrigin().y + 2*grid.getGridSize()+ this.y, grid.getOrigin().x + 2*grid.getGridSize() + this.x, grid.getOrigin().y + grid.getGridSize() + this.y],
	[grid.getOrigin().x + this.x, grid.getOrigin().y + 2* grid.getGridSize() + this.y, grid.getOrigin().x + this.x, grid.getOrigin().y + this.y],
	[grid.getOrigin().x + 2.25*grid.getGridSize() + this.x, grid.getOrigin().y + grid.getGridSize() + this.y, 0.5*grid.getGridSize(),0.5*grid.getGridSize()],
	[grid.getOrigin().x + this.x, grid.getOrigin().y + grid.getGridSize() + this.y, grid.getOrigin().x - grid.getGridSize() + this.x, grid.getOrigin().y + grid.getGridSize() + this.y],
	[grid.getOrigin().x + 2.5*grid.getGridSize() + this.x, grid.getOrigin().y + grid.getGridSize() + this.y, grid.getOrigin().x + 3*grid.getGridSize() + this.x, grid.getOrigin().y + grid.getGridSize() + this.y]
	];
	return dimens;
}

// And Gate
var AndGate = function(x, y) {
	AndGate.super_.call(this, x, y);

	this.nodes.push(new Node(grid.getOrigin().x - grid.getGridSize() + this.x, grid.getOrigin().y + grid.getGridSize() + this.y));
	this.nodes.push(new Node(grid.getOrigin().x - grid.getGridSize() + this.x, grid.getOrigin().y + 3*grid.getGridSize() + this.y));
	this.nodes.push(new Node(grid.getOrigin().x + 5*grid.getGridSize() + this.x, grid.getOrigin().y + 2*grid.getGridSize() + this.y)); // last is always output node
}
inherits(AndGate, Gate);
AndGate.prototype.getOutput = function() {
	return this.nodeA && this.nodeB;
}
AndGate.prototype.getHitBoxVerts = function() {
	topLeft = new Point(grid.getOrigin().x + this.x - grid.getGridSize(), grid.getOrigin().y + this.y);
	bottomRight = new Point(grid.getOrigin().x + this.x + 5*grid.getGridSize(), grid.getOrigin().y + this.y + 4*grid.getGridSize());
	return [topLeft, bottomRight];
}
AndGate.prototype.isSelected = function(x, y) {
	let hitBoxVerts = this.getHitBoxVerts();
	return (x > hitBoxVerts[0].x && y > hitBoxVerts[0].y) && (x < hitBoxVerts[1].x && y < hitBoxVerts[1].y);
}
AndGate.prototype.getDrawingDimens = function() {
	let dimens = [
		[grid.getOrigin().x + this.x, grid.getOrigin().y + this.y, grid.getOrigin().x + this.x, grid.getOrigin().y + 4 * grid.getGridSize() + this.y], // first line
		[grid.getOrigin().x + this.x, grid.getOrigin().y + this.y, grid.getOrigin().x + 2*grid.getGridSize() + this.x, grid.getOrigin().y + this.y], // second line
		[grid.getOrigin().x + this.x, grid.getOrigin().y + 4*grid.getGridSize() + this.y, grid.getOrigin().x + 2*grid.getGridSize() + this.x, grid.getOrigin().y + 4*grid.getGridSize() + this.y], // third line
		[grid.getOrigin().x + 2*grid.getGridSize() + this.x, grid.getOrigin().y + 2*grid.getGridSize() + this.y, 4*grid.getGridSize(), 4*grid.getGridSize(), -HALF_PI, HALF_PI], // arc
		[grid.getOrigin().x + this.x, grid.getOrigin().y + grid.getGridSize() + this.y, grid.getOrigin().x - grid.getGridSize() + this.x, grid.getOrigin().y + grid.getGridSize() + this.y], // nodeA
		[grid.getOrigin().x + this.x, grid.getOrigin().y +3*grid.getGridSize() + this.y, grid.getOrigin().x - grid.getGridSize() + this.x, grid.getOrigin().y + 3*grid.getGridSize() + this.y], // nodeB
		[grid.getOrigin().x + 4*grid.getGridSize() + this.x, grid.getOrigin().y + 2*grid.getGridSize() + this.y, grid.getOrigin().x + 5*grid.getGridSize() + this.x, grid.getOrigin().y + 2*grid.getGridSize() + this.y] // out
	];

	return dimens;
}
AndGate.prototype.updateNodes = function() {
	this.nodes[0].x = origin.x - grid.getGridSize() + this.x;
	this.nodes[0].y = origin.y + grid.getGridSize() + this.y;
	this.nodes[1].x = origin.x - grid.getGridSize() + this.x;
	this.nodes[1].y = origin.y + 3*grid.getGridSize() + this.y;
	this.nodes[2].x = origin.x + 5*grid.getGridSize() + this.x;
	this.nodes[2].y = origin.y + 2*grid.getGridSize() + this.y;
}

// Or Gate
var OrGate = function(x, y) {
	OrGate.super_.call(this, x, y);
}
inherits(OrGate, Gate);
OrGate.prototype.getOutput = function() {
	return this.nodeA || this.nodeB;
}
OrGate.prototype.isSelected = function(x, y) {
	let hitBoxVerts = this.getHitBoxVerts();
	return (x > hitBoxVerts[0].x && y > hitBoxVerts[0].y) && (x < hitBoxVerts[1].x && y < hitBoxVerts[1].y);
}
OrGate.prototype.getHitBoxVerts = function() {
	topLeft = new Point(grid.getOrigin().x + this.x - grid.getGridSize(), grid.getOrigin().y + this.y);
	bottomRight = new Point(grid.getOrigin().x + this.x + 5*grid.getGridSize(), grid.getOrigin().y + this.y + 4*grid.getGridSize());
	return [topLeft, bottomRight];
}
OrGate.prototype.getDrawingDimens = function() {
	let dimens = [
	[grid.getOrigin().x + this.x, grid.getOrigin().y + this.y,
	grid.getOrigin().x + 0.75*grid.getGridSize() + this.x, grid.getOrigin().y + grid.getGridSize() + this.y,
	grid.getOrigin().x + 0.75*grid.getGridSize() + this.x, grid.getOrigin().y + 3*grid.getGridSize() + this.y,
	grid.getOrigin().x + this.x, grid.getOrigin().y + 4*grid.getGridSize() + this.y],
		[grid.getOrigin().x + this.x, grid.getOrigin().y + this.y, grid.getOrigin().x + 1*grid.getGridSize() + this.x, grid.getOrigin().y + this.y], //1-2 LINES
		[grid.getOrigin().x + this.x, grid.getOrigin().y + 4*grid.getGridSize() + this.y, grid.getOrigin().x + 1*grid.getGridSize() + this.x, grid.getOrigin().y + 4*grid.getGridSize() + this.y], //1-2 LINES
		[grid.getOrigin().x + 1*grid.getGridSize() + this.x, grid.getOrigin().y + this.y, // 1-2
		grid.getOrigin().x + 3.8*grid.getGridSize() + this.x, grid.getOrigin().y + this.y, 
		grid.getOrigin().x + 3.8*grid.getGridSize() + this.x, grid.getOrigin().y + 1.8*grid.getGridSize() + this.y, 
		grid.getOrigin().x + 4*grid.getGridSize() + this.x, grid.getOrigin().y + 2*grid.getGridSize() + this.y],
		[grid.getOrigin().x + this.x + 1*grid.getGridSize(), grid.getOrigin().y + this.y + 4*grid.getGridSize(), // 1-2
		grid.getOrigin().x + 3.8*grid.getGridSize() + this.x, grid.getOrigin().y + 4*grid.getGridSize() + this.y, 
		grid.getOrigin().x + 3.8*grid.getGridSize() + this.x, grid.getOrigin().y + 2.2*grid.getGridSize() + this.y, 
		grid.getOrigin().x + 4*grid.getGridSize() + this.x, grid.getOrigin().y + 2*grid.getGridSize() + this.y],
		[grid.getOrigin().x + 0.4*grid.getGridSize() + this.x, grid.getOrigin().y + grid.getGridSize() + this.y, grid.getOrigin().x - grid.getGridSize() + this.x, grid.getOrigin().y + grid.getGridSize() + this.y],
		[grid.getOrigin().x + 0.4*grid.getGridSize() + this.x, grid.getOrigin().y +3*grid.getGridSize() + this.y, grid.getOrigin().x - grid.getGridSize() + this.x, grid.getOrigin().y + 3*grid.getGridSize() + this.y],
		[grid.getOrigin().x + 4*grid.getGridSize() + this.x, grid.getOrigin().y + 2*grid.getGridSize() + this.y, grid.getOrigin().x + 5*grid.getGridSize() + this.x, grid.getOrigin().y + 2*grid.getGridSize() + this.y]
		];
		return dimens;
	}

// Xor Gate
var XorGate = function(x, y) {
	XorGate.super_.call(this, x, y);
}
inherits(XorGate, Gate);
XorGate.prototype.getOutput = function() {
	return this.nodeA ? !this.nodeB : this.nodeB;
}
XorGate.prototype.isSelected = function(x, y) {
	let hitBoxVerts = this.getHitBoxVerts();
	return (x > hitBoxVerts[0].x && y > hitBoxVerts[0].y) && (x < hitBoxVerts[1].x && y < hitBoxVerts[1].y);
}
XorGate.prototype.getHitBoxVerts = function() {
	topLeft = new Point(grid.getOrigin().x + this.x - grid.getGridSize(), grid.getOrigin().y + this.y);
	bottomRight = new Point(grid.getOrigin().x + this.x + 5*grid.getGridSize(), grid.getOrigin().y + this.y + 4*grid.getGridSize());
	return [topLeft, bottomRight];
}
XorGate.prototype.getDrawingDimens = function() {
	let dimens = [
	[grid.getOrigin().x - 0.5*grid.getGridSize() + this.x, grid.getOrigin().y + this.y,
	grid.getOrigin().x + 0.25*grid.getGridSize() + this.x, grid.getOrigin().y + grid.getGridSize() + this.y,
	grid.getOrigin().x + 0.25*grid.getGridSize() + this.x, grid.getOrigin().y + 3*grid.getGridSize() + this.y,
	grid.getOrigin().x + this.x - 0.5*grid.getGridSize(), grid.getOrigin().y + 4*grid.getGridSize() + this.y],
	[grid.getOrigin().x + this.x, grid.getOrigin().y + this.y,
	grid.getOrigin().x + 0.75*grid.getGridSize() + this.x, grid.getOrigin().y + grid.getGridSize() + this.y,
	grid.getOrigin().x + 0.75*grid.getGridSize() + this.x, grid.getOrigin().y + 3*grid.getGridSize() + this.y,
	grid.getOrigin().x + this.x, grid.getOrigin().y + 4*grid.getGridSize() + this.y],
		[grid.getOrigin().x + this.x, grid.getOrigin().y + this.y, grid.getOrigin().x + 1*grid.getGridSize() + this.x, grid.getOrigin().y + this.y], //1-2
		[grid.getOrigin().x + this.x, grid.getOrigin().y + 4*grid.getGridSize() + this.y, grid.getOrigin().x + 1*grid.getGridSize() + this.x, grid.getOrigin().y + 4*grid.getGridSize() + this.y], //1-2
		[grid.getOrigin().x + 1*grid.getGridSize() + this.x, grid.getOrigin().y + this.y, // 1-2
		grid.getOrigin().x + 3.8*grid.getGridSize() + this.x, grid.getOrigin().y + this.y, 
		grid.getOrigin().x + 3.8*grid.getGridSize() + this.x, grid.getOrigin().y + 1.8*grid.getGridSize() + this.y, 
		grid.getOrigin().x + 4*grid.getGridSize() + this.x, grid.getOrigin().y + 2*grid.getGridSize() + this.y],
		[grid.getOrigin().x + this.x + 1*grid.getGridSize(), grid.getOrigin().y + this.y + 4*grid.getGridSize(), // 1-2
		grid.getOrigin().x + 3.8*grid.getGridSize() + this.x, grid.getOrigin().y + 4*grid.getGridSize() + this.y, 
		grid.getOrigin().x + 3.8*grid.getGridSize() + this.x, grid.getOrigin().y + 2.2*grid.getGridSize() + this.y, 
		grid.getOrigin().x + 4*grid.getGridSize() + this.x, grid.getOrigin().y + 2*grid.getGridSize() + this.y],
		[grid.getOrigin().x - 0.1*grid.getGridSize() + this.x, grid.getOrigin().y + grid.getGridSize() + this.y, grid.getOrigin().x - grid.getGridSize() + this.x, grid.getOrigin().y + grid.getGridSize() + this.y],
		[grid.getOrigin().x - 0.1*grid.getGridSize() + this.x, grid.getOrigin().y +3*grid.getGridSize() + this.y, grid.getOrigin().x - grid.getGridSize() + this.x, grid.getOrigin().y + 3*grid.getGridSize() + this.y],
		[grid.getOrigin().x + 4*grid.getGridSize() + this.x, grid.getOrigin().y + 2*grid.getGridSize() + this.y, grid.getOrigin().x + 5*grid.getGridSize() + this.x, grid.getOrigin().y + 2*grid.getGridSize() + this.y]
		];
		return dimens;
	}

// Nand Gate
var NandGate = function(x, y) {
	NandGate.super_.call(this, x, y);
}
inherits(NandGate, Gate);
NandGate.prototype.getOutput = function() {
	return !(this.nodeA && this.nodeB);
}
NandGate.prototype.isSelected = function(x, y) {
	let hitBoxVerts = this.getHitBoxVerts();
	return (x > hitBoxVerts[0].x && y > hitBoxVerts[0].y) && (x < hitBoxVerts[1].x && y < hitBoxVerts[1].y);
}
NandGate.prototype.getHitBoxVerts = function() {
	topLeft = new Point(grid.getOrigin().x + this.x - grid.getGridSize(), grid.getOrigin().y + this.y);
	bottomRight = new Point(grid.getOrigin().x + this.x + 5*grid.getGridSize(), grid.getOrigin().y + this.y + 4*grid.getGridSize());
	return [topLeft, bottomRight];
}
NandGate.prototype.getDrawingDimens = function() {
	let dimens = [
		[grid.getOrigin().x + this.x, grid.getOrigin().y + this.y, grid.getOrigin().x + this.x, grid.getOrigin().y + 4 * grid.getGridSize() + this.y], // first line
		[grid.getOrigin().x + this.x, grid.getOrigin().y + this.y, grid.getOrigin().x + 2*grid.getGridSize() + this.x, grid.getOrigin().y + this.y], // second line
		[grid.getOrigin().x + this.x, grid.getOrigin().y + 4*grid.getGridSize() + this.y, grid.getOrigin().x + 2*grid.getGridSize() + this.x, grid.getOrigin().y + 4*grid.getGridSize() + this.y], // third line
		[grid.getOrigin().x + 2*grid.getGridSize() + this.x, grid.getOrigin().y + 2*grid.getGridSize() + this.y, 4*grid.getGridSize(), 4*grid.getGridSize(), -HALF_PI, HALF_PI], // arc
		[grid.getOrigin().x + 4*grid.getGridSize() + this.x + 0.25*grid.getGridSize(), grid.getOrigin().y + 2*grid.getGridSize() + this.y, 0.5*grid.getGridSize(), 0.5*grid.getGridSize()], // circle
		[grid.getOrigin().x + this.x, grid.getOrigin().y + grid.getGridSize() + this.y, grid.getOrigin().x - grid.getGridSize() + this.x, grid.getOrigin().y + grid.getGridSize() + this.y], // nodeA
		[grid.getOrigin().x + this.x, grid.getOrigin().y +3*grid.getGridSize() + this.y, grid.getOrigin().x - grid.getGridSize() + this.x, grid.getOrigin().y + 3*grid.getGridSize() + this.y], // nodeB
		[grid.getOrigin().x + 4*grid.getGridSize() + this.x + 0.5*grid.getGridSize(), grid.getOrigin().y + 2*grid.getGridSize() + this.y, grid.getOrigin().x + 5*grid.getGridSize() + this.x, grid.getOrigin().y + 2*grid.getGridSize() + this.y] // out
		];
		return dimens;
	}

// Nor Gate
var NorGate = function(x, y) {
	NorGate.super_.call(this, x, y);
}
inherits(NorGate, Gate);
NorGate.prototype.getOutput = function() {
	return !(this.nodeA || this.nodeB);
}
NorGate.prototype.isSelected = function(x, y) {
	let hitBoxVerts = this.getHitBoxVerts();
	return (x > hitBoxVerts[0].x && y > hitBoxVerts[0].y) && (x < hitBoxVerts[1].x && y < hitBoxVerts[1].y);
}
NorGate.prototype.getHitBoxVerts = function() {
	topLeft = new Point(grid.getOrigin().x + this.x - grid.getGridSize(), grid.getOrigin().y + this.y);
	bottomRight = new Point(grid.getOrigin().x + this.x + 5*grid.getGridSize(), grid.getOrigin().y + this.y + 4*grid.getGridSize());
	return [topLeft, bottomRight];
}
NorGate.prototype.getDrawingDimens = function() {
	let dimens = [
	[grid.getOrigin().x + this.x, grid.getOrigin().y + this.y,
	grid.getOrigin().x + 0.75*grid.getGridSize() + this.x, grid.getOrigin().y + grid.getGridSize() + this.y,
	grid.getOrigin().x + 0.75*grid.getGridSize() + this.x, grid.getOrigin().y + 3*grid.getGridSize() + this.y,
	grid.getOrigin().x + this.x, grid.getOrigin().y + 4*grid.getGridSize() + this.y],
		[grid.getOrigin().x + this.x, grid.getOrigin().y + this.y, grid.getOrigin().x + 1*grid.getGridSize() + this.x, grid.getOrigin().y + this.y], //1-2 LINES
		[grid.getOrigin().x + this.x, grid.getOrigin().y + 4*grid.getGridSize() + this.y, grid.getOrigin().x + 1*grid.getGridSize() + this.x, grid.getOrigin().y + 4*grid.getGridSize() + this.y], //1-2 LINES
		[grid.getOrigin().x + 1*grid.getGridSize() + this.x, grid.getOrigin().y + this.y, // 1-2
		grid.getOrigin().x + 3.8*grid.getGridSize() + this.x, grid.getOrigin().y + this.y, 
		grid.getOrigin().x + 3.8*grid.getGridSize() + this.x, grid.getOrigin().y + 1.8*grid.getGridSize() + this.y, 
		grid.getOrigin().x + 4*grid.getGridSize() + this.x, grid.getOrigin().y + 2*grid.getGridSize() + this.y],
		[grid.getOrigin().x + this.x + 1*grid.getGridSize(), grid.getOrigin().y + this.y + 4*grid.getGridSize(), // 1-2
		grid.getOrigin().x + 3.8*grid.getGridSize() + this.x, grid.getOrigin().y + 4*grid.getGridSize() + this.y, 
		grid.getOrigin().x + 3.8*grid.getGridSize() + this.x, grid.getOrigin().y + 2.2*grid.getGridSize() + this.y, 
		grid.getOrigin().x + 4*grid.getGridSize() + this.x, grid.getOrigin().y + 2*grid.getGridSize() + this.y],
		[grid.getOrigin().x + 4*grid.getGridSize() + this.x + 0.25*grid.getGridSize(), grid.getOrigin().y + 2*grid.getGridSize() + this.y, 0.5*grid.getGridSize(), 0.5*grid.getGridSize()], // circle
		[grid.getOrigin().x + 0.4*grid.getGridSize() + this.x, grid.getOrigin().y + grid.getGridSize() + this.y, grid.getOrigin().x - grid.getGridSize() + this.x, grid.getOrigin().y + grid.getGridSize() + this.y],
		[grid.getOrigin().x + 0.4*grid.getGridSize() + this.x, grid.getOrigin().y +3*grid.getGridSize() + this.y, grid.getOrigin().x - grid.getGridSize() + this.x, grid.getOrigin().y + 3*grid.getGridSize() + this.y],
		[grid.getOrigin().x + 4*grid.getGridSize() + this.x + 0.5*grid.getGridSize(), grid.getOrigin().y + 2*grid.getGridSize() + this.y, grid.getOrigin().x + 5*grid.getGridSize() + this.x, grid.getOrigin().y + 2*grid.getGridSize() + this.y]
		];
		return dimens;
	}

// Xnor Gate
var XnorGate = function(x, y) {
	XnorGate.super_.call(this, x, y);
}
inherits(XnorGate, Gate);
XnorGate.prototype.getOutput = function() {
	return !(this.nodeA ? !this.nodeB : this.nodeB);
}
XnorGate.prototype.isSelected = function(x, y) {
	let hitBoxVerts = this.getHitBoxVerts();
	return (x > hitBoxVerts[0].x && y > hitBoxVerts[0].y) && (x < hitBoxVerts[1].x && y < hitBoxVerts[1].y);
}
XnorGate.prototype.getHitBoxVerts = function() {
	topLeft = new Point(grid.getOrigin().x + this.x - grid.getGridSize(), grid.getOrigin().y + this.y);
	bottomRight = new Point(grid.getOrigin().x + this.x + 5*grid.getGridSize(), grid.getOrigin().y + this.y + 4*grid.getGridSize());
	return [topLeft, bottomRight];
}
XnorGate.prototype.getDrawingDimens = function() {
	let dimens = [
	[grid.getOrigin().x - 0.5*grid.getGridSize() + this.x, grid.getOrigin().y + this.y,
	grid.getOrigin().x + 0.25*grid.getGridSize() + this.x, grid.getOrigin().y + grid.getGridSize() + this.y,
	grid.getOrigin().x + 0.25*grid.getGridSize() + this.x, grid.getOrigin().y + 3*grid.getGridSize() + this.y,
	grid.getOrigin().x + this.x - 0.5*grid.getGridSize(), grid.getOrigin().y + 4*grid.getGridSize() + this.y],
	[grid.getOrigin().x + this.x, grid.getOrigin().y + this.y,
	grid.getOrigin().x + 0.75*grid.getGridSize() + this.x, grid.getOrigin().y + grid.getGridSize() + this.y,
	grid.getOrigin().x + 0.75*grid.getGridSize() + this.x, grid.getOrigin().y + 3*grid.getGridSize() + this.y,
	grid.getOrigin().x + this.x, grid.getOrigin().y + 4*grid.getGridSize() + this.y],
		[grid.getOrigin().x + this.x, grid.getOrigin().y + this.y, grid.getOrigin().x + 1*grid.getGridSize() + this.x, grid.getOrigin().y + this.y], //1-2
		[grid.getOrigin().x + this.x, grid.getOrigin().y + 4*grid.getGridSize() + this.y, grid.getOrigin().x + 1*grid.getGridSize() + this.x, grid.getOrigin().y + 4*grid.getGridSize() + this.y], //1-2
		[grid.getOrigin().x + 1*grid.getGridSize() + this.x, grid.getOrigin().y + this.y, // 1-2
		grid.getOrigin().x + 3.8*grid.getGridSize() + this.x, grid.getOrigin().y + this.y, 
		grid.getOrigin().x + 3.8*grid.getGridSize() + this.x, grid.getOrigin().y + 1.8*grid.getGridSize() + this.y, 
		grid.getOrigin().x + 4*grid.getGridSize() + this.x, grid.getOrigin().y + 2*grid.getGridSize() + this.y],
		[grid.getOrigin().x + this.x + 1*grid.getGridSize(), grid.getOrigin().y + this.y + 4*grid.getGridSize(), // 1-2
		grid.getOrigin().x + 3.8*grid.getGridSize() + this.x, grid.getOrigin().y + 4*grid.getGridSize() + this.y, 
		grid.getOrigin().x + 3.8*grid.getGridSize() + this.x, grid.getOrigin().y + 2.2*grid.getGridSize() + this.y, 
		grid.getOrigin().x + 4*grid.getGridSize() + this.x, grid.getOrigin().y + 2*grid.getGridSize() + this.y],
		[grid.getOrigin().x + 4*grid.getGridSize() + this.x + 0.25*grid.getGridSize(), grid.getOrigin().y + 2*grid.getGridSize() + this.y, 0.5*grid.getGridSize(), 0.5*grid.getGridSize()], // circle
		[grid.getOrigin().x - 0.1*grid.getGridSize() + this.x, grid.getOrigin().y + grid.getGridSize() + this.y, grid.getOrigin().x - grid.getGridSize() + this.x, grid.getOrigin().y + grid.getGridSize() + this.y],
		[grid.getOrigin().x - 0.1*grid.getGridSize() + this.x, grid.getOrigin().y +3*grid.getGridSize() + this.y, grid.getOrigin().x - grid.getGridSize() + this.x, grid.getOrigin().y + 3*grid.getGridSize() + this.y],
		[grid.getOrigin().x + 4*grid.getGridSize() + this.x + 0.5*grid.getGridSize(), grid.getOrigin().y + 2*grid.getGridSize() + this.y, grid.getOrigin().x + 5*grid.getGridSize() + this.x, grid.getOrigin().y + 2*grid.getGridSize() + this.y]
		];
		return dimens;
	}

/*
 * IO
 */

var IO = function(x, y) {
	IO.super_.call(this, x, y);

 	this.state = false;
 	// IO components dont have to use all inputs.  Will start with nodeA
 	this.nodeA = null;
 	this.nodeB = null;
 	this.nodeC = null;
 	this.nodeD = null;
 	this.nodeE = null;
 	this.nodeF = null;
 	this.nodeG = null;
 	// IO components dont have to use out (7 segment, gnd, Vcc)
 	this.out = null;
}
inherits(IO, Component);
IO.prototype.isSelected = function(x, y) {
 	let hitBoxVerts = this.getHitBoxVerts();
 	return (x > hitBoxVerts[0].x && y > hitBoxVerts[0].y) && (x < hitBoxVerts[1].x && y < hitBoxVerts[1].y);
}

var Input = function(x, y) {
 	Input.super_.call(this, x, y);

 	this.nodes.push(new Node(origin.x + this.x + 3*grid.getGridSize(), origin.y + this.y + grid.getGridSize()));
}
inherits(Input, IO);
Input.prototype.getStateHitBoxVerts = function() {
 	let topLeft = new Point(origin.x + this.x + 0.375*grid.getGridSize(), origin.y + this.y + 0.375*grid.getGridSize());
 	let bottomRight = new Point(origin.x + this.x + 1.625*grid.getGridSize(), origin.y + this.y + 1.625*grid.getGridSize());
 	return [topLeft, bottomRight];
}
Input.prototype.isStateSelected = function(x, y) {
	let stateHitBoxVerts = this.getStateHitBoxVerts();
 	return (x > stateHitBoxVerts[0].x && y > stateHitBoxVerts[0].y) && (x < stateHitBoxVerts[1].x && y < stateHitBoxVerts[1].y);
}
Input.prototype.getHitBoxVerts = function() {
	let topLeft = new Point(grid.getOrigin().x + this.x, grid.getOrigin().y + this.y);
	let bottomRight = new Point(grid.getOrigin().x + this.x + 3*grid.getGridSize(), grid.getOrigin().y + this.y + 2*grid.getGridSize());
	return [topLeft, bottomRight];
}
Input.prototype.getDrawingDimens = function() {
	let dimens = [
	[origin.x + this.x, origin.y + this.y, origin.x + this.x + 2*grid.getGridSize(), origin.y + this.y],
	[origin.x + this.x, origin.y + this.y, origin.x + this.x, origin.y + this.y + 2*grid.getGridSize()],
	[origin.x + this.x, origin.y + this.y + 2*grid.getGridSize(), origin.x + this.x + 2*grid.getGridSize(), origin.y + this.y + 2*grid.getGridSize()],
	[origin.x + this.x + 2*grid.getGridSize(), origin.y + this.y, origin.x + this.x + 3*grid.getGridSize(), origin.y + this.y + grid.getGridSize()], // out
	[origin.x + this.x + 2*grid.getGridSize(), origin.y + this.y + 2*grid.getGridSize(), origin.x + this.x + 3*grid.getGridSize(), origin.y + this.y + grid.getGridSize()], // out
	this.state,
	[origin.x + this.x + grid.getGridSize(), origin.y + this.y + grid.getGridSize(), grid.getGridSize()*1.25, grid.getGridSize()*1.25],
	// [this.getNodeHitBoxVerts()[0].x, this.getNodeHitBoxVerts()[0].y, this.getNodeHitBoxVerts()[1].x, this.getNodeHitBoxVerts()[1].y],
	];
	return dimens;
}
Input.prototype.updateNodes = function() {
	this.nodes[0].x = origin.x + this.x + 3*grid.getGridSize();
	this.nodes[0].y = origin.y + this.y + grid.getGridSize();
}