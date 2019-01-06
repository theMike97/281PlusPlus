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
Component.prototype.isSelected = function(x, y) {
 	let hitBoxVerts = this.getHitBoxVerts();
 	return (x > hitBoxVerts[0].x && y > hitBoxVerts[0].y) && (x < hitBoxVerts[1].x && y < hitBoxVerts[1].y);
}

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

	this.nodes.push(new Node(origin.x - grid.getGridSize() + this.x, origin.y + grid.getGridSize() + this.y, IN));
	this.nodes.push(new Node(origin.x + 3*grid.getGridSize() + this.x, origin.y + grid.getGridSize() + this.y, OUT));
}
inherits(NotGate, Gate);
NotGate.prototype.updateOutput = function() {
	this.nodes[1].state = !this.nodes[0].state;
}
NotGate.prototype.getHitBoxVerts = function() { //returns point at top left and bottom right
	topLeft = new Point(origin.x + this.x - grid.getGridSize(), origin.y + this.y);
	bottomRight = new Point(origin.x + this.x + 3*grid.getGridSize(), origin.y + this.y + 2*grid.getGridSize());
	return [topLeft, bottomRight];
}
NotGate.prototype.isSelected = function(x, y) {
	let hitBoxVerts = this.getHitBoxVerts();
	return (x > hitBoxVerts[0].x && y > hitBoxVerts[0].y) && (x < hitBoxVerts[1].x && y < hitBoxVerts[1].y);
}
NotGate.prototype.getDrawingDimens = function() {
	let dimens = [
		[origin.x + this.x, origin.y + this.y, origin.x + 2*grid.getGridSize() + this.x, origin.y + grid.getGridSize() + this.y],
		[origin.x + this.x, origin.y + 2*grid.getGridSize()+ this.y, origin.x + 2*grid.getGridSize() + this.x, origin.y + grid.getGridSize() + this.y],
		[origin.x + this.x, origin.y + 2* grid.getGridSize() + this.y, origin.x + this.x, origin.y + this.y],
		[origin.x + 2.25*grid.getGridSize() + this.x, origin.y + grid.getGridSize() + this.y, 0.5*grid.getGridSize(),0.5*grid.getGridSize()],
		[origin.x + this.x, origin.y + grid.getGridSize() + this.y, origin.x - grid.getGridSize() + this.x, origin.y + grid.getGridSize() + this.y],
		[origin.x + 2.5*grid.getGridSize() + this.x, origin.y + grid.getGridSize() + this.y, origin.x + 3*grid.getGridSize() + this.x, origin.y + grid.getGridSize() + this.y]
	];
	return dimens;
}
NotGate.prototype.updateNodes = function() {
	this.nodes[0].x = origin.x - grid.getGridSize() + this.x;
	this.nodes[0].y = origin.y + grid.getGridSize() + this.y;
	this.nodes[1].x = origin.x + 3*grid.getGridSize() + this.x;
	this.nodes[1].y = origin.y + grid.getGridSize() + this.y;
}

