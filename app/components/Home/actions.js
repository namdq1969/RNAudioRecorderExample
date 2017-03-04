import * as actionTypes from '../../actionTypes';
import {getComponent} from '../../reducers/rootReducer';
import {Actions} from 'react-native-router-flux';
import thunk from 'redux-thunk';
import moment from 'moment';

export const saveRecord = (path, duration) => {
  return (dispatch) => {
    let record = {
      title: moment().format("MMMM Do YYYY, h:mm:ss a"),
      path: path,
      duration: duration
    }
    dispatch({type: actionTypes.SAVE_RECORD, payload: record})
  }
}

export const deleteRecord = (path) => {
  return (dispatch) => {
    let record = {
      path: path,
    }
    dispatch({type: actionTypes.DELETE_RECORD, payload: record})
  }
}