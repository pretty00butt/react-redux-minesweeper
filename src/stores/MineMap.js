import { ReduceStore } from "flux/utils"

import AppDispatcher from "../AppDispatcher"
import * as types from "../constants"

import { initGame } from "@/utils/minemap"

class MineMapStore extends ReduceStore {
  getInitialState() {
    return {
      totalMineCount: 0,
      currentMineCount: 0,
      mineMap: [],
      mineCountMap: [],
      mineOpenMap: [],
      mineFlagMap: []
    }
  }

  reduce(state, action) {
    switch (action.type) {
      case types.INIT_GAME:
        return {
          ...state,
          ...initGame(action.rowSize, action.colSize, action.mineCount)
        }
      case types.OPEN_BOXES:
        return {
          ...state,
          mineOpenMap: action.mineOpenMap
        }
      case types.CHECK_FLAG:
        return {
          ...state,
          mineFlagMap: action.mineFlagMap,
          currentMineCount: action.currentMineCount
        }
      default:
        return state
    }
  }
}

export default new MineMapStore(AppDispatcher)
