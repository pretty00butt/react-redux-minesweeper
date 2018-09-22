import React from "react"

export default ({ isGamePlaying, onClick } = {}) => {
  return (
    <button onClick={onClick}>{isGamePlaying ? "다시 시작" : "시작"}</button>
  )
}
