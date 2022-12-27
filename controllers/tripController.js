import Trip from '../models/Trip.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnauthenticatedError } from '../errors/index.js'
import checkPermissions from '../utils/checkPermissions.js'

const addTrip = async (req, res) => {
  const { title, startDate, endDate, country, tripBudget, itinerary } = req.body
  if ((!title, !startDate, !endDate, !country, !tripBudget, !itinerary)) {
    throw new BadRequestError('Please provide all values!')
  }
  const userId = req.user.userId
  const currTrip = await Trip.findOne({
    title: title,
    createdBy: userId,
  })
  if (!currTrip) {
    const newTrip = await Trip.create({
      title: title,
      startDate: startDate,
      endDate: endDate,
      country: country,
      tripBudget: tripBudget,
      itinerary: itinerary,
      createdBy: userId,
    })
    res.status(StatusCodes.CREATED).json(newTrip)
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

export { addTrip, getTrip }
