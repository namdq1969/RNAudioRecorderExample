import * as actionTypes from '../actionTypes';

const DEFAULT_STATE = {
  recordList: []
}

export default function(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case actionTypes.SAVE_RECORD: {
      return {
        ...state,
        recordList: [...state.recordList, action.payload]
      }
      break;
    }
    case actionTypes.DELETE_RECORD: {
      return {
        ...state,
        recordList: state.recordList.filter(record => record.path !== action.payload.path)
      }
    }
    default:
      return state
  }
}

export const getComponent = (state) => ({recordList: state.recordList})
