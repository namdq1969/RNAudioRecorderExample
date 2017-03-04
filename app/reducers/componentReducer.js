import * as actionTypes from '../actionTypes';

const DEFAULT_STATE = {
  recordList: [{
    title: undefined,
    path: undefined,
    createdAt: undefined
  }]
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
    default:
      return state
  }
}

export const getComponent = (state) => ({recordList: state.recordList})
