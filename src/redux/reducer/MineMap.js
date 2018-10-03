import { INIT_MAP, OPEN_BOXES, SET_FLAG } from '../actions/MineMap'

// Actions
export const initialState = {
  totalMineCount: 0,
  currentMineCount: 0,
  mineMap: [],
  mineCountMap: [],
  mineOpenMap: [],
  mineFlagMap: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case INIT_MAP:
      return {
        ...state,
        totalMineCount: action.totalMineCount,
        currentMineCount: action.currentMineCount,
        mineMap: action.mineMap,
        mineCountMap: action.mineCountMap,
        mineOpenMap: action.mineOpenMap,
        mineFlagMap: action.mineFlagMap
      }
    case OPEN_BOXES:
      return {
        ...state,
        mineOpenMap: action.mineOpenMap
      }
    case SET_FLAG:
      return {
        ...state,
        mineFlagMap: action.mineFlagMap,
        currentMineCount: action.currentMineCount
      }
    default:
      return state
  }
}
