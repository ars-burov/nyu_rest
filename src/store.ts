import { createStore } from 'redux';
import { applyMiddleware } from 'redux';
import appReducer from './redux/reducer';
import thunkMiddleware from 'redux-thunk';
import { AppState } from './redux/state';

const middlewareEnhancer = applyMiddleware(thunkMiddleware);

const store = createStore<AppState, any, any, any>(
    appReducer,
    middlewareEnhancer
);

export default store;
