export const initGame = (rowSize, colSize, mineCount) => {
  const { mineMap, mineCountMap } = createRandomMineMap(
    rowSize,
    colSize,
    mineCount
  )

  return {
    isGameOver: false,
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

const createRandomMineMap = (rowSize, colSize, count) => {
  const mineMap = createBlankMap(rowSize, colSize)
  const mineCountMap = createBlankMap(rowSize, colSize)
  let currentMineCount = 0

  while (currentMineCount < count) {
    const row = Math.floor(Math.random() * rowSize)
    const col = Math.floor(Math.random() * colSize)

    if (mineMap[row][col] !== 1) {
      mineMap[row][col] = 1
      currentMineCount++
    }
  }

  for (let i = 0; i < rowSize; i++) {
    for (let j = 0; j < colSize; j++) {
      const count = getMineCount(i, j, mineMap)
      mineCountMap[i][j] = count
    }
  }

  return {
    mineMap,
    mineCountMap
  }
}

export const getNearestBoxes = (row, col, rowSize, colSize) => {
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

const getMineCount = (row, col, mineMap) => {
  let count = 0

  if (mineMap[row][col] === 1) {
    return -1
  } else {
    const nearestBoxes = getNearestBoxes(
      row,
      col,
      mineMap.length,
      mineMap[0].length
    )
    nearestBoxes.forEach(box => {
      if (mineMap[box.row][box.col] === 1) {
        count++
      }
    })
  }

  return count
}

export const checkGameCleared = ({ mineMap, mineOpenMap } = {}) => {
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
