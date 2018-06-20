// import schedule from 'node-schedule'
const schedule = require('node-schedule')
function servicio () {
  console.log('serviciooo')
  schedule.scheduleJob('41 22 * * *', () => {
    console.log('hellooo world')
  })
}
export default {servicio}
