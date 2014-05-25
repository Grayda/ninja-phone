var configMessages = require('./config-messages');

/**
 * Called from the driver's config method when a
 * user wants to see a menu to configure the driver
 * @param  {Function} cb Callback to send a response back to the user
 */
exports.menu = function(cb) {

  cb(null, configMessages.menu);
};

/**
 * Called when a user clicks the 'Echo back to me'
 * button we sent in the menu request
 * @param  {Object}   params Parameter object
 * @param  {Function} cb     Callback to send back to the user
 */
exports.save_cid = function(params,cb) {

	this._opts.caller_id.push(params.caller_id);
	this.save();
	

	cb(null, {
		"contents": [
			{ "type": "paragraph", "text": "Caller ID setting saved!" },
			{ "type": "close"    , "name": "Close" }
		]
	});
};