// And Gate
var AndGate = function(x, y) {
	AndGate.super_.call(this, x, y);

	this.nodes.push(new Node(origin.x - grid.getGridSize() + this.x, origin.y + grid.getGridSize() + this.y, IN));
	this.nodes.push(new Node(origin.x - grid.getGridSize() + this.x, origin.y + 3*grid.getGridSize() + this.y, IN));
	this.nodes.push(new Node(origin.x + 5*grid.getGridSize() + this.x, origin.y + 2*grid.getGridSize() + this.y, OUT)); // last is always output node
}
inherits(AndGate, Gate);
AndGate.prototype.updateOutput = function() {
	this.nodes[2].state = this.nodes[0].state && this.nodes[1].state;
	// console.log(this.nodes[1].state);
}
AndGate.prototype.getHitBoxVerts = function() {
	topLeft = new Point(origin.x + this.x - grid.getGridSize(), origin.y + this.y);
	bottomRight = new Point(origin.x + this.x + 5*grid.getGridSize(), origin.y + this.y + 4*grid.getGridSize());
	return [topLeft, bottomRight];
}
AndGate.prototype.isSelected = function(x, y) {
	let hitBoxVerts = this.getHitBoxVerts();
	return (x > hitBoxVerts[0].x && y > hitBoxVerts[0].y) && (x < hitBoxVerts[1].x && y < hitBoxVerts[1].y);
}
AndGate.prototype.getDrawingDimens = function() {
	let dimens = [
		[origin.x + this.x, origin.y + this.y, origin.x + this.x, origin.y + 4 * grid.getGridSize() + this.y], // first line
		[origin.x + this.x, origin.y + this.y, origin.x + 2*grid.getGridSize() + this.x, origin.y + this.y], // second line
		[origin.x + this.x, origin.y + 4*grid.getGridSize() + this.y, origin.x + 2*grid.getGridSize() + this.x, origin.y + 4*grid.getGridSize() + this.y], // third line
		[origin.x + 2*grid.getGridSize() + this.x, origin.y + 2*grid.getGridSize() + this.y, 4*grid.getGridSize(), 4*grid.getGridSize(), -HALF_PI, HALF_PI], // arc
		[origin.x + this.x, origin.y + grid.getGridSize() + this.y, origin.x - grid.getGridSize() + this.x, origin.y + grid.getGridSize() + this.y], // nodeA
		[origin.x + this.x, origin.y +3*grid.getGridSize() + this.y, origin.x - grid.getGridSize() + this.x, origin.y + 3*grid.getGridSize() + this.y], // nodeB
		[origin.x + 4*grid.getGridSize() + this.x, origin.y + 2*grid.getGridSize() + this.y, origin.x + 5*grid.getGridSize() + this.x, origin.y + 2*grid.getGridSize() + this.y] // out
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

	this.nodes.push(new Node(origin.x - grid.getGridSize() + this.x, origin.y + grid.getGridSize() + this.y, IN));
	this.nodes.push(new Node(origin.x - grid.getGridSize() + this.x, origin.y + 3*grid.getGridSize() + this.y, IN));
	this.nodes.push(new Node(origin.x + 5*grid.getGridSize() + this.x, origin.y + 2*grid.getGridSize() + this.y, OUT)); // last is always output node
}
inherits(OrGate, Gate);
OrGate.prototype.updateOutput = function() {
	this.nodes[2].state = this.nodes[0].state || this.nodes[1].state;
}
OrGate.prototype.isSelected = function(x, y) {
	let hitBoxVerts = this.getHitBoxVerts();
	return (x > hitBoxVerts[0].x && y > hitBoxVerts[0].y) && (x < hitBoxVerts[1].x && y < hitBoxVerts[1].y);
}
OrGate.prototype.getHitBoxVerts = function() {
	topLeft = new Point(origin.x + this.x - grid.getGridSize(), origin.y + this.y);
	bottomRight = new Point(origin.x + this.x + 5*grid.getGridSize(), origin.y + this.y + 4*grid.getGridSize());
	return [topLeft, bottomRight];
}
OrGate.prototype.getDrawingDimens = function() {
	let dimens = [
		[origin.x + this.x, origin.y + this.y,
		origin.x + 0.75*grid.getGridSize() + this.x, origin.y + grid.getGridSize() + this.y,
		origin.x + 0.75*grid.getGridSize() + this.x, origin.y + 3*grid.getGridSize() + this.y,
		origin.x + this.x, origin.y + 4*grid.getGridSize() + this.y],
		[origin.x + this.x, origin.y + this.y, origin.x + 1*grid.getGridSize() + this.x, origin.y + this.y], //1-2 LINES
		[origin.x + this.x, origin.y + 4*grid.getGridSize() + this.y, origin.x + 1*grid.getGridSize() + this.x, origin.y + 4*grid.getGridSize() + this.y], //1-2 LINES
		[origin.x + 1*grid.getGridSize() + this.x, origin.y + this.y, // 1-2
		origin.x + 3.8*grid.getGridSize() + this.x, origin.y + this.y, 
		origin.x + 3.8*grid.getGridSize() + this.x, origin.y + 1.8*grid.getGridSize() + this.y, 
		origin.x + 4*grid.getGridSize() + this.x, origin.y + 2*grid.getGridSize() + this.y],
		[origin.x + this.x + 1*grid.getGridSize(), origin.y + this.y + 4*grid.getGridSize(), // 1-2
		origin.x + 3.8*grid.getGridSize() + this.x, origin.y + 4*grid.getGridSize() + this.y, 
		origin.x + 3.8*grid.getGridSize() + this.x, origin.y + 2.2*grid.getGridSize() + this.y, 
		origin.x + 4*grid.getGridSize() + this.x, origin.y + 2*grid.getGridSize() + this.y],
		[origin.x + 0.4*grid.getGridSize() + this.x, origin.y + grid.getGridSize() + this.y, origin.x - grid.getGridSize() + this.x, origin.y + grid.getGridSize() + this.y],
		[origin.x + 0.4*grid.getGridSize() + this.x, origin.y +3*grid.getGridSize() + this.y, origin.x - grid.getGridSize() + this.x, origin.y + 3*grid.getGridSize() + this.y],
		[origin.x + 4*grid.getGridSize() + this.x, origin.y + 2*grid.getGridSize() + this.y, origin.x + 5*grid.getGridSize() + this.x, origin.y + 2*grid.getGridSize() + this.y]
		];
	return dimens;
}
OrGate.prototype.updateNodes = function() {
	this.nodes[0].x = origin.x - grid.getGridSize() + this.x;
	this.nodes[0].y = origin.y + grid.getGridSize() + this.y;
	this.nodes[1].x = origin.x - grid.getGridSize() + this.x;
	this.nodes[1].y = origin.y + 3*grid.getGridSize() + this.y;
	this.nodes[2].x = origin.x + 5*grid.getGridSize() + this.x;
	this.nodes[2].y = origin.y + 2*grid.getGridSize() + this.y;
}

// Xor Gate
var XorGate = function(x, y) {
	XorGate.super_.call(this, x, y);

	this.nodes.push(new Node(origin.x - grid.getGridSize() + this.x, origin.y + grid.getGridSize() + this.y, IN));
	this.nodes.push(new Node(origin.x - grid.getGridSize() + this.x, origin.y + 3*grid.getGridSize() + this.y, IN));
	this.nodes.push(new Node(origin.x + 5*grid.getGridSize() + this.x, origin.y + 2*grid.getGridSize() + this.y, OUT)); // last is always output node
}
inherits(XorGate, Gate);
XorGate.prototype.updateOutput = function() {
	this.nodes[2].state = this.nodes[0].state ? !this.nodes[1].state : this.nodes[1].state;
}
XorGate.prototype.isSelected = function(x, y) {
	let hitBoxVerts = this.getHitBoxVerts();
	return (x > hitBoxVerts[0].x && y > hitBoxVerts[0].y) && (x < hitBoxVerts[1].x && y < hitBoxVerts[1].y);
}
XorGate.prototype.getHitBoxVerts = function() {
	topLeft = new Point(origin.x + this.x - grid.getGridSize(), origin.y + this.y);
	bottomRight = new Point(origin.x + this.x + 5*grid.getGridSize(), origin.y + this.y + 4*grid.getGridSize());
	return [topLeft, bottomRight];
}
XorGate.prototype.getDrawingDimens = function() {
	let dimens = [
		[origin.x - 0.5*grid.getGridSize() + this.x, origin.y + this.y,
		origin.x + 0.25*grid.getGridSize() + this.x, origin.y + grid.getGridSize() + this.y,
		origin.x + 0.25*grid.getGridSize() + this.x, origin.y + 3*grid.getGridSize() + this.y,
		origin.x + this.x - 0.5*grid.getGridSize(), origin.y + 4*grid.getGridSize() + this.y],
		[origin.x + this.x, origin.y + this.y,
		origin.x + 0.75*grid.getGridSize() + this.x, origin.y + grid.getGridSize() + this.y,
		origin.x + 0.75*grid.getGridSize() + this.x, origin.y + 3*grid.getGridSize() + this.y,
		origin.x + this.x, origin.y + 4*grid.getGridSize() + this.y],
		[origin.x + this.x, origin.y + this.y, origin.x + 1*grid.getGridSize() + this.x, origin.y + this.y], //1-2
		[origin.x + this.x, origin.y + 4*grid.getGridSize() + this.y, origin.x + 1*grid.getGridSize() + this.x, origin.y + 4*grid.getGridSize() + this.y], //1-2
		[origin.x + 1*grid.getGridSize() + this.x, origin.y + this.y, // 1-2
		origin.x + 3.8*grid.getGridSize() + this.x, origin.y + this.y, 
		origin.x + 3.8*grid.getGridSize() + this.x, origin.y + 1.8*grid.getGridSize() + this.y, 
		origin.x + 4*grid.getGridSize() + this.x, origin.y + 2*grid.getGridSize() + this.y],
		[origin.x + this.x + 1*grid.getGridSize(), origin.y + this.y + 4*grid.getGridSize(), // 1-2
		origin.x + 3.8*grid.getGridSize() + this.x, origin.y + 4*grid.getGridSize() + this.y, 
		origin.x + 3.8*grid.getGridSize() + this.x, origin.y + 2.2*grid.getGridSize() + this.y, 
		origin.x + 4*grid.getGridSize() + this.x, origin.y + 2*grid.getGridSize() + this.y],
		[origin.x - 0.1*grid.getGridSize() + this.x, origin.y + grid.getGridSize() + this.y, origin.x - grid.getGridSize() + this.x, origin.y + grid.getGridSize() + this.y],
		[origin.x - 0.1*grid.getGridSize() + this.x, origin.y +3*grid.getGridSize() + this.y, origin.x - grid.getGridSize() + this.x, origin.y + 3*grid.getGridSize() + this.y],
		[origin.x + 4*grid.getGridSize() + this.x, origin.y + 2*grid.getGridSize() + this.y, origin.x + 5*grid.getGridSize() + this.x, origin.y + 2*grid.getGridSize() + this.y]
		];
	return dimens;
}
XorGate.prototype.updateNodes = function() {
	this.nodes[0].x = origin.x - grid.getGridSize() + this.x;
	this.nodes[0].y = origin.y + grid.getGridSize() + this.y;
	this.nodes[1].x = origin.x - grid.getGridSize() + this.x;
	this.nodes[1].y = origin.y + 3*grid.getGridSize() + this.y;
	this.nodes[2].x = origin.x + 5*grid.getGridSize() + this.x;
	this.nodes[2].y = origin.y + 2*grid.getGridSize() + this.y;
}

// Nand Gate
var NandGate = function(x, y) {
	NandGate.super_.call(this, x, y);

	this.nodes.push(new Node(origin.x - grid.getGridSize() + this.x, origin.y + grid.getGridSize() + this.y, IN));
	this.nodes.push(new Node(origin.x - grid.getGridSize() + this.x, origin.y + 3*grid.getGridSize() + this.y, IN));
	this.nodes.push(new Node(origin.x + 5*grid.getGridSize() + this.x, origin.y + 2*grid.getGridSize() + this.y, OUT)); // last is always output node
}
inherits(NandGate, Gate);
NandGate.prototype.updateOutput = function() {
	this.nodes[2].state = !(this.nodes[0].state && this.nodes[1].state);
}
NandGate.prototype.isSelected = function(x, y) {
	let hitBoxVerts = this.getHitBoxVerts();
	return (x > hitBoxVerts[0].x && y > hitBoxVerts[0].y) && (x < hitBoxVerts[1].x && y < hitBoxVerts[1].y);
}
NandGate.prototype.getHitBoxVerts = function() {
	topLeft = new Point(origin.x + this.x - grid.getGridSize(), origin.y + this.y);
	bottomRight = new Point(origin.x + this.x + 5*grid.getGridSize(), origin.y + this.y + 4*grid.getGridSize());
	return [topLeft, bottomRight];
}
NandGate.prototype.getDrawingDimens = function() {
	let dimens = [
		[origin.x + this.x, origin.y + this.y, origin.x + this.x, origin.y + 4 * grid.getGridSize() + this.y], // first line
		[origin.x + this.x, origin.y + this.y, origin.x + 2*grid.getGridSize() + this.x, origin.y + this.y], // second line
		[origin.x + this.x, origin.y + 4*grid.getGridSize() + this.y, origin.x + 2*grid.getGridSize() + this.x, origin.y + 4*grid.getGridSize() + this.y], // third line
		[origin.x + 2*grid.getGridSize() + this.x, origin.y + 2*grid.getGridSize() + this.y, 4*grid.getGridSize(), 4*grid.getGridSize(), -HALF_PI, HALF_PI], // arc
		[origin.x + 4*grid.getGridSize() + this.x + 0.25*grid.getGridSize(), origin.y + 2*grid.getGridSize() + this.y, 0.5*grid.getGridSize(), 0.5*grid.getGridSize()], // circle
		[origin.x + this.x, origin.y + grid.getGridSize() + this.y, origin.x - grid.getGridSize() + this.x, origin.y + grid.getGridSize() + this.y], // nodeA
		[origin.x + this.x, origin.y +3*grid.getGridSize() + this.y, origin.x - grid.getGridSize() + this.x, origin.y + 3*grid.getGridSize() + this.y], // nodeB
		[origin.x + 4*grid.getGridSize() + this.x + 0.5*grid.getGridSize(), origin.y + 2*grid.getGridSize() + this.y, origin.x + 5*grid.getGridSize() + this.x, origin.y + 2*grid.getGridSize() + this.y] // out
		];
	return dimens;
}
NandGate.prototype.updateNodes = function() {
	this.nodes[0].x = origin.x - grid.getGridSize() + this.x;
	this.nodes[0].y = origin.y + grid.getGridSize() + this.y;
	this.nodes[1].x = origin.x - grid.getGridSize() + this.x;
	this.nodes[1].y = origin.y + 3*grid.getGridSize() + this.y;
	this.nodes[2].x = origin.x + 5*grid.getGridSize() + this.x;
	this.nodes[2].y = origin.y + 2*grid.getGridSize() + this.y;
}

// Nor Gate
var NorGate = function(x, y) {
	NorGate.super_.call(this, x, y);

	this.nodes.push(new Node(origin.x - grid.getGridSize() + this.x, origin.y + grid.getGridSize() + this.y, IN));
	this.nodes.push(new Node(origin.x - grid.getGridSize() + this.x, origin.y + 3*grid.getGridSize() + this.y, IN));
	this.nodes.push(new Node(origin.x + 5*grid.getGridSize() + this.x, origin.y + 2*grid.getGridSize() + this.y, OUT)); // last is always output node
}
inherits(NorGate, Gate);
NorGate.prototype.updateOutput = function() {
	this.nodes[2].state = !(this.nodes[0].state || this.nodes[1].state);
}
NorGate.prototype.isSelected = function(x, y) {
	let hitBoxVerts = this.getHitBoxVerts();
	return (x > hitBoxVerts[0].x && y > hitBoxVerts[0].y) && (x < hitBoxVerts[1].x && y < hitBoxVerts[1].y);
}
NorGate.prototype.getHitBoxVerts = function() {
	topLeft = new Point(origin.x + this.x - grid.getGridSize(), origin.y + this.y);
	bottomRight = new Point(origin.x + this.x + 5*grid.getGridSize(), origin.y + this.y + 4*grid.getGridSize());
	return [topLeft, bottomRight];
}
NorGate.prototype.getDrawingDimens = function() {
	let dimens = [
		[origin.x + this.x, origin.y + this.y,
		origin.x + 0.75*grid.getGridSize() + this.x, origin.y + grid.getGridSize() + this.y,
		origin.x + 0.75*grid.getGridSize() + this.x, origin.y + 3*grid.getGridSize() + this.y,
		origin.x + this.x, origin.y + 4*grid.getGridSize() + this.y],
		[origin.x + this.x, origin.y + this.y, origin.x + 1*grid.getGridSize() + this.x, origin.y + this.y], //1-2 LINES
		[origin.x + this.x, origin.y + 4*grid.getGridSize() + this.y, origin.x + 1*grid.getGridSize() + this.x, origin.y + 4*grid.getGridSize() + this.y], //1-2 LINES
		[origin.x + 1*grid.getGridSize() + this.x, origin.y + this.y, // 1-2
		origin.x + 3.8*grid.getGridSize() + this.x, origin.y + this.y, 
		origin.x + 3.8*grid.getGridSize() + this.x, origin.y + 1.8*grid.getGridSize() + this.y, 
		origin.x + 4*grid.getGridSize() + this.x, origin.y + 2*grid.getGridSize() + this.y],
		[origin.x + this.x + 1*grid.getGridSize(), origin.y + this.y + 4*grid.getGridSize(), // 1-2
		origin.x + 3.8*grid.getGridSize() + this.x, origin.y + 4*grid.getGridSize() + this.y, 
		origin.x + 3.8*grid.getGridSize() + this.x, origin.y + 2.2*grid.getGridSize() + this.y, 
		origin.x + 4*grid.getGridSize() + this.x, origin.y + 2*grid.getGridSize() + this.y],
		[origin.x + 4*grid.getGridSize() + this.x + 0.25*grid.getGridSize(), origin.y + 2*grid.getGridSize() + this.y, 0.5*grid.getGridSize(), 0.5*grid.getGridSize()], // circle
		[origin.x + 0.4*grid.getGridSize() + this.x, origin.y + grid.getGridSize() + this.y, origin.x - grid.getGridSize() + this.x, origin.y + grid.getGridSize() + this.y],
		[origin.x + 0.4*grid.getGridSize() + this.x, origin.y +3*grid.getGridSize() + this.y, origin.x - grid.getGridSize() + this.x, origin.y + 3*grid.getGridSize() + this.y],
		[origin.x + 4*grid.getGridSize() + this.x + 0.5*grid.getGridSize(), origin.y + 2*grid.getGridSize() + this.y, origin.x + 5*grid.getGridSize() + this.x, origin.y + 2*grid.getGridSize() + this.y]
		];
	return dimens;
}
NorGate.prototype.updateNodes = function() {
	this.nodes[0].x = origin.x - grid.getGridSize() + this.x;
	this.nodes[0].y = origin.y + grid.getGridSize() + this.y;
	this.nodes[1].x = origin.x - grid.getGridSize() + this.x;
	this.nodes[1].y = origin.y + 3*grid.getGridSize() + this.y;
	this.nodes[2].x = origin.x + 5*grid.getGridSize() + this.x;
	this.nodes[2].y = origin.y + 2*grid.getGridSize() + this.y;
}

// Xnor Gate
var XnorGate = function(x, y) {
	XnorGate.super_.call(this, x, y);

	this.nodes.push(new Node(origin.x - grid.getGridSize() + this.x, origin.y + grid.getGridSize() + this.y, IN));
	this.nodes.push(new Node(origin.x - grid.getGridSize() + this.x, origin.y + 3*grid.getGridSize() + this.y, IN));
	this.nodes.push(new Node(origin.x + 5*grid.getGridSize() + this.x, origin.y + 2*grid.getGridSize() + this.y, OUT)); // last is always output node
}
inherits(XnorGate, Gate);
XnorGate.prototype.updateOutput = function() {
	this.nodes[2].state = !(this.nodes[0].state ? !this.nodes[1].state : this.nodes[1].state);
}
XnorGate.prototype.isSelected = function(x, y) {
	let hitBoxVerts = this.getHitBoxVerts();
	return (x > hitBoxVerts[0].x && y > hitBoxVerts[0].y) && (x < hitBoxVerts[1].x && y < hitBoxVerts[1].y);
}
XnorGate.prototype.getHitBoxVerts = function() {
	topLeft = new Point(origin.x + this.x - grid.getGridSize(), origin.y + this.y);
	bottomRight = new Point(origin.x + this.x + 5*grid.getGridSize(), origin.y + this.y + 4*grid.getGridSize());
	return [topLeft, bottomRight];
}
XnorGate.prototype.getDrawingDimens = function() {
	let dimens = [
		[origin.x - 0.5*grid.getGridSize() + this.x, origin.y + this.y,
		origin.x + 0.25*grid.getGridSize() + this.x, origin.y + grid.getGridSize() + this.y,
		origin.x + 0.25*grid.getGridSize() + this.x, origin.y + 3*grid.getGridSize() + this.y,
		origin.x + this.x - 0.5*grid.getGridSize(), origin.y + 4*grid.getGridSize() + this.y],
		[origin.x + this.x, origin.y + this.y,
		origin.x + 0.75*grid.getGridSize() + this.x, origin.y + grid.getGridSize() + this.y,
		origin.x + 0.75*grid.getGridSize() + this.x, origin.y + 3*grid.getGridSize() + this.y,
		origin.x + this.x, origin.y + 4*grid.getGridSize() + this.y],
		[origin.x + this.x, origin.y + this.y, origin.x + 1*grid.getGridSize() + this.x, origin.y + this.y], //1-2
		[origin.x + this.x, origin.y + 4*grid.getGridSize() + this.y, origin.x + 1*grid.getGridSize() + this.x, origin.y + 4*grid.getGridSize() + this.y], //1-2
		[origin.x + 1*grid.getGridSize() + this.x, origin.y + this.y, // 1-2
		origin.x + 3.8*grid.getGridSize() + this.x, origin.y + this.y, 
		origin.x + 3.8*grid.getGridSize() + this.x, origin.y + 1.8*grid.getGridSize() + this.y, 
		origin.x + 4*grid.getGridSize() + this.x, origin.y + 2*grid.getGridSize() + this.y],
		[origin.x + this.x + 1*grid.getGridSize(), origin.y + this.y + 4*grid.getGridSize(), // 1-2
		origin.x + 3.8*grid.getGridSize() + this.x, origin.y + 4*grid.getGridSize() + this.y, 
		origin.x + 3.8*grid.getGridSize() + this.x, origin.y + 2.2*grid.getGridSize() + this.y, 
		origin.x + 4*grid.getGridSize() + this.x, origin.y + 2*grid.getGridSize() + this.y],
		[origin.x + 4*grid.getGridSize() + this.x + 0.25*grid.getGridSize(), origin.y + 2*grid.getGridSize() + this.y, 0.5*grid.getGridSize(), 0.5*grid.getGridSize()], // circle
		[origin.x - 0.1*grid.getGridSize() + this.x, origin.y + grid.getGridSize() + this.y, origin.x - grid.getGridSize() + this.x, origin.y + grid.getGridSize() + this.y],
		[origin.x - 0.1*grid.getGridSize() + this.x, origin.y +3*grid.getGridSize() + this.y, origin.x - grid.getGridSize() + this.x, origin.y + 3*grid.getGridSize() + this.y],
		[origin.x + 4*grid.getGridSize() + this.x + 0.5*grid.getGridSize(), origin.y + 2*grid.getGridSize() + this.y, origin.x + 5*grid.getGridSize() + this.x, origin.y + 2*grid.getGridSize() + this.y]
		];
	return dimens;
}
XnorGate.prototype.updateNodes = function() {
	this.nodes[0].x = origin.x - grid.getGridSize() + this.x;
	this.nodes[0].y = origin.y + grid.getGridSize() + this.y;
	this.nodes[1].x = origin.x - grid.getGridSize() + this.x;
	this.nodes[1].y = origin.y + 3*grid.getGridSize() + this.y;
	this.nodes[2].x = origin.x + 5*grid.getGridSize() + this.x;
	this.nodes[2].y = origin.y + 2*grid.getGridSize() + this.y;
}

/*
 * IO
 */

var IO = function(x, y) {
	IO.super_.call(this, x, y);

 	this.state = false;

}
inherits(IO, Component);
IO.prototype.isSelected = function(x, y) {
 	let hitBoxVerts = this.getHitBoxVerts();
 	return (x > hitBoxVerts[0].x && y > hitBoxVerts[0].y) && (x < hitBoxVerts[1].x && y < hitBoxVerts[1].y);
}


// Input
var Input = function(x, y) {
 	Input.super_.call(this, x, y);

 	this.nodes.push(new Node(origin.x + this.x + 3*grid.getGridSize(), origin.y + this.y + grid.getGridSize(), OUT));
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
	let topLeft = new Point(origin.x + this.x, origin.y + this.y);
	let bottomRight = new Point(origin.x + this.x + 3*grid.getGridSize(), origin.y + this.y + 2*grid.getGridSize());
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
	];
	return dimens;
}
Input.prototype.updateNodes = function() {
	this.nodes[0].x = origin.x + this.x + 3*grid.getGridSize();
	this.nodes[0].y = origin.y + this.y + grid.getGridSize();
}
Input.prototype.updateOutput = function() {
	this.nodes[0].state = this.state;
	// console.log(this.nodes[0].state);
}

