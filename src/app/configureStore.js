import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { DEV } from '@config';
import {
  errorActionCreator,
  infoActionCreator,
  successActionCreator,
  serviceAlert
} from '@middlewares/redux';
import rootReducer from './rootReducer';

export default function configureStore(preloadedState = {}) {
  const middlewares = [
    // register serivce action creators for dispatch
    // so it's accessible in respective thunk wrappers
    thunk.withExtraArgument({
      errorActionCreator,
      infoActionCreator,
      successActionCreator
    }),
    serviceAlert()
  ];

  if (DEV) {
    middlewares.push(createLogger({ duration: true }));
  }

  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(...middlewares)
  );

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      const { nextRootReducer } = require('./rootReducer');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}