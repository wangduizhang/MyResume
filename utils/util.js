const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatTime2 = date => {
  const year = date.getFullYear() % 100
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('/') 
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//作为外部方法
module.exports = {
  formatTime: formatTime
}
module.exports = {
  formatTime2: formatTime2
}

