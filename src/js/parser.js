// Parser.js
//
// MUST BE SINGLE SPACE DILIMITED
// format:
// origin
// component x y 
// ...
// wire x y

loadString = function(string) { // 	TODO add more components
	// In strange case where string passed to parser.js is null, will load blank project and show alert
	if (string == null) {
		alert("Project returned as null - will load blank project.")
		return;
	}
	let instrs = string.split(";"); // instr is line by line array of stuff
	// console.log(instrs);

	let title = instrs[0];
	document.getElementById("title").value = title;

	// grid.gridSize = instrs[1];
	// redraw();

	for (let i = 1; i < instrs.length; i++) {
		let instr = instrs[i].split(" ");
		console.log(instr);

		let x0 = parseInt(instr[1]);
		let y0 = parseInt(instr[2]);

		if (!isNaN(x0) && !isNaN(y0)) {
			switch(instr[0]) {
				case "and":
					componentList.push(new AndGate(x0, y0));
					break;
				case "not":
					componentList.push(new NotGate(x0, y0));
					break;
				case "or":
					componentList.push(new OrGate(x0, y0));
					break;
				case "xor":
					componentList.push(new XorGate(x0, y0));
					break;
				case "nand":
					componentList.push(new NandGate(x0, y0));
					break;
				case "nor":
					componentList.push(new NorGate(x0, y0));
					break;
				case "xnor":
					componentList.push(new XnorGate(x0, y0));
					break;
				case "input":
					componentList.push(new Input(x0, y0));
					break;
				case "led":
					componentList.push(new Led(x0, y0));
					break;
				case "7seg":
					componentList.push(new SevenSeg(x0, y0));
					break;
				case "vcc":
					componentList.push(new Vcc(x0, y0));
					break;
				case "gnd":
					componentList.push(new Gnd(x0, y0));
					break;
				case "clk":
					let component = new Clock(x0, y0);
					component.timer = instr[3];
					componentList.push(component);
					break;
				case "wire":
					// console.log(componentList);
					let x1 = parseInt(instr[3], 10);
					let y1 = parseInt(instr[4], 10);

					console.log(x1 + ", " + y1);

					if (isNaN(x1) || isNaN(y1)) {
						alert("Error loading file!");
						componentList = [];
						wires = [];
						return;
					} 

					let node0 = new Node(0, 0);
					let node1 = new Node(0, 0);

					for (let i = 0; i < componentList.length; i++) {
						for (let j = 0; j < componentList[i].nodes.length; j++) {
							// check wire coords for corresponding node coords
							if (componentList[i].nodes[j].x == x0 && componentList[i].nodes[j].y == y0) {
								node0 = componentList[i].nodes[j];
								// console.log(node0);
							}
							if (componentList[i].nodes[j].x == x1 && componentList[i].nodes[j].y == y1) {
								node1 = componentList[i].nodes[j];
								// console.log(node1);
							}
						}
					}
					wires.push(new Wire(node0, node1));
					break;
				default:
					alert("Error loading file!");
					componentList = [];
					wires = [];
					return;
			}
		} else {
			alert("Error loading file!");
			componentList = [];
			wires = [];
			return;
		}
	}
	// console.log(componentList);
	// console.log(wires);
}

saveString = function() { // TODO add more components
	let returnString = document.getElementById("title").value;
	let title = returnString;
	returnString += ";";
	// returnString += ";" + grid.getGridSize() + ";";

	for (let i = 0; i < componentList.length; i++) {
		let component = componentList[i];

		if (component instanceof AndGate) returnString += "and " + component.x + " " + component.y + ";";
		else if (component instanceof NotGate) returnString += "not " + component.x + " " + component.y + ";";
		else if (component instanceof OrGate) returnString += "or " + component.x + " " + component.y + ";";
		else if (component instanceof XorGate) returnString += "xor " + component.x + " " + component.y + ";";
		else if (component instanceof NandGate) returnString += "nand " + component.x + " " + component.y + ";";
		else if (component instanceof NorGate) returnString += "nor " + component.x + " " + component.y + ";";
		else if (component instanceof XnorGate) returnString += "xnor " + component.x + " " + component.y + ";";
		else if (component instanceof Input) returnString += "input " + component.x + " " + component.y + ";";
		else if (component instanceof Led) returnString += "led " + component.x + " " + component.y + ";";
		else if (component instanceof SevenSeg) returnString += "7seg " + component.x + " " + component.y + ";";
		else if (component instanceof Vcc) returnString += "vcc " + component.x + " " + component.y + ";";
		else if (component instanceof Gnd) returnString += "gnd " + component.x + " " + component.y + ";";
		else if (component instanceof Clock) returnString += "clk " + component.x + " " + component.y + " " + component.timer + ";";
	}
	for (let i = 0; i < wires.length; i++) {
		let wire = wires[i];
		let x0 = wire.nodeA.x - origin.x;
		let y0 = wire.nodeA.y - origin.y;
		let x1 = wire.nodeB.x - origin.x;
		let y1 = wire.nodeB.y - origin.y;
		returnString += "wire " + x0 + " " + y0 + " " + x1 + " " + y1 + ";"
	}
	returnString = returnString.substring(0, returnString.length - 1);

	saveProject(title, returnString);
	console.log(returnString);
	
}