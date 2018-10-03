import { calculateTimeDiff } from './time-formatter'
class Timer {
  _startedTime = undefined
  _currentTime = undefined
  _timer = undefined

  get record() {
    return this._startedTime && this._currentTime
      ? calculateTimeDiff(this._startedTime, this._currentTime)
      : 0
  }

  start = intervalFuncCb => {
    if (!this._timer) {
      this._startedTime = new Date()
      this._currentTime = new Date()

      this._timer = window.setInterval(() => {
        this._currentTime = new Date()

        if (intervalFuncCb) intervalFuncCb()
      })
    }
  }

  finish = () => {
    window.clearInterval(this._timer)
    this._timer = undefined
  }
}

export default new Timer()
