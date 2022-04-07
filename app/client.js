/* global MODE */
import { createRoot, hydrateRoot } from 'react-dom/client';
import { loadableReady } from '@loadable/component';
import { createFrontloadState } from 'react-frontload';
import { BrowserRouter } from 'react-router-dom';

import { App } from './components';
import * as services from './services';

const frontloadState = createFrontloadState.client({
  context: { api: services },
  serverRenderedData: window.__UNIVERSSR_FRONTLOAD_DATA__
});

let root;
console.log('{}{} React 18 - mode {}{} ', MODE);
const container = document.getElementById('root');
const app = (
  <BrowserRouter>
    <App frontloadState={frontloadState} />
  </BrowserRouter>
);

if (MODE === 'development' && !root) {
  root = createRoot(container);
}

loadableReady(() => {
  if (MODE === 'development') {
    root.render(app);
    return;
  }
  hydrateRoot(container, app);
});

// temp fix for webpack 5
// @see: https://github.com/webpack-contrib/webpack-hot-middleware/issues/390
if (module.hot) {
  module.hot.accept();
}
