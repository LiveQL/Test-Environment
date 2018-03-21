const express = require('express');
const bodyParser = require('body-parser');
const { graphiqlExpress } = require('apollo-server-express');


// const { liveqlProcess, liveqlServer, liveqlSocket } = require('./lib/package');
const { liveqlProcess, liveqlServer, liveqlSocket } = require('liveql');

const schema = require('./schema');

const app = express();

// Server for WebSockets.
const server = require('http').createServer(app);
liveqlSocket(server, schema);

app.use(bodyParser.json());

// bodyParser is needed just for POST.

app.use('/graphql', liveqlProcess, liveqlServer({ schema }));
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(5000);

console.log('Listening on port 5000');
