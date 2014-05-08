var stream = require('stream')
  , util = require('util')
  , serial = require('serialport'); // To access the modem

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

  var serialPort = new serial("/dev/ttyACM0", { // /dev/ttyACM0 is the serial portion of our modem
    baudrate: 9600,
    callback: function(error) { console.log("Connection opened"); } // callback is called when our connection is opened
  });
  
  var self = this;

  // This device will emit data
  this.readable = true;
  // This device can not be actuated
  this.writeable = false;

  this.G = "0"; // G is a string a represents the channel
  this.V = 0; // 0 is Ninja Blocks' device list
  this.D = 530; // 530 is Incoming Network Activity. Might need to change this?

  // NOTE: When the phone rings (that is, makes the brrrr brrr noise in your ear followed by short silence), your modem will show RING, meaning
  // that if you don't pick up the phone right away, your log will have multiple RINGs in it, so we need to test for that and ignore it momentarily to avoid emitting 4-5 lots of data with one call
  serialPort.on('data', function(data) { // When data has been received
    if(data = "RING") { // If our data is "RING" (meaning the phone is ringing
		self.emit('data','RING'); // Emit the data
	}
  });
};

