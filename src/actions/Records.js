import AppDispatcher from "../AppDispatcher"
import * as types from "../constants"

export const getRecords = () => {
  let records = localStorage.getItem("mine-game-records")
  records = records ? JSON.parse(records) : []

  AppDispatcher.dispatch({
    type: types.GET_RECORDS,
    records
  })
}

export const saveRecord = record => {
  let records = localStorage.getItem("mine-game-records")
  records = records ? JSON.parse(records) : []

  records.push(Number(record))
  records = records.sort((a, b) => a - b)
  localStorage.setItem("mine-game-records", JSON.stringify(records))

  AppDispatcher.dispatch({
    type: types.GET_RECORDS,
    records
  })
}
