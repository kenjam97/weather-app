const request = require('postman-request')

const forecast = (lat, lon, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=fc80526eaef3744d3c534b5f59fea892&query=${lat},${lon}`

  request(url, { json: true }, (error, response) => {
    const data = response.body

    if (error) {
      callback('Unable to connect to weather services!', undefined)
    } else if (data.error) {
      callback(
        'Location not found, please try a different location.',
        undefined,
      )
    } else {
      callback(
        undefined,
        `It is currently ${
          data.current.temperature
        } degrees out. It feels like ${
          data.current.feelslike
        } degrees out. It is ${
          data.current.is_day ? 'day time' : 'night time'
        }.`,
      )
    }
  })
}

module.exports = forecast
