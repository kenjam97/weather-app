const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../../weather-app/utils/geocode')
const forecast = require('../../weather-app/utils/forecast')

const app = express()

const publicDir = path.join(__dirname, '../public')
const views = path.join(__dirname, '../templates/views')
const partials = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', views)
hbs.registerPartials(partials)

app.use(express.static(publicDir))

app.get('', (req, res) => {
  res.render('index', { title: 'Weather App', name: 'James Kennedy' })
})

app.get('/about', (req, res) => {
  res.render('about', { title: 'About', name: 'James Kennedy' })
})

app.get('/weather', (req, res) => {
  const address = req.query.location

  if (!address) {
    return res.send({ error: 'You must provide a location' })
  }

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error })
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error })
      }

      res.send({
        location,
        forecast: forecastData,
        address: address,
      })
    })
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'James Kennedy',
    message: 'Page Not Found',
  })
})

app.listen(3000, () => {
  console.log('Server started on port 3000')
})
