import express from 'express';
import hpp from 'hpp';
import helmet from 'helmet';
import compression from 'compression';
import favicon from 'serve-favicon';
import session from 'express-session';
import cors from 'cors';

import runHttpServer from './server';
import { initKeycloak, httpLogger } from './middleware';
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
app.use(httpLogger());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(hpp());
app.use(compression());
app.use(keycloak.middleware());
/* routes */
router.get('/anonymous', function (req, res) {
  res.send('Hello Anonymous');
});

router.get('/client', keycloak.protect('client'), function (req, res) {
  res.send('Hello Client');
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
