import 'make-promises-safe';
import express from 'express';
import chalk from 'chalk';
import hpp from 'hpp';
import helmet from 'helmet';
import compression from 'compression';
import { httpLogger, errorHandler } from './middleware';
import { env, paths } from '../utils';

const app = express();

// could add more middleware here where applicable
app.use(httpLogger());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(hpp());
app.use(compression());
app.use(express.static(paths.build));
app.get('/favicon.ico', (req, res) => res.status(204));

// use webpack compiler for development
// otherwise, use built server renderer instead
if (env.isDev) {
  const webpackCompiler = require('../bundler/webpack.compiler').default;
  app.use(webpackCompiler(() => runHttpServer()));
} else {
  const serverRenderer = require('../build/serverRenderer').default;
  app.use(serverRenderer());
  app.use(errorHandler());
  runHttpServer();
}

// running app http server
function runHttpServer() {
  const PORT = parseInt(process.env.PORT, 10) || 3000;
  app
    .listen(PORT, () => {
      console.info(chalk.cyan(`App server is listening PORT: ${PORT}`));
    })
    .on('error', err => {
      console.error(chalk.red(err.message));
      process.exit(-1);
    });
}