// Output LED
var Led = function(x, y) {
	Led.super_.call(this, x, y);

 	this.nodes.push(new Node(origin.x + this.x, origin.y + this.y + grid.getGridSize(), IN));
}
inherits(Led, IO);
Led.prototype.getHitBoxVerts = function() {
	let topLeft = new Point(origin.x + this.x, origin.y + this.y);
	let bottomRight = new Point(origin.x + this.x + 2*grid.getGridSize(), origin.y + this.y + 2*grid.getGridSize());
	return [topLeft, bottomRight];
}
Led.prototype.getDrawingDimens = function() {
	let dimens = [
		[this.x + origin.x, this.y + origin.y, this.x + origin.x + 2*grid.getGridSize(), this.y + origin.y],
		[this.x + origin.x + 2*grid.getGridSize(), this.y + origin.y, this.x + origin.x + 2*grid.getGridSize(), this.y + origin.y + 2*grid.getGridSize()],
		[this.x + origin.x + 2*grid.getGridSize(), this.y + origin.y + 2*grid.getGridSize(), this.x + origin.x, this.y + origin.y + 2*grid.getGridSize()],
		[this.x + origin.x, this.y + origin.y + 2*grid.getGridSize(), this.x + origin.x, this.y + origin.y + 1.25*grid.getGridSize()],
		[this.x + origin.x, this.y + origin.y, this.x + origin.x, this.y + origin.y + 0.75*grid.getGridSize()],
		this.state,
		[this.x + origin.x + grid.getGridSize(), this.y + origin.y + grid.getGridSize(), 1.25*grid.getGridSize(), 1.25*grid.getGridSize()],
	];
	return dimens;
}
Led.prototype.updateNodes = function() {
	this.nodes[0].x = origin.x + this.x;
	this.nodes[0].y = origin.y + this.y + grid.getGridSize();
}
Led.prototype.updateOutput = function() {
	this.state = this.nodes[0].state;
}

