var workspace;

function setup() {
	const canvasdiv = select("#workspacediv");

	var canvas = createCanvas(canvasdiv.width,canvasdiv.height);
	canvas.parent("workspacediv");
	workspace = new Workspace();
}

function draw() {
	background(220);

  //...drawing code...
}

function Workspace() {

}