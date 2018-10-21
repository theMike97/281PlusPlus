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
	this.x = x;
	this.y = y;
}
Component.prototype.setXY = function(x, y) {
	this.x = x;
	this.y = y;
}

/*
 * gates here
 */
// base gate (always has 2 inputs)
var Gate = function(x, y) {
	Gate.super_.call(this, x, y);
	
	const AND_GATE = 0;
	const OR_GATE = 1;
	const XOR_GATE = 2;

	this.origin = grid.getOrigin();
	this.gridSize = grid.getGridSize();

	this.nodeA = false;
    this.nodeB = false;
    this.out = false;
}
inherits(Gate, Component);
Gate.prototype.setInputNodes = function(nodeA, nodeB) {
	
	this.nodeA = nodeA;
    this.nodeB = nodeB;
}
Gate.prototype.isSelected = function(x, y) { // looks at mouse x/y to determine if mouse is hovering

}

// And Gate
var AndGate = function(x, y) {
	AndGate.super_.call(this, x, y);
}
inherits(AndGate, Gate);
AndGate.prototype.getOutput = function() {
	return this.nodeA && this.nodeB;
}
AndGate.prototype.getDrawingDimens = function() {
	let dimens = [
		[this.origin.x + this.x, this.origin.y + this.y, this.origin.x + this.x, this.origin.y + 4 * this.gridSize + this.y], // first line
		[this.origin.x + this.x, this.origin.y + this.y, this.origin.x + 2*this.gridSize + this.x, this.origin.y + this.y], // second line
		[this.origin.x + this.x, this.origin.y + 4*this.gridSize + this.y, this.origin.x + 2*this.gridSize + this.x, this.origin.y + 4*this.gridSize + this.y], // third line
		[this.origin.x + 2*this.gridSize + this.x, this.origin.y + 2*this.gridSize + this.y, 4*this.gridSize, 4*this.gridSize, -HALF_PI, HALF_PI], // arc
		[this.origin.x + this.x, this.origin.y + this.gridSize + this.y, this.origin.x - this.gridSize + this.x, this.origin.y + this.gridSize + this.y], // nodeA
		[this.origin.x + this.x, this.origin.y +3*this.gridSize + this.y, this.origin.x - this.gridSize + this.x, this.origin.y + 3*this.gridSize + this.y], // nodeB
		[this.origin.x + 4*this.gridSize + this.x, this.origin.y + 2*this.gridSize + this.y, this.origin.x + 5*this.gridSize + this.x, this.origin.y + 2*this.gridSize + this.y] // out
	];

	return dimens;
}

