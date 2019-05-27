'use strict'

const express = require('express')
const stationCtrl = require('../controllers/station')
const bikeCtrl = require('../controllers/bike')
const api = express.Router()


//POST
api.post('/stations', stationCtrl.postStation)
api.post('/bikes', bikeCtrl.postBike)
api.post('/stations/addbike', stationCtrl.postBikeStation)
//api.post('/stations/addbike/', stationCtrl.addBike)



//GET
api.get('/stations', stationCtrl.getStations)
api.get('/stations/bikedetail/:stationId', stationCtrl.getStationBikeDetail);
//api.get('/stations/:stationId',stationCtrl.getStationDetail);
api.get('/bikes/available', bikeCtrl.getAvailableBikes)

//PUT
api.put('/stations/:stationID/deletebike/:bikeID', stationCtrl.addBike)

//DELETE
api.delete('/bikes/:bikeId', bikeCtrl.deleteBike)
api.delete('/stations/:stationId/deletebike/:bikeId', stationCtrl.deleteBikeStation);


module.exports = api