import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import HomeComponent from '@/components/Home'

import {
  initGame,
  startGame,
  updateGameStatus,
  updateRecord
} from '@/redux/actions/GameStatus'
import { initMap, openBoxes, setFlag } from '@/redux/actions/MineMap'
import { getRecords, saveRecord } from '@/redux/actions/Records'

import timer from '@/utils/timer'

const MAP_SIZE = {
  row: 8,
  col: 8
}
const MINE_COUNT = 2

class HomeContainer extends Component {
  componentDidMount() {
    this.initGame()
    this.props.getRecords()
  }

  // Initialize  All Map Data of Game & Game Status
  initGame = () => {
    this.clearTimer()

    this.props.initMap({
      rowSize: MAP_SIZE.row,
      colSize: MAP_SIZE.col,
      mineCount: MINE_COUNT
    })

    this.props.initGame()
  }

  // return true if the game has been started or false if already playing
  startGame = () => {
    if (
      !(
        this.props.isGamePlaying ||
        this.props.isGameOver ||
        this.props.isGameCleared
      )
    ) {
      this.startTimer()
      this.props.startGame()

      return true
    }

    return false
  }

  resetGame = () => {
    this.initGame()
  }

  startTimer = () => {
    timer.start(() => {
      this.props.updateRecord(timer.record)
    })
  }

  clearTimer = () => {
    timer.finish()
  }

  rightClickMineBox = (row, col) => {
    // start the game if the right click is the first action
    this.startGame()

    this.props.setFlag({
      row,
      col,
      mineOpenMap: this.props.mineOpenMap,
      currentMineCount: Number(this.props.currentMineCount),
      mineFlagMap: [...this.props.mineFlagMap]
    })
  }

  clickMineBox = (row, col) => {
    // start the game if the click is the first action
    const hasStarted = this.startGame()

    let {
      mineMap,
      mineOpenMap,
      mineCountMap,
      isGameCleared,
      isGameOver,
      isGamePlaying
    } = this.props
    mineOpenMap = [...mineOpenMap]

    // if the click event is the first action to start the game,
    // `isGamePlaying` property could be false
    // even though the game is playing
    isGamePlaying = isGamePlaying || hasStarted

    // click action is working only if the game is not over or cleared
    if (!isGameOver && !isGameCleared) {
      // 1. Open Boxes the User clicks
      this.props.openBoxes({
        row,
        col,
        mineOpenMap,
        mineCountMap
      })

      // 2. Update Game Status After Open Boxes
      const updatedGameStatus = this.props.updateGameStatus({
        row,
        col,
        mineMap,
        mineOpenMap,
        isGameCleared,
        isGameOver,
        isGamePlaying
      })

      // 3. Finish the Game only if
      // * the game is over or cleared
      // * the game is playing
      if (
        (updatedGameStatus.isGameOver || updatedGameStatus.isGameCleared) &&
        isGamePlaying
      ) {
        this.clearTimer()

        this.showGameResult({
          isGameOver: updatedGameStatus.isGameOver,
          isGameCleared: updatedGameStatus.isGameCleared
        })
      }
    }
  }

  // 1. Clear timer
  // 2. Check if the game is cleared
  // 3. Check if the game is overed
  // 4. Update Game status
  showGameResult = ({ isGameOver = false, isGameCleared = false } = {}) => {
    if (isGameCleared) {
      alert(`GAME CLEARED!, RECORD: ${this.props.record}`)

      // Save the Record If the User Clear the Game
      this.props.saveRecord(this.props.record)
    }

    if (isGameOver) {
      alert('GAME OVER!')
    }
  }

  render() {
    return (
      <HomeComponent
        records={this.props.records}
        //- Records

        record={this.props.record}
        isGamePlaying={this.props.isGamePlaying}
        isGameCleared={this.props.isGameCleared}
        isGameOver={this.props.isGameOver}
        // Game Status

        currentMineCount={this.props.currentMineCount}
        mineMap={this.props.mineMap}
        mineCountMap={this.props.mineCountMap}
        mineOpenMap={this.props.mineOpenMap}
        mineFlagMap={this.props.mineFlagMap}
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

const mapStateToProps = state => ({
  ...state.MineMap,
  ...state.GameStatus,
  ...state.Records
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      initGame,
      startGame,
      updateGameStatus,
      updateRecord,
      // Game Status

      initMap,
      openBoxes,
      setFlag,
      // Map

      getRecords,
      saveRecord
      // Records
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
