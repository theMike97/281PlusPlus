// workspace.js
var componentList = [];
var wires = [];

var COMPONENT = -1;
var selectionBox = null;

var stringToLoad = "";

// component.js
var COMPONENT_SELECTED = false;
var NODE_SELECTED = false;

// component constants
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
const VCC_IO = 10;
const GND_IO = 11;
const CLOCK_IO = 12;

const BUFF_CONN = 13
const TRI_CONN = 14;

const MUX21_MD = 15;
const MUX42_MD = 16;
const MUX83_MD = 17;
const DEC12_MD = 18;
const DEC24_MD = 19;
const DEC38_MD = 20;

// grid.js
var mousePt = null;
var origin = null;
var panSelected = false;

// node.js
const IN = 0;
const OUT = 1;
const BI = 2;