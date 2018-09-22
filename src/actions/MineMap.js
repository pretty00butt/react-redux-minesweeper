import AppDispatcher from "../AppDispatcher"
import * as types from "../constants"

export const initGame = ({ colSize = 0, rowSize = 0, mineCount = 0 } = {}) => {
  AppDispatcher.dispatch({
    type: types.INIT_GAME,
    colSize,
    rowSize,
    mineCount
  })
}

export const openBoxes = (mineOpenMap = []) => {
  AppDispatcher.dispatch({
    type: types.OPEN_BOXES,
    mineOpenMap
  })
}

export const checkFlag = ({ mineFlagMap = [], currentMineCount = 0 } = {}) => {
  AppDispatcher.dispatch({
    type: types.CHECK_FLAG,
    mineFlagMap,
    currentMineCount
  })
}
