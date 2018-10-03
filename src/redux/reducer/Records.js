import { GET_RECORDS } from '../actions/Records'

// Actions
export const initialState = {
  records: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_RECORDS:
      return {
        ...state,
        records: action.records
      }
    default:
      return state
  }
}
