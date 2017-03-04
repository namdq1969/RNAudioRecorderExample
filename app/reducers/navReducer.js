import {ActionConst} from 'react-native-router-flux';
import {REHYDRATE} from 'redux-persist/constants'
import * as actionTypes from '../actionTypes';

const DEFAULT_STATE = {
  scene: {},
  rehydrated: false
}

export default function reducer(state = DEFAULT_STATE, action = {}) {
  switch (action.type) {
    case ActionConst.FOCUS:
      {
        return {
          ...state,
          scene: action.scene
        }
        break
      }
    case REHYDRATE:
      {
        return {
          ...state,
          rehydrated: true
        }
        break;
      }
    default:
      return state
  }
}

export const getNav = (state) => ({scene: state.scene, rehydrated: state.rehydrated})
