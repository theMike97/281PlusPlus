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
	
	var AND_GATE = 0;
	var OR_GATE = 1;

	this.nodeA = false;
    this.nodeB = false;
    this.out = false;
}
inherits(Gate, Component);
Gate.prototype.setInputNodes = function(nodeA, nodeB) {
	this.nodeA = nodeA;
    this.nodeB = nodeB;
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
		[grid.getOrigin().x + this.x, grid.getOrigin().y + this.y,
		grid.getOrigin().x + 0.75*grid.getGridSize() + this.x, grid.getOrigin().y + grid.getGridSize() + this.y,
		grid.getOrigin().x + 0.75*grid.getGridSize() + this.x, grid.getOrigin().y + 3*grid.getGridSize() + this.y,
		grid.getOrigin().x + this.x, grid.getOrigin().y + 4*grid.getGridSize() + this.y],
		[grid.getOrigin().x + this.x, grid.getOrigin().y + this.y, grid.getOrigin().x + 2*grid.getGridSize() + this.x, grid.getOrigin().y + this.y],
		[grid.getOrigin().x + this.x, grid.getOrigin().y + 4*grid.getGridSize() + this.y, grid.getOrigin().x + 2*grid.getGridSize() + this.x, grid.getOrigin().y + 4*grid.getGridSize() + this.y],
		[grid.getOrigin().x + 2*grid.getGridSize() + this.x, grid.getOrigin().y + this.y, 
		grid.getOrigin().x + 3.8*grid.getGridSize() + this.x, grid.getOrigin().y + this.y, 
		grid.getOrigin().x + 3.8*grid.getGridSize() + this.x, grid.getOrigin().y + 1.8*grid.getGridSize() + this.y, 
		grid.getOrigin().x + 4*grid.getGridSize() + this.x, grid.getOrigin().y + 2*grid.getGridSize() + this.y],
		[grid.getOrigin().x + this.x + 2*grid.getGridSize(), grid.getOrigin().y + this.y + 4*grid.getGridSize(), 
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
// XorGate.prototype.getDrawingDimens = function() {
	
// }

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