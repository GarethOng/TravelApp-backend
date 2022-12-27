import mongoose from 'mongoose'

const TripSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for the trip'],
    unique: true,
  },
  startDate: {
    type: Date,
    required: [
      true,
      'Please provide a title for the starting date of the trip',
    ],
  },
  endDate: {
    type: Date,
    required: [true, 'Please provide a end date for the trip'],
  },
  country: {
    type: String,
    required: [true, 'Please provide the country you visited'],
  },
  budget: {
    type: Number,
  },
  itinerary: {
    type: String,
  },
})

export default mongoose.model('Trip', TripSchema)
