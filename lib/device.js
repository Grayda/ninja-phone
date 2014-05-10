var stream = require('stream')
  , util = require('util');

var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort("/dev/ttyACM0", {
  baudrate: 9600
}, false);


// Give our device a stream interface
util.inherits(Device,stream);

// Export it
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
  this.D = 310; // 2000 is a generic Ninja Blocks sandbox device
  this.name = "Home Phone";

  var self = this;
 this.serialPort.open(function() { console.log('Port opened'); });
 this.serialPort.on('data', function(data) {
    this.emit('data', data.toString().trim());
	console.log("Data received: " + data.toString().trim());
  }.bind(this));

 this.serialPort.on('error', function(error) { console.log("There was an error. Error was: " + error); });
};

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
