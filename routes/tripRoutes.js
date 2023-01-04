import express from 'express'
const router = express.Router()
import {
  addTrip,
  getTrip,
  deleteTrip,
  updateTrip,
} from '../controllers/tripController.js'

router.route('/addTrip').post(addTrip)
router.route('/getTrip').post(getTrip)
router.route('/:id').delete(deleteTrip).patch(updateTrip)

export default router