// 7 Segment Display
var SevenSeg = function(x, y) {
	SevenSeg.super_.call(this, x, y);

	this.output = "0";
	this.nodes.push(new Node(origin.x + this.x - grid.getGridSize(), origin.y + this.y + 7*grid.getGridSize(), IN));
	this.nodes.push(new Node(origin.x + this.x - grid.getGridSize(), origin.y + this.y + 5*grid.getGridSize(), IN));
	this.nodes.push(new Node(origin.x + this.x - grid.getGridSize(), origin.y + this.y + 3*grid.getGridSize(), IN));
	this.nodes.push(new Node(origin.x + this.x - grid.getGridSize(), origin.y + this.y + grid.getGridSize(), IN));
}
inherits(SevenSeg, IO);
SevenSeg.prototype.getHitBoxVerts = function() {
	let topLeft = new Point(origin.x + this.x, origin.y + this.y);
	let bottomRight = new Point(origin.x + this.x + 6*grid.getGridSize(), origin.y + this.y + 8*grid.getGridSize());
	return [topLeft, bottomRight];
}
SevenSeg.prototype.getDrawingDimens = function() {
	let dimens = [
		// body
		[origin.x + this.x, origin.y + this.y, origin.x + this.x + 6*grid.getGridSize(), origin.y + this.y],
		[origin.x + this.x + 6*grid.getGridSize(), origin.y + this.y, origin.x + this.x + 6*grid.getGridSize(), origin.y + this.y + 8*grid.getGridSize()],
		[origin.x + this.x + 6*grid.getGridSize(), origin.y + this.y + 8*grid.getGridSize(), origin.x + this.x, origin.y + this.y + 8*grid.getGridSize()],
		[origin.x + this.x, origin.y + this.y + 8*grid.getGridSize(), origin.x + this.x, origin.y + this.y],
		// text
		[this.output, origin.x + this.x + 3.0625*grid.getGridSize(), origin.y + this.y + 4.5*grid.getGridSize()],
		// nodes
		[origin.x + this.x, origin.y + this.y + grid.getGridSize(), origin.x + this.x - grid.getGridSize(), origin.y + this.y + grid.getGridSize()],
		[origin.x + this.x, origin.y + this.y + 3*grid.getGridSize(), origin.x + this.x - grid.getGridSize(), origin.y + this.y + 3*grid.getGridSize()],
		[origin.x + this.x, origin.y + this.y + 5*grid.getGridSize(), origin.x + this.x - grid.getGridSize(), origin.y + this.y + 5*grid.getGridSize()],
		[origin.x + this.x, origin.y + this.y + 7*grid.getGridSize(), origin.x + this.x - grid.getGridSize(), origin.y + this.y + 7*grid.getGridSize()]

	];
	return dimens;
}
SevenSeg.prototype.updateNodes = function() {
	this.nodes[0].x = origin.x + this.x - grid.getGridSize();
	this.nodes[0].y = origin.y + this.y + 7*grid.getGridSize(); // bottom (LSB)

	this.nodes[1].x = origin.x + this.x - grid.getGridSize();
	this.nodes[1].y = origin.y + this.y + 5*grid.getGridSize();

	this.nodes[2].x = origin.x + this.x - grid.getGridSize();
	this.nodes[2].y = origin.y + this.y + 3*grid.getGridSize();

	this.nodes[3].x = origin.x + this.x - grid.getGridSize();
	this.nodes[3].y = origin.y + this.y + grid.getGridSize(); // top (MSB)
}
SevenSeg.prototype.updateOutput = function() {
	if (!this.nodes[0].state && !this.nodes[1].state && !this.nodes[2].state && !this.nodes[3].state) this.output = "0";
	else if (this.nodes[0].state && !this.nodes[1].state && !this.nodes[2].state && !this.nodes[3].state) this.output = "1";
	else if (!this.nodes[0].state && this.nodes[1].state && !this.nodes[2].state && !this.nodes[3].state) this.output = "2";
	else if (this.nodes[0].state && this.nodes[1].state && !this.nodes[2].state && !this.nodes[3].state) this.output = "3";
	else if (!this.nodes[0].state && !this.nodes[1].state && this.nodes[2].state && !this.nodes[3].state) this.output = "4";
	else if (this.nodes[0].state && !this.nodes[1].state && this.nodes[2].state && !this.nodes[3].state) this.output = "5";
	else if (!this.nodes[0].state && this.nodes[1].state && this.nodes[2].state && !this.nodes[3].state) this.output = "6";
	else if (this.nodes[0].state && this.nodes[1].state && this.nodes[2].state && !this.nodes[3].state) this.output = "7";
	else if (!this.nodes[0].state && !this.nodes[1].state && !this.nodes[2].state && this.nodes[3].state) this.output = "8";
	else if (this.nodes[0].state && !this.nodes[1].state && !this.nodes[2].state && this.nodes[3].state) this.output = "9";
	else if (!this.nodes[0].state && this.nodes[1].state && !this.nodes[2].state && this.nodes[3].state) this.output = "A";
	else if (this.nodes[0].state && this.nodes[1].state && !this.nodes[2].state && this.nodes[3].state) this.output = "B";
	else if (!this.nodes[0].state && !this.nodes[1].state && this.nodes[2].state && this.nodes[3].state) this.output = "C";
	else if (this.nodes[0].state && !this.nodes[1].state && this.nodes[2].state && this.nodes[3].state) this.output = "D";
	else if (!this.nodes[0].state && this.nodes[1].state && this.nodes[2].state && this.nodes[3].state) this.output = "E";
	else if (this.nodes[0].state && this.nodes[1].state && this.nodes[2].state && this.nodes[3].state) this.output = "F";
}

