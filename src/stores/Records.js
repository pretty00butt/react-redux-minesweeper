import { ReduceStore } from "flux/utils"

import AppDispatcher from "../AppDispatcher"
import * as types from "../constants"

class RecordsStore extends ReduceStore {
  getInitialState() {
    return {
      records: []
    }
  }

  reduce(state, action) {
    switch (action.type) {
      case types.GET_RECORDS:
        return {
          ...state,
          records: action.records
        }
      default:
        return state
    }
  }
}

export default new RecordsStore(AppDispatcher)
