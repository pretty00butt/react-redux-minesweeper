import MineMapUtils from '../../utils/mineMap'

export const INIT_MAP = Symbol('INIT_MAP')
export const OPEN_BOXES = Symbol('OPEN_BOXES')
export const SET_FLAG = Symbol('SET_FLAG')

export const initMap = ({ rowSize = 0, colSize = 0, mineCount = 0 } = {}) => {
  const mapData = MineMapUtils.initMap({ rowSize, colSize, mineCount })

  return {
    type: INIT_MAP,
    ...mapData
  }
}

export const openBoxes = ({
  row = -1,
  col = -1,
  mineOpenMap = [],
  mineCountMap = []
}) => {
  const openedMineOpenMap = MineMapUtils.openBox({
    row,
    col,
    mineOpenMap,
    mineCountMap
  })

  return {
    type: OPEN_BOXES,
    mineOpenMap: openedMineOpenMap
  }
}

export const setFlag = ({
  row = -1,
  col = -1,
  mineOpenMap = [],
  mineFlagMap = [],
  currentMineCount = 0
}) => {
  const flaggedResult = MineMapUtils.setFlag({
    row,
    col,
    mineOpenMap,
    mineFlagMap,
    currentMineCount
  })

  return {
    type: SET_FLAG,
    mineFlagMap: flaggedResult.mineFlagMap,
    currentMineCount: flaggedResult.currentMineCount
  }
}
