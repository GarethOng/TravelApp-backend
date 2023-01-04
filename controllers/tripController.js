import Trip from '../models/Trip.js'
import { StatusCodes } from 'http-status-codes'
import {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} from '../errors/index.js'
import checkPermissions from '../utils/checkPermissions.js'
import mapsAPI from './mapsAPIController.js'

const addTrip = async (req, res) => {
  const { title, startDate, endDate, country, tripBudget, itinerary } = req.body
  if ((!title, !startDate, !endDate, !country, !tripBudget, !itinerary)) {
    throw new BadRequestError('Please provide all values!')
  }
  const userId = req.user.userId
  const currTrip = await Trip.findOne({
    title: title,
    createdBy: userId,
    country: country,
  })

  if (currTrip) {
    throw new BadRequestError('Trip alredy exists!')
  } else {
    try {
      const coordinates = await mapsAPI.getCoordinates(country)
      const newTrip = await Trip.create({
        title: title,
        startDate: startDate,
        endDate: endDate,
        country: country,
        tripBudget: tripBudget,
        itinerary: itinerary,
        createdBy: userId,
        coordinates: coordinates,
      })
      res.status(StatusCodes.CREATED).json(newTrip)
    } catch (error) {
      console.log(error)
    }
  }
}

const getTrip = async (req, res) => {
  const userId = req.user.userId
  const { keyword } = req.body
  const queryObject = { createdBy: userId }

  if (keyword) {
    queryObject.title = { $regex: keyword, $options: 'i' }
  }
  const trips = await Trip.find(queryObject)
  res.status(StatusCodes.OK).json({ trips: trips })
}

const updateTrip = async (req, res) => {
  const { id: tripId } = req.params
  const { title, startDate, endDate, country, tripBudget, itinerary } = req.body
  if ((!title, !startDate, !endDate, !country, !tripBudget, !itinerary)) {
    throw new BadRequestError('Please provide all values!')
  }
  const trip = await Trip.findOne({ _id: tripId })
  if (!trip) {
    throw new NotFoundError(`No trip with id :${tripId}`)
  }
  checkPermissions(req.user, trip.createdBy)
  const updatedTrip = await Trip.findOneAndUpdate({ _id: tripId }, req.body, {
    new: true,
  })
  res.status(StatusCodes.OK).json(updateTrip)
}

export { addTrip, getTrip, updateTrip }
