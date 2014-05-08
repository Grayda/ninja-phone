var Device = require('./lib/device')
  , util = require('util')
  , stream = require('stream')
  , configHandlers = require('./lib/config-handlers');


// Give our driver a stream interface
util.inherits(myDriver,stream);

// Our greeting to the user.
var DRIVER_INSTALLED = {
  "contents": [
    { "type": "heading",      "text": "Ninja Phone driver loaded!" },
    { "type": "paragraph",    "text": "If you haven't done so already, please plug in your USB modem" }
  ]
};

/**
 * Called when our client starts up
 * @constructor
 *
 * @param  {Object} opts Saved/default driver configuration
 * @param  {Object} app  The app event emitter
 * @param  {String} app.id The client serial number
 *
 * @property  {Function} save When called will save the contents of `opts`
 * @property  {Function} config Will be called when config data is received from the Ninja Platform
 *
 * @fires register - Emit this when you wish to register a device (see Device)
 * @fires config - Emit this when you wish to send config data back to the Ninja Platform
 */
function myDriver(opts,app) {

  var self = this;

  app.on('client::up',function(){

    // The client is now connected to the Ninja Platform

    // Check if we have sent an announcement before.
    // If not, send one and save the fact that we have.
    if (!opts.hasSentAnnouncement) {
      self.emit('announcement',DRIVER_INSTALLED);
      opts.hasSentAnnouncement = true;
      self.save();
    }

    // Register a device
    self.emit('register', new Device());
	device.emit('data', '');
  });
};

// Export it
module.exports = myDriver;