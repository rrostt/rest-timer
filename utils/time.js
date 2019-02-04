const pad = n => (n < 10 ? `0${n}` : n)

const minutes = time => Math.floor(time / 60000)
const seconds = time => pad(Math.floor(time / 1000) % 60)
const tens = time => Math.floor((time % 1000) / 100)

const format = time => `${minutes(time)}:${seconds(time)}.${tens(time)}`

export {
  format
}
