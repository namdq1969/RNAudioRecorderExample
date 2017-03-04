import * as actionTypes from '../../actionTypes';
import {getComponent} from '../../reducers/rootReducer';
import {Actions} from 'react-native-router-flux';
import thunk from 'redux-thunk';
import moment from 'moment';

export const addTempData = () => {
  return (dispatch) => {
    let record = {
      title: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
      path: 'asdasd',
      createdAt: moment().format()
    }
    dispatch({type: actionTypes.SAVE_RECORD, payload: record})
  }
}