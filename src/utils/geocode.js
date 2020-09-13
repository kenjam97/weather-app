const request = require('postman-request')

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address,
  )}.json?access_token=pk.eyJ1Ijoia2VuamFtOTciLCJhIjoiY2tldTB2YTNnMGE1MjJ6bWVtem43Zmg3aiJ9.FeqWGV-ewIC-UCjN1Ve5Fw&limit=1`

  request(url, { json: true }, (error, response) => {
    const data = response.body.features

    if (error) {
      callback('Unable to connect to location services!', undefined)
    } else if (data.length === 0) {
      callback(
        'Location not found, please try a different location.',
        undefined,
      )
    } else {
      callback(undefined, {
        latitude: data[0].center[1],
        longitude: data[0].center[0],
        location: data[0].place_name,
      })
    }
  })
}

module.exports = geocode