var Vcc = function(x, y) {
	Vcc.super_.call(this, x, y);

	this.nodes.push(new Node(origin.x + x + grid.getGridSize(), origin.y + y + 2*grid.getGridSize(), OUT));
	this.nodes.state = true;
}
inherits(Vcc, IO);
Vcc.prototype.getHitBoxVerts = function() {
	let topLeft = new Point(origin.x + this.x + 0.5*grid.getGridSize(), origin.y + this.y + 0.5*grid.getGridSize());
	let bottomRight = new Point(origin.x + this.x + 1.5*grid.getGridSize(), origin.y + this.y + 2*grid.getGridSize());
	return [topLeft, bottomRight];
}
Vcc.prototype.getDrawingDimens = function() {
	let dimens = [
		//body
		[origin.x + this.x + grid.getGridSize(), origin.y + this.y + 0.5*grid.getGridSize(), origin.x + this.x + 0.5*grid.getGridSize(), origin.y + this.y + grid.getGridSize()],
		[origin.x + this.x + 0.5*grid.getGridSize(), origin.y + this.y + grid.getGridSize(), origin.x + this.x + 1.5*grid.getGridSize(), origin.y + this.y + grid.getGridSize()],
		[origin.x + this.x + 1.5*grid.getGridSize(), origin.y + this.y + grid.getGridSize(), origin.x + this.x + grid.getGridSize(), origin.y + this.y + 0.5*grid.getGridSize()],
		// node
		[origin.x + this.x + grid.getGridSize(), origin.y + this.y + grid.getGridSize(), origin.x + this.x + grid.getGridSize(), origin.y + this.y + 2*grid.getGridSize()]
	];
	return dimens;
}
Vcc.prototype.updateNodes = function() {
	this.nodes[0].x = origin.x + this.x + grid.getGridSize();
	this.nodes[0].y = origin.y + this.y + 2*grid.getGridSize();
}
Vcc.prototype.updateOutput = function() {
	this.nodes[0].state = true;
}

