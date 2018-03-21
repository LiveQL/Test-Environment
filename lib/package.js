'use strict';

// Object with get and set methods.
var liveqlConfig = require('./liveql/liveqlConfig');

// Function that sets up LiveQL server.
var liveqlServer = require('./liveql/liveqlServer');

// Express middleware that processes incoming queries.
var liveqlProcess = require('./liveql/liveqlProcess');

// Live resolver function.
var liveqlResolver = require('./liveql/liveqlResolver');

// Client functions.
var liveqlClient = require('./liveql/liveqlClient');

// Server socket setup function.

var _require = require('./liveql/liveqlSocket'),
    liveqlSocket = _require.liveqlSocket;

module.exports = { liveqlConfig: liveqlConfig, liveqlServer: liveqlServer, liveqlProcess: liveqlProcess, liveqlResolver: liveqlResolver, liveqlClient: liveqlClient, liveqlSocket: liveqlSocket };