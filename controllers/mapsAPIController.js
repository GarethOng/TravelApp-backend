import NodeGeocoder from 'node-geocoder'
import dotenv from 'dotenv'
dotenv.config()
import { ServerError } from '../errors/index.js'

class MapsAPI {
  constructor() {
    this.apiKey = process.env.API_KEY
    const options = {
      provider: 'google',
      apiKey: this.apiKey,
      httpAdapter: 'https',
    }
    this.geocoder = NodeGeocoder(options)
  }

  async getCoordinates(location) {
    try {
      const data = await this.geocoder.geocode(location)
      console.log(data)
      const latitude = data[0].latitude
      const longitude = data[0].longitude
      const coordinates = { latitude: latitude, longitude: longitude }
      return coordinates
    } catch (error) {
      console.log(error)
      throw new ServerError(error)
    }
  }
}

const mapsAPI = new MapsAPI()
export default mapsAPI