// Ground
var Gnd = function(x, y) {
	Gnd.super_.call(this, x, y);

	this.nodes.push(new Node(origin.x + x + grid.getGridSize(), origin.y + y, OUT));
	this.nodes[0].state = false;
}
inherits(Gnd, IO);
Gnd.prototype.getHitBoxVerts = function() {
	let topLeft = new Point(origin.x + this.x + 0.5*grid.getGridSize(), origin.y + this.y);
	let bottomRight = new Point(origin.x + this.x + 1.5*grid.getGridSize(), origin.y + this.y + 1.5*grid.getGridSize());
	return [topLeft, bottomRight];
}
Gnd.prototype.getDrawingDimens = function() {
	let dimens = [
		// body
		[origin.x + this.x + 0.5*grid.getGridSize(), origin.y + this.y + grid.getGridSize(), origin.x + this.x + 1.5*grid.getGridSize(), origin.y + this.y + grid.getGridSize()],
		[origin.x + this.x + 0.7*grid.getGridSize(), origin.y + this.y + 1.25*grid.getGridSize(), origin.x + this.x + 1.3*grid.getGridSize(), origin.y + this.y + 1.25*grid.getGridSize()],
		[origin.x + this.x + 0.9*grid.getGridSize(), origin.y + this.y + 1.5*grid.getGridSize(), origin.x + this.x + 1.1*grid.getGridSize(), origin.y + this.y + 1.5*grid.getGridSize()],
		// node
		[origin.x + this.x + grid.getGridSize(), origin.y + this.y, origin.x + this.x + grid.getGridSize(), origin.y + this.y + grid.getGridSize()]
	];
	return dimens;
}
Gnd.prototype.updateNodes = function() {
	this.nodes[0].x = origin.x + this.x + grid.getGridSize();
	this.nodes[0].y = origin.y + this.y;
}
Gnd.prototype.updateOutput = function() {
	this.nodes[0].state = false;
}

