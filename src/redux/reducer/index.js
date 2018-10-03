import { combineReducers } from 'redux'

import GameStatus from './GameStatus'
import MineMap from './MineMap'
import Records from './Records'

export default combineReducers({
  GameStatus,
  MineMap,
  Records
})
