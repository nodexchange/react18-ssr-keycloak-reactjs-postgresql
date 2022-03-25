var express = require('express');
var app = express();

var session = require('express-session');
var memoryStore = new session.MemoryStore();

app.use(
  session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
  })
);

const { initKeycloak, main } = require('./keycloak.js');
const keycloak = initKeycloak(memoryStore);
var router = require('./router.js');

app.use(
  session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
  })
);

app.use(keycloak.middleware());

app.use('/test', router);
app.get('/', function (req, res) {
  main();
  res.send('Server is up!');
});

app.listen(3000);
