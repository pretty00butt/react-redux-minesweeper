import {
  INIT_GAME,
  START_GAME,
  UPDATE_RECORD,
  UPDATE_GAME_STATUS
} from '../actions/GameStatus'

// Actions
export const initialState = {
  record: 0,
  isGameOver: false,
  isGameCleared: false,
  isGamePlaying: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case INIT_GAME:
      return {
        ...state,
        record: action.record,
        isGameOver: action.isGameOver,
        isGameCleared: action.isGameClear,
        isGamePlaying: action.isGamePlaying
      }
    case START_GAME:
      return {
        ...state,
        isGamePlaying: action.isGamePlaying
      }
    case UPDATE_RECORD:
      return {
        ...state,
        record: action.record
      }
    case UPDATE_GAME_STATUS:
      return {
        ...state,
        isGamePlaying: action.isGamePlaying,
        isGameOver: action.isGameOver,
        isGameCleared: action.isGameCleared
      }
    default:
      return state
  }
}
