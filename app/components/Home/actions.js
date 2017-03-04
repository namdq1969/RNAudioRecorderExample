import * as actionTypes from '../../actionTypes';
import {getComponent} from '../../reducers/rootReducer';
import {Actions} from 'react-native-router-flux';
import thunk from 'redux-thunk';
import moment from 'moment';
import rnFS from 'react-native-fs';

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
      path: path
    }
    
    rnFS.unlink(path).then(() => {
      console.log('FILE DELETED');
    }).catch((err) => {
      console.log(err.message);
    });

    dispatch({type: actionTypes.DELETE_RECORD, payload: record})
  }
}