// workspace.js
var grid = null;

var componentList = [];

var COMPONENT = -1;

// component.js
var COMPONENT_SELECTED = false;

const SELECT = -1;
const NOT_GATE = 0;
const AND_GATE = 1;
const OR_GATE = 2;
const XOR_GATE = 3;
const NAND_GATE = 4;
const NOR_GATE = 5;
const XNOR_GATE = 6;
const INPUT_IO = 7;
const LED_IO = 8;
const SEG_7_IO = 9;

// grid.js
var mousePt = null;
var origin = null;
var panSelected = false;