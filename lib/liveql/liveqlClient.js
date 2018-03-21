'use strict';

var _socket = require('socket.io-client');

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var liveClient = {};

//store of live socket handles.
//web socket on mount stuff
liveClient.handles = [];

liveClient.connect = function (endpoint) {
	liveClient.socket = _socket2.default.connect(endpoint);
	//invoking this for the developer right off the bat.
	liveClient.windowUnload();
};

liveClient.windowUnload = function () {
	window.addEventListener("beforeunload", function (event) {
		liveClient.socket.emit('unload', liveClient.handles);
	});
};

liveClient.on = function (socketHandler, callback) {
	if (!liveClient.handles.includes(socketHandler)) {
		liveClient.handles.push(socketHandler);
		liveClient.socket.on(socketHandler, function (data) {
			//the developer will pass in their callback for the data.
			callback(data);
		});
	}
};

module.exports = liveClient;