// I have no idea what this file does. If anyone has any ideas, let me know or put in a pull request with more info

module.exports = [
    {
        name: 'Phone is ringing', // The description that (should) appear in the rules page
        deviceId: 205,
        data: [function() { return "true"; }],
		canSet: false,
    },
];