// Clock
var Clock = function(x, y) {
	Clock.super_.call(this, x, y);
	this.nodes.push(new Node(origin.x + this.x + 5*grid.getGridSize(), origin.y + this.y + 2*grid.getGridSize(), OUT)); // TODO
	this.timer = 1000; // milliseconds - fasted scaled safe = 100ms
}
inherits(Clock, IO);
Clock.prototype.getHitBoxVerts = function() {
	let topLeft = new Point(origin.x + this.x, origin.y + this.y);
	let bottomRight = new Point(origin.x + this.x + 5*grid.getGridSize(), origin.y + this.y + 4*grid.getGridSize());
	return [topLeft, bottomRight];
}
Clock.prototype.getDrawingDimens = function() {
	let dimens = [
		// body
		[origin.x + this.x, origin.y + this.y, origin.x + this.x + 4*grid.getGridSize(), origin.y + this.y],
		[origin.x + this.x + 4*grid.getGridSize(), origin.y + this.y, origin.x + this.x + 4*grid.getGridSize(), origin.y + this.y + 4*grid.getGridSize()],
		[origin.x + this.x + 4*grid.getGridSize(), origin.y + this.y + 4*grid.getGridSize(), origin.x + this.x, origin.y + this.y + 4*grid.getGridSize()],
		[origin.x + this.x, origin.y + this.y + 4*grid.getGridSize(), origin.x + this.x, origin.y + this.y],
		// inner drawing
		[origin.x + this.x + grid.getGridSize(), origin.y + this.y + 1.25*grid.getGridSize(), origin.x + this.x + 2*grid.getGridSize(), origin.y + this.y + 1.25*grid.getGridSize()],
		[origin.x + this.x + 2*grid.getGridSize(), origin.y + this.y + 1.25*grid.getGridSize(), origin.x + this.x + 2*grid.getGridSize(), origin.y + this.y + 2.75*grid.getGridSize()],
		[origin.x + this.x + 2*grid.getGridSize(), origin.y + this.y + 2.75*grid.getGridSize(), origin.x + this.x + 3*grid.getGridSize(), origin.y + this.y + 2.75*grid.getGridSize()],
		// timer
		[this.timer + "ms", origin.x + this.x + 2*grid.getGridSize(), origin.y + this.y + 3.5*grid.getGridSize()],
		// node
		[origin.x + this.x + 4*grid.getGridSize(), origin.y + this.y + 2*grid.getGridSize(), origin.x + this.x + 5*grid.getGridSize(), origin.y + this.y + 2*grid.getGridSize()]
	];
	return dimens;
}
Clock.prototype.updateNodes = function() {
	this.nodes[0].x = origin.x + this.x + 5*grid.getGridSize();
	this.nodes[0].y = origin.y + this.y + 2*grid.getGridSize();
}
Clock.prototype.updateOutput = function() {
	let toggle = counter.checkTime(millis(), this.timer/2);
	if (toggle) this.nodes[0].state = !this.nodes[0].state;
}

