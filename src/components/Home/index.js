import React, { Component } from 'react'
import PropTypes from 'prop-types'

import GameViewLayout from './gameview-layout'
import MineBoxGrids from './mine-box-grids'
import MineBox from './mine-box'
import StartButton from './start-button'

import RecordsLayout from './records-layout'

import { getFormattedTime } from '@/utils/time-formatter'

export default class HomeComponent extends Component {
  static propTypes = {
    records: PropTypes.array,
    record: PropTypes.number,
    isGamePlaying: PropTypes.bool,
    isGameCleared: PropTypes.bool,
    isGameOver: PropTypes.bool,
    currentMineCount: PropTypes.number,
    mineMap: PropTypes.array,
    mineCountMap: PropTypes.array,
    mineOpenMap: PropTypes.array,
    mineFlagMap: PropTypes.array,
    clickMineBox: PropTypes.func,
    rightClickMineBox: PropTypes.func,
    startGame: PropTypes.func,
    resetGame: PropTypes.func
  }

  render() {
    const {
      records,
      record,
      isGamePlaying,
      isGameCleared,
      isGameOver,
      currentMineCount,
      mineMap,
      mineCountMap,
      mineOpenMap,
      mineFlagMap,
      clickMineBox,
      rightClickMineBox,
      startGame,
      resetGame
    } = this.props

    const mineBoxes = []
    mineMap.forEach((rows, row) => {
      rows.forEach((isMine, col) => {
        mineBoxes.push(
          <MineBox
            key={`${row}-${col}`}
            row={row}
            col={col}
            isGameOver={isGameOver}
            isGameCleared={isGameCleared}
            isMine={isMine === 1}
            mineCount={mineCountMap[row][col]}
            isOpen={mineOpenMap[row][col]}
            isFlag={mineFlagMap[row][col]}
            clickMineBox={clickMineBox}
            rightClickMineBox={rightClickMineBox}
          />
        )
      })
    })

    const recordsList = records.map((r, index) => (
      <li key={index}>{getFormattedTime(r)}</li>
    ))

    return (
      <div>
        <h1>Mine GAME!</h1>

        {/* GameView */}
        <GameViewLayout>
          <h5>{getFormattedTime(record)}</h5>
          <h5>CURRENT MINE COUNT: {currentMineCount}</h5>

          <StartButton
            needToReset={isGameOver || isGameCleared || isGamePlaying}
            resetGame={resetGame}
            startGame={startGame}
          />

          <MineBoxGrids>{mineBoxes}</MineBoxGrids>
        </GameViewLayout>

        {/* Records */}
        <RecordsLayout>{recordsList}</RecordsLayout>
      </div>
    )
  }
}
