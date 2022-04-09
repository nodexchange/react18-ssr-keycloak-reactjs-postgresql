import express from 'express';
import hpp from 'hpp';
import helmet from 'helmet';
import compression from 'compression';
import favicon from 'serve-favicon';
import session from 'express-session';
import path from 'path';
import cors from 'cors';

import runHttpServer from './server';
import { initKeycloak, authenticate, httpLogger } from './middleware';
import { env, paths } from '../utils';

const app = express();
const router = express.Router();

const memoryStore = new session.MemoryStore();

app.use(
  session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
  })
);

const keycloak = initKeycloak(memoryStore);

// Enable CORS support
app.use(cors());

// could add more middleware here where applicable
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(httpLogger());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(hpp());
app.use(compression());
app.use(keycloak.middleware());
/* API Routes */
router.get('/anonymous', function (req, res) {
  res.send('Hello Anonymous');
});

router.get('/login', function (req, res) {
  // res.send('Hello Anonymous');
  res.sendFile(path.join(__dirname + '/static/login.html'));
});

router.get('/client', keycloak.protect('client'), function (req, res) {
  res.send('Hello Client');
});

router.post('/auth', async (request, response) => {
  // Capture the input fields
  let username = request.body.username;
  let password = request.body.password;
  // Ensure the input fields exists and are not empty
  if (username && password) {
    // Execute SQL query that'll select the account from the database based on the specified username and password
    const result = await authenticate(username, password);
    // If there is an issue with the query, output the error
    // If the account exists
    if (result.access_token) {
      // Authenticate the user
      request.session.loggedin = true;
      request.session.username = username;
      // Redirect to home page
      response.redirect('/test/home');
    } else {
      console.log('incorrect');
      const message = encodeURIComponent('login-error');
      response.redirect('/test/login?message=' + message);
      // response.send('Incorrect Username and/or Password!'); // error page redirect
    }
    response.end();
  } else {
    console.log('error');
    const message = encodeURIComponent('credentials-error');
    response.redirect('/test/login?message=' + message);
  }
});
router.get('/home', function (request, response) {
  // If the user is loggedin
  if (request.session.loggedin) {
    // Output username
    response.send('Welcome back ' + request.session.username + '!');
  } else {
    // Not logged in
    response.send('Please login to view this page!');
  }
  response.end();
});
app.use('/test', router);

// serve static files
app.use(express.static(paths.build));
app.use('/icons', express.static(paths.icons));
app.use(favicon(`${paths.icons}/favicon.ico`));

// use webpack compiler for development
// otherwise, use built server side renderer instead
if (env.isDev) {
  const { default: webpackCompiler } = require('../bundler/webpack.compiler');
  app.use(webpackCompiler(() => runHttpServer(app)));
} else {
  const { default: serverRenderer } = require('../build/serverRenderer');
  app.use(serverRenderer());
  runHttpServer(app);
}