// Or Gate
var OrGate = function(x, y) {
	OrGate.super_.call(this, x, y);
}
inherits(OrGate, Gate);
OrGate.prototype.getOutput = function() {
	return this.nodeA || this.nodeB;
}
OrGate.prototype.getDrawingDimens = function() {
	let dimens = [
		[this.origin.x + this.x, this.origin.y + this.y,
		this.origin.x + 0.75*this.gridSize + this.x, this.origin.y + this.gridSize + this.y,
		this.origin.x + 0.75*this.gridSize + this.x, this.origin.y + 3*this.gridSize + this.y,
		this.origin.x + this.x, this.origin.y + 4*this.gridSize + this.y],
		[this.origin.x + this.x, this.origin.y + this.y, this.origin.x + 2*this.gridSize + this.x, this.origin.y + this.y],
		[this.origin.x + this.x, this.origin.y + 4*this.gridSize + this.y, this.origin.x + 2*this.gridSize + this.x, this.origin.y + 4*this.gridSize + this.y],
		[this.origin.x + 2*this.gridSize + this.x, this.origin.y + this.y, 
		this.origin.x + 3.8*this.gridSize + this.x, this.origin.y + this.y, 
		this.origin.x + 3.8*this.gridSize + this.x, this.origin.y + 1.8*this.gridSize + this.y, 
		this.origin.x + 4*this.gridSize + this.x, this.origin.y + 2*this.gridSize + this.y],
		[this.origin.x + this.x + 2*this.gridSize, this.origin.y + this.y + 4*this.gridSize, 
		this.origin.x + 3.8*this.gridSize + this.x, this.origin.y + 4*this.gridSize + this.y, 
		this.origin.x + 3.8*this.gridSize + this.x, this.origin.y + 2.2*this.gridSize + this.y, 
		this.origin.x + 4*this.gridSize + this.x, this.origin.y + 2*this.gridSize + this.y],
		[this.origin.x + 0.4*this.gridSize + this.x, this.origin.y + this.gridSize + this.y, this.origin.x - this.gridSize + this.x, this.origin.y + this.gridSize + this.y],
		[this.origin.x + 0.4*this.gridSize + this.x, this.origin.y +3*this.gridSize + this.y, this.origin.x - this.gridSize + this.x, this.origin.y + 3*this.gridSize + this.y],
		[this.origin.x + 4*this.gridSize + this.x, this.origin.y + 2*this.gridSize + this.y, this.origin.x + 5*this.gridSize + this.x, this.origin.y + 2*this.gridSize + this.y]
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
XorGate.prototype.getDrawingDimens = function() {

	let dimens = [
		[this.origin.x - 0.5*this.gridSize + this.x, this.origin.y + this.y,
		this.origin.x + 0.25*this.gridSize + this.x, this.origin.y + this.gridSize + this.y,
		this.origin.x + 0.25*this.gridSize + this.x, this.origin.y + 3*this.gridSize + this.y,
		this.origin.x + this.x - 0.5*this.gridSize, this.origin.y + 4*this.gridSize + this.y],
		[this.origin.x + this.x, this.origin.y + this.y,
		this.origin.x + 0.75*this.gridSize + this.x, this.origin.y + this.gridSize + this.y,
		this.origin.x + 0.75*this.gridSize + this.x, this.origin.y + 3*this.gridSize + this.y,
		this.origin.x + this.x, this.origin.y + 4*this.gridSize + this.y],
		[this.origin.x + this.x, this.origin.y + this.y, this.origin.x + 2*this.gridSize + this.x, this.origin.y + this.y],
		[this.origin.x + this.x, this.origin.y + 4*this.gridSize + this.y, this.origin.x + 2*this.gridSize + this.x, this.origin.y + 4*this.gridSize + this.y],
		[this.origin.x + 2*this.gridSize + this.x, this.origin.y + this.y, 
		this.origin.x + 3.8*this.gridSize + this.x, this.origin.y + this.y, 
		this.origin.x + 3.8*this.gridSize + this.x, this.origin.y + 1.8*this.gridSize + this.y, 
		this.origin.x + 4*this.gridSize + this.x, this.origin.y + 2*this.gridSize + this.y],
		[this.origin.x + this.x + 2*this.gridSize, this.origin.y + this.y + 4*this.gridSize, 
		this.origin.x + 3.8*this.gridSize + this.x, this.origin.y + 4*this.gridSize + this.y, 
		this.origin.x + 3.8*this.gridSize + this.x, this.origin.y + 2.2*this.gridSize + this.y, 
		this.origin.x + 4*this.gridSize + this.x, this.origin.y + 2*this.gridSize + this.y],
		[this.origin.x - 0.1*this.gridSize + this.x, this.origin.y + this.gridSize + this.y, this.origin.x - this.gridSize + this.x, this.origin.y + this.gridSize + this.y],
		[this.origin.x - 0.1*this.gridSize + this.x, this.origin.y +3*this.gridSize + this.y, this.origin.x - this.gridSize + this.x, this.origin.y + 3*this.gridSize + this.y],
		[this.origin.x + 4*this.gridSize + this.x, this.origin.y + 2*this.gridSize + this.y, this.origin.x + 5*this.gridSize + this.x, this.origin.y + 2*this.gridSize + this.y]
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
// NandGate.prototype.getDrawingDimens = function() {
	
// }

// Nor Gate
var NorGate = function(x, y) {
	NorGate.super_.call(this, x, y);
}
inherits(NorGate, Gate);
NorGate.prototype.getOutput = function() {
	return !(this.nodeA || this.nodeB);
}
// NorGate.prototype.getDrawingDimens = function() {
	
// }

// Xnor Gate
var XnorGate = function(x, y) {
	XnorGate.super_.call(this, x, y);
}
inherits(XnorGate, Gate);
XnorGate.prototype.getOutput = function() {
	return !(this.nodeA ? !this.nodeB : this.nodeB);
}
// XnorGate.prototype.getDrawingDimens = function() {
	
// }

/*
 * other components here
 */