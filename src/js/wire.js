// wire.js
function Wire(startNode, endNode) {

	this.state = false;
	this.segments = []; // array of segments making up the wire
	this.nodeA = startNode;
	this.nodeB = endNode;

	this.updateState = function() {
		if (this.nodeA.direction == OUT) {
			if (this.nodeB.direction == IN) {
				this.state = this.nodeA.state;
				this.nodeB.state = this.state;
			} else { 
				this.state = this.nodeA.state || this.nodeB.state;
				this.nodeA.state = this.state;
				this.nodeB.state = this.state;
			}
		} else if (this.nodeA.direction == IN) {
			if (this.nodeB.direction == OUT) {
				this.state = this.nodeB.state;
				this.nodeA.state = this.state;
			} else {
				this.state = this.nodeA.state || this.nodeB.state;
				this.nodeA.state = this.state;
				this.nodeB.state = this.state;	
			}
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

	// This will be helpful for selecting a wire segment to move around
	this.getHitBoxVerts = function() {
		// TODO
	}

	this.getDrawingDimens = function() {
		let dimens = [
			[this.startPt.x, this.startPt.y, this.endPt.x, this.endPt.y]
		];
	}

}