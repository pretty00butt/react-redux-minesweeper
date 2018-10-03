import MineMapUtils from '../../utils/mineMap'

export const INIT_GAME = Symbol('INIT_GAME')
export const START_GAME = Symbol('START_GAME')
export const UPDATE_RECORD = Symbol('UPDATE_RECORD')
export const UPDATE_GAME_STATUS = Symbol('UPDATE_GAME_STATUS')

export const initGame = () => {
  return {
    type: INIT_GAME,
    record: 0,
    isGameOver: false,
    isGameCleared: false,
    isGamePlaying: false
  }
}

export const startGame = record => {
  return {
    type: START_GAME,
    isGamePlaying: true
  }
}

export const updateRecord = record => {
  return {
    type: UPDATE_RECORD,
    record
  }
}

export const updateGameStatus = ({
  row = -1,
  col = -1,
  mineMap = [],
  mineOpenMap = [],
  isGamePlaying = true,
  isGameOver = false,
  isGameCleared = false
} = {}) => {
  // 1. Check Mine = Check if the game is over
  isGameOver = MineMapUtils.checkIsMine({
    row,
    col,
    mineMap
  })

  // 2. Check Whether the game is cleared
  isGameCleared = MineMapUtils.checkGameCleared({
    mineMap,
    mineOpenMap
  })

  if (isGameOver || isGameCleared) {
    isGamePlaying = false
  }

  return {
    type: UPDATE_GAME_STATUS,
    isGamePlaying,
    isGameOver,
    isGameCleared
  }
}
