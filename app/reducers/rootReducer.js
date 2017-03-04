import {combineReducers} from 'redux';
import nav, * as fromNav from './navReducer';
import component, * as fromComponent from './componentReducer';

export default combineReducers({nav, component})
export const getNav = (state) => fromNav.getNav(state.nav);
export const getComponent = (state) => fromComponent.getComponent(state.component);
