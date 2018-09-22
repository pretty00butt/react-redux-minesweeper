import React, { Component } from "react"
import { Container } from "flux/utils"

import HomeComponent from "@/components/Home"

import { initGame, openBoxes, checkFlag } from "@/actions/MineMap"
import MineMapStore from "@/stores/MineMap"
import { getRecords, saveRecord } from "@/actions/Records"
import RecordsStore from "@/stores/Records"

import { getNearestBoxes, checkGameCleared } from "@/utils/minemap"

const MAP_SIZE = {
  row: 3,
  col: 3
}
const MINE_COUNT = 2

class HomeContainer extends Component {
  state = {
    startTime: null,
    endTime: null,
    isGamePlaying: false,
    isGameOver: false,
    isGameCleared: false
  }

  componentWillMount() {
    this.initGame()
    this.getRecords()
  }

  getRecords = () => {
    getRecords()
  }

  saveRecord = record => {
    saveRecord(record)
  }

  resetGame = () => {
    this.clearTimer()
    this.initGame()
    this.setState(prevState => {
      return {
        startTime: null,
        endTime: null,
        isGamePlaying: false,
        isGameOver: false,
        isGameCleared: false
      }
    })
  }

  // Initialize All Map Data of Game
  initGame = () => {
    initGame({
      rowSize: MAP_SIZE.row,
      colSize: MAP_SIZE.col,
      mineCount: MINE_COUNT
    })
  }

  startGame = cb => {
    if (!this.timer) {
      this.startTimer()
    }

    this.setState(prevState => {
      return {
        isGamePlaying: true
      }
    })
  }

  // 1. Check if the game is cleared
  // 2. Check if the game is overed
  // 3. Clear timer
  endGame = ({ isGameOver, isGameCleared } = {}) => {
    if (isGameCleared) {
      const record = Math.abs(
        this.state.endTime.getTime() - this.state.startTime.getTime()
      )
      alert(`GAME CLEARED!, RECORD: ${record}`)
      this.saveRecord(record)
    }

    if (isGameOver) {
      alert("GAME OVER!")
    }

    this.clearTimer()
    this.setState(prevState => {
      return {
        isGameOver,
        isGameCleared
      }
    })
  }

  startTimer = () => {
    this.setState(prevState => {
      return {
        startTime: new Date(),
        endTime: new Date()
      }
    })

    this.timer = window.setInterval(() => {
      this.setState(prevState => ({
        endTime: new Date()
      }))
    }, 100)
  }

  clearTimer = () => {
    window.clearInterval(this.timer)
    this.timer = null
  }

  rightClickMineBox = (row, col) => {
    // start the game if the right click is the first action
    if (!this.state.isGamePlaying) {
      this.startGame()
    }

    let currentMineCount = Number(this.state.currentMineCount)
    let mineFlagMap = [...this.state.mineFlagMap]

    const isFlag = mineFlagMap[row][col]
    if (isFlag) {
      currentMineCount++
      mineFlagMap[row][col] = 0
      checkFlag({ mineFlagMap, currentMineCount })
    } else if (!isFlag && currentMineCount) {
      currentMineCount--
      mineFlagMap[row][col] = 1
      checkFlag({ mineFlagMap, currentMineCount })
    }
  }

  clickMineBox = (row, col) => {
    // start the game if the right click is the first action
    if (!this.state.isGamePlaying) {
      this.startGame()
    }

    let isGamePlaying = true
    let isGameCleared = false
    let isGameOver = false
    let mineOpenMap = [...this.state.mineOpenMap]

    // click action is working only if the game is not over or cleared
    if (!this.state.isGameOver || !this.state.isGameCleared) {
      // 1. Check Mine
      isGameOver = this.checkMine(row, col, this.state.mineMap)

      if (!isGameOver) {
        // 2. Open Box
        mineOpenMap = this.openBox(row, col, this.state.mineOpenMap)
        openBoxes(mineOpenMap)

        // 3. Check Whether the game is cleared
        isGameCleared = checkGameCleared({
          mineMap: this.state.mineMap,
          mineOpenMap
        })
      }
    }

    // 4. Check if the game is over or cleared
    isGamePlaying = !(isGameOver || isGameCleared)
    if (!isGamePlaying) {
      this.endGame({
        isGameOver,
        isGameCleared
      })
    }
  }

  checkMine = (row, col, mineMap) => {
    let isMine = false
    if (mineMap[row][col]) {
      isMine = true
    }
    return isMine
  }

  openBox = (row, col, mineOpenMap) => {
    const { mineCountMap } = this.state

    mineOpenMap[row][col] = 1
    if (mineCountMap[row][col] === 0) {
      const nearestBoxes = getNearestBoxes(row, col, MAP_SIZE.row, MAP_SIZE.col)
      nearestBoxes.forEach(box => {
        if (mineOpenMap[box.row][box.col] === 0) {
          mineOpenMap = this.openBox(box.row, box.col, mineOpenMap)
        }
      })
    }

    return mineOpenMap
  }

  render() {
    return (
      <HomeComponent
        records={this.state.records}
        //- Records

        endTime={this.state.endTime}
        startTime={this.state.startTime}
        isGamePlaying={this.state.isGamePlaying}
        isGameCleared={this.state.isGameCleared}
        isGameOver={this.state.isGameOver}
        currentMineCount={this.state.currentMineCount}
        mineMap={this.state.mineMap}
        mineCountMap={this.state.mineCountMap}
        mineOpenMap={this.state.mineOpenMap}
        mineFlagMap={this.state.mineFlagMap}
        //- Maps

        clickMineBox={this.clickMineBox}
        rightClickMineBox={this.rightClickMineBox}
        startGame={this.startGame}
        resetGame={this.resetGame}
        //- Actions
      />
    )
  }
}

HomeContainer.getStores = () => [MineMapStore, RecordsStore]
HomeContainer.calculateState = prevState => ({
  ...MineMapStore.getState(),
  ...RecordsStore.getState()
})

export default Container.create(HomeContainer)
