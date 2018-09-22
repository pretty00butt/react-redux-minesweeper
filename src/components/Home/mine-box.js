import React from "react"
import MineBoxLayout from "./mine-box-layout"

export default ({
  row = -1,
  col = -1,
  isGameOver = false,
  isGameCleared = false,
  isMine = false,
  mineCount = 0,
  isOpen = 0,
  isFlag = 0,
  clickMineBox,
  rightClickMineBox
} = {}) => {
  if ((isGameOver || isGameCleared) && isMine) {
    return (
      <MineBoxLayout>
        <span
          style={{
            color: "red"
          }}
        >
          BOMB!
        </span>
      </MineBoxLayout>
    )
  } else if (isFlag) {
    return (
      <MineBoxLayout
        onClick={() => clickMineBox(row, col)}
        onContextMenu={e => {
          e.preventDefault()
          rightClickMineBox(row, col)
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <img
            src="https://images-na.ssl-images-amazon.com/images/I/61ED72Vs8hL._SL1000_.jpg"
            width="45px"
            height="45px"
            alt="골든스테이트워리어즈 쓰리핏!"
          />
        </div>
      </MineBoxLayout>
    )
  } else {
    return (
      <MineBoxLayout
        onClick={() => clickMineBox(row, col)}
        onContextMenu={e => {
          e.preventDefault()
          rightClickMineBox(row, col)
        }}
      >
        {isOpen ? (mineCount ? mineCount : "") : "?"}
      </MineBoxLayout>
    )
  }
}
