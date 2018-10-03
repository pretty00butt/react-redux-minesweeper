const initMap = ({ rowSize = 0, colSize = 0, mineCount = 0 } = {}) => {
  const { mineMap, mineCountMap } = createRandomMineMap({
    rowSize,
    colSize,
    mineCount
  })

  return {
    totalMineCount: mineCount,
    currentMineCount: mineCount,
    mineMap,
    mineCountMap,
    mineOpenMap: createBlankMap(rowSize, colSize),
    mineFlagMap: createBlankMap(rowSize, colSize)
  }
}

const createBlankMap = (xSize, ySize) => {
  const map = []
  for (let i = 0; i < xSize; i++) {
    map.push([])
    for (let j = 0; j < ySize; j++) {
      map[i].push(0)
    }
  }
  return map
}

const createRandomMineMap = ({
  rowSize = 0,
  colSize = 0,
  mineCount = 0
} = {}) => {
  const mineMap = createBlankMap(rowSize, colSize)
  const mineCountMap = createBlankMap(rowSize, colSize)
  let currentMineCount = 0

  while (currentMineCount < mineCount) {
    const row = Math.floor(Math.random() * rowSize)
    const col = Math.floor(Math.random() * colSize)

    if (mineMap[row][col] !== 1) {
      mineMap[row][col] = 1
      currentMineCount++
    }
  }

  for (let i = 0; i < rowSize; i++) {
    for (let j = 0; j < colSize; j++) {
      const count = getMineCount({ row: i, col: j, mineMap })
      mineCountMap[i][j] = count
    }
  }

  return {
    mineMap,
    mineCountMap
  }
}

const openBox = ({
  row = -1,
  col = -1,
  mineOpenMap = [],
  mineCountMap = []
} = {}) => {
  validateMapData({ row, col, map: mineOpenMap })

  // Check row & col are out or range
  mineOpenMap[row][col] = 1
  if (mineCountMap[row][col] === 0) {
    const nearestBoxes = getNearestBoxes({
      row,
      col,
      rowSize: mineOpenMap.length,
      colSize: mineOpenMap[0].length
    })

    nearestBoxes.forEach(box => {
      if (mineOpenMap[box.row][box.col] === 0) {
        mineOpenMap = openBox({
          row: box.row,
          col: box.col,
          mineOpenMap,
          mineCountMap
        })
      }
    })
  }

  return mineOpenMap
}

const getNearestBoxes = ({
  row = -1,
  col = -1,
  rowSize = 0,
  colSize = 0
} = {}) => {
  const rTop = row - 1
  const rBottom = row + 1
  const cLeft = col - 1
  const cRight = col + 1

  const boxes = []

  for (let i = Number(rTop); i < rBottom + 1; i++) {
    if (i !== -1 && i < rowSize) {
      for (let j = Number(cLeft); j < cRight + 1; j++) {
        if (j !== -1 && j < colSize && !(i === row && j === col)) {
          boxes.push({
            row: i,
            col: j
          })
        }
      }
    }
  }

  return boxes
}

const getMineCount = ({ row = -1, col = -1, mineMap = [] } = {}) => {
  let count = 0

  if (mineMap[row][col] === 1) {
    return -1
  } else {
    const nearestBoxes = getNearestBoxes({
      row,
      col,
      rowSize: mineMap.length,
      colSize: mineMap[0].length
    })

    nearestBoxes.forEach(box => {
      if (mineMap[box.row][box.col] === 1) {
        count++
      }
    })
  }

  return count
}

const setFlag = ({
  row = -1,
  col = -1,
  mineOpenMap = [],
  mineFlagMap = [],
  currentMineCount = 0
}) => {
  validateMapData({ row, col, map: mineFlagMap })

  // If the box is already opened, do nothing
  if (mineOpenMap[row][col] && !mineFlagMap[row][col]) {
    return {
      currentMineCount,
      mineFlagMap
    }
  }

  const isFlag = mineFlagMap[row][col]
  if (isFlag) {
    currentMineCount++
    mineFlagMap[row][col] = 0
    return {
      currentMineCount,
      mineFlagMap
    }
  } else {
    currentMineCount--
    mineFlagMap[row][col] = 1
    return {
      currentMineCount,
      mineFlagMap
    }
  }
}

const checkIsMine = ({ row = -1, col = -1, mineMap = [] } = {}) => {
  validateMapData({ row, col, map: mineMap })

  let isMine = false
  if (mineMap[row][col]) {
    isMine = true
  }
  return isMine
}

const checkGameCleared = ({ mineMap, mineOpenMap } = {}) => {
  let isGameCleared = true
  for (let i = 0; i < mineMap.length; i++) {
    for (let j = 0; j < mineMap[0].length; j++) {
      if (mineMap[i][j] === 0 && mineOpenMap[i][j] === 0) {
        isGameCleared = false
      }
    }
  }
  return isGameCleared
}

const validateMapData = ({ row = -1, col = -1, map = [] } = []) => {
  if (row > -1 && col > -1 && row < map.length && col < map[0].length) {
    return true
  } else {
    const errorMessage = '잘못된 맵 데이터입니다.'
    throw new Error(errorMessage)
  }
}

export default {
  initMap,
  openBox,
  setFlag,
  checkGameCleared,
  checkIsMine
}
