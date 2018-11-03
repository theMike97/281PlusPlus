// wire.js
function Wire(startNode, endNode) {

	this.state = false;
	this.segments = []; // array of segments making up the wire
	this.nodeA = startNode;
	this.nodeB = endNode;

	this.updateState = function() {
		if (this.nodeA.direction == OUT) {
			this.state = this.nodeA.state;
			this.nodeB.state = this.state;
		} else {
			this.state = this.nodeB.state;
			this.nodeA.state = this.state;
		}

	}

	this.getDrawingDimens = function() {
		let dimens = [
			[this.nodeA.x, this.nodeA.y, this.nodeB.x, this.nodeB.y]
		];
		return dimens;
	}
}

// segment.js
function Segment(startPt, endPt) {

	this.startPt = startPt;
	this.endPt = endPt;

	this.getHitBoxVerts = function() {
		// TODO
	}

	this.getDrawingDimens = function() {
		let dimens = [
			[this.startPt.x, this.startPt.y, this.endPt.x, this.endPt.y]
		];
	}

}