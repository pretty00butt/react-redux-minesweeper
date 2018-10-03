const getRecords = () => {
  let records = localStorage.getItem('mine-game-records')
  return records ? JSON.parse(records) : []
}

const saveRecord = record => {
  let records = [...getRecords()]
  records.push(Number(record))
  records = records.sort((a, b) => a - b)
  localStorage.setItem('mine-game-records', JSON.stringify(records))
  return records
}

export default {
  getRecords,
  saveRecord
}
