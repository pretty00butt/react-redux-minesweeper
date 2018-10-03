import React from 'react'

export default ({ needToReset, resetGame, startGame } = {}) => {
  return (
    <button onClick={needToReset ? resetGame : startGame}>
      {needToReset ? '다시 시작' : '시작'}
    </button>
  )
}
