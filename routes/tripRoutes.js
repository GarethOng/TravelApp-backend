import express from 'express'
const router = express.Router()
import { addTrip, getTrip, updateTrip } from '../controllers/tripController.js'
import authenticateUser from '../middleware/auth.js'

router.route('/addTrip').post(authenticateUser, addTrip)
router.route('/getTrip').post(authenticateUser, getTrip)
router.route('/:id').patch(authenticateUser, updateTrip)

export default router
