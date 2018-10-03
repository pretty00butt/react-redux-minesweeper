import RecordsUtils from '@/utils/records'

export const GET_RECORDS = Symbol('GET_RECORDS')

export const getRecords = () => {
  return dispatch => {
    dispatch({
      type: GET_RECORDS,
      records: RecordsUtils.getRecords()
    })
  }
}

export const saveRecord = record => {
  const newRecords = RecordsUtils.saveRecord(record)
  return dispatch => {
    dispatch({
      type: GET_RECORDS,
      records: newRecords
    })
  }
}