// Buffer
var SBuffer = function(x, y) {
	SBuffer.super_.call(this, x, y);

	this.nodes.push(new Node(origin.x + x - grid.getGridSize(), origin.y + y + grid.getGridSize(), IN));
	this.nodes.push(new Node(origin.x + x + 3*grid.getGridSize(), origin.y + y + grid.getGridSize(), OUT));

}
inherits(SBuffer, Component);
SBuffer.prototype.getHitBoxVerts = function() {
	let topLeft = new Point(origin.x + this.x - grid.getGridSize(), origin.y + this.y);
	let bottomRight = new Point(origin.x + this.x + 3*grid.getGridSize(), origin.y + this.y + 2*grid.getGridSize());
	return [topLeft, bottomRight];

}
SBuffer.prototype.getDrawingDimens = function() {
	let dimens = [
		// body
		[origin.x + this.x, origin.y + this.y, origin.x + 2*grid.getGridSize() + this.x, origin.y + grid.getGridSize() + this.y],
		[origin.x + this.x, origin.y + 2*grid.getGridSize()+ this.y, origin.x + 2*grid.getGridSize() + this.x, origin.y + grid.getGridSize() + this.y],
		[origin.x + this.x, origin.y + 2* grid.getGridSize() + this.y, origin.x + this.x, origin.y + this.y],
		// nodes
		[origin.x + this.x, origin.y + this.y + grid.getGridSize(), origin.x + this.x - grid.getGridSize(), origin.y + this.y + grid.getGridSize()],
		[origin.x + this.x + 2*grid.getGridSize(), origin.y + this.y + grid.getGridSize(), origin.x + this.x + 3*grid.getGridSize(), origin.y + this.y + grid.getGridSize()]
	];
	return dimens;
}
SBuffer.prototype.updateNodes = function() {
	this.nodes[0].x = origin.x + this.x - grid.getGridSize();
	this.nodes[0].y = origin.y + this.y + grid.getGridSize();

	this.nodes[1].x = origin.x + this.x + 3*grid.getGridSize(); 
	this.nodes[1].y = origin.y + this.y + grid.getGridSize();
}
SBuffer.prototype.updateOutput = function() {
	this.nodes[1].state = this.nodes[0].state;
}
