const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');

const liveql = require('./lib/package');

const schema = require('./schema');

const app = express();

app.use(bodyParser.json());

// bodyParser is needed just for POST.
app.use('/graphql', liveql.process, liveql.server({ schema }));
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(5000);
console.log('Listening on port 5000');
