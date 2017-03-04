import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers/rootReducer';
import {persistStore, autoRehydrate} from 'redux-persist';

export default function configureStore(initialState : any = undefined) {
  const logger = createLogger();

  const enhancer = __DEV__ ? compose(autoRehydrate(), applyMiddleware(thunk, logger)) : compose(autoRehydrate(), applyMiddleware(thunk));  
  return createStore(rootReducer, initialState, enhancer);
}