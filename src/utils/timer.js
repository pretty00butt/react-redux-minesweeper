export const calculateTimeDiff = (from, to) => {
  if (from && to) {
    const timeDiff = Math.abs(to.getTime() - from.getTime())
    return timeDiff
  } else {
    return 0
  }
}

export const getFormattedTime = time => {
  const minutes = Math.floor(time / (1000 * 60))
  const seconds = Math.floor(time / 1000) - minutes * 60
  const mSeconds = Math.floor(time) - seconds * 1000

  return `${showTwoDigits(minutes)}:${showTwoDigits(seconds)}:${showTwoDigits(
    mSeconds
  )}`
}

const showTwoDigits = digit => {
  digit = Number(digit)
  if (digit < 10) {
    return `0${digit}`
  }

  return digit
}
