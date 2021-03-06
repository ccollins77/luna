/**
 * Redux store
 * */


import { createHashHistory } from 'history';
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';

const history = createHashHistory();

const configureStore = (initialState?: counterStateType) => {
  // Redux Configuration
  const middleware = [];
  const enhancers = [];

  // Logging Middleware
  const logger = createLogger({
    level: 'info',
    collapsed: true
  });

  // Skip redux logs in console during the tests
  if (process.env.NODE_ENV !== 'test') {
    middleware.push(logger);
  }

  // Create Store
  const store = createStore(
    rootReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  if (module.hot) {
    module.hot.accept('../reducers', () => store.replaceReducer(require('../reducers'))); // eslint-disable-line global-require
  }

  return store;
};

export default { configureStore, history };
