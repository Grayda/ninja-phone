var stream = require('stream')
  , util = require('util');

var SerialPort = require("serialport").SerialPort // Require our serial port library
var serialPort = new SerialPort("/dev/ttyACM0", { // ttyACM0 is our USB serial. You might need to change this if it doesn't work for you. Might make it settable in the options later.
  baudrate: 9600 // The speed at which we'll talk to our modem. 
}, false); // False means we won't open the device right away. We'll wait until the Device() function before we do that to give us time to be properly initialized


// Give our device a stream interface
util.inherits(Device,stream);

// This line makes the function Device available to the Ninja client. You could technically call require('device.js').Device(); and have the function called Device run
module.exports=Device;

/**
 * Creates a new Device Object
 *
 * @property {Boolean} readable Whether the device emits data
 * @property {Boolean} writable Whether the data can be actuated
 *
 * @property {Number} G - the channel of this device
 * @property {Number} V - the vendor ID of this device
 * @property {Number} D - the device ID of this device
 *
 * @property {Function} write Called when data is received from the Ninja Platform
 *
 * @fires data - Emit this when you wish to send data to the Ninja Platform
 */
function Device() {


  this.serialPort = serialPort;
  // This device will emit data
  this.readable = true;
  // This device can be actuated
  this.writeable = true;

  this.G = "phone"; // G is a string a represents the channel
  this.V = 0; // 0 is Ninja Blocks' device list
  this.D = 205; // 205 is a sensor_switch device. Might need to change this later
  this.name = "Home Phone"; // The name that actually appears in the dashboard

 var self = this;
 this.serialPort.open(function() { // We're opening the port. The only parameter of "open" is a function that is run when the port is opened. In this case, we use this to set up Caller ID etc.
  	// The next few "write" lines of code initilize Caller ID. This code can vary between modems. On mine, it's AT+VCID=1. Usually, it's AT#CID=1. If these two don't work (i.e. if node test.js
	// shows nothing and you've got Caller ID enabled, try replacing the code below with one of the other ones
	
	// AT#CID=1
	// AT#CLS=8#CID=1
	// AT#CID=2
	// AT%CCID=1
	// AT%CCID=2
	// AT+VCID=1
	// AT#CC1
	// AT*ID1
	
	serialPort.write("ATZ"); // "reset" our modem
  	serialPort.write("AT#CID=1"); // This string tells the modem to enable Caller ID. This is the most common code used to initialize Caller ID. If it doesn't work, replace it with one of the ones above
  	serialPort.write("AT+VCID=1"); // This is the string required for Caller ID on my modem. You should be able to 'blast' all the strings to the modem and have it work but for neatness, we won't.
  	console.log('Port opened and Caller ID support switched on');
 });
 
 this.serialPort.on('data', function(data) { // When data is received from the modem

	 res = parseData(data.toString()); // the parseData function takes our raw data, finds out what's in it, and returns the relevant information (e.g. RING status or caller ID)
	 console.log("Data recived: " + util.inspect(res));
	 
	 if(res.data == "NMBR") { // If the data is NMBR (which of course is the NuMBeR that is calling you), then emit that.
	   this.emit('data', res.nmbr);
	 } else if(res.data == "RING") { // Otherwise, emit true. 
		this.emit('data', true); 
	 }

 }.bind(this));

 this.serialPort.on('error', function(error) { console.log("There was an error. Error was: " + error); }); // If there's a non-fatal serial port error, output it here.
};

function parseData(data) { // Parses the incoming modem instructions (e.g. RING, NMBR etc.);
	console.log("Parsing data..");
	res = {};
	
	var nmbr = data.substring(data.indexOf("NMBR = "));
	nmbr = nmbr.substring(7, nmbr.lastIndexOf("\r"));
	
	data = data.toString().trim();
	
	if(data == "RING") {
		res.data = "RING";
		console.log("Data was RING");		
	} else if (nmbr != '') {
		res.data = "NMBR";
		res.nmbr = nmbr
		console.log("Caller ID info found. " + res.nmbr + " was the number extracted");
	} else {
		console.log("Data was nothing!");
	}
	
	console.log("Parsing done, returning " + util.inspect(res));
	return res;

}

/**
 * Called whenever there is data from the Ninja Platform
 * This is required if Device.writable = true
 *
 * @param  {String} data The data received
 */
Device.prototype.write = function(data) {

  // I'm being actuated with data!
  console.log(data);
};
