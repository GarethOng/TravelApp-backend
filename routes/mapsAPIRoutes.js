import express from 'express'
const router = express.Router()
import getCoordinates from '../controllers/mapsAPIController.js'

router.route('/getCoordinates').get(getCoordinates)

export default router
