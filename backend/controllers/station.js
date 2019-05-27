const Station = require('../models/station')
const Bike = require('../models/bike')

const stationCtrl = {}

//CREATE STATION
stationCtrl.postStation = async (req, res) => {
    const station = new Station({
        name: req.body.name,
        state: req.body.state,
        description: req.body.description
    })
    console.log(station);

    try {
        await station.save();
        res.status(200).send({message: "New station added"}, )
    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
}

//GET STATIONS
stationCtrl.getStations = async (req, res) => {
    const station = await Station.find()
    res.json(station)
}

//ADD BIKE TO A STATION
stationCtrl.addBike = async (req, res) => {
        try{
            const bikeId = req.body.bikeId;
            const stationId = req.body.stationId;
    
            console.log(`bikeID: ${bikeId}, stationID: ${stationId}`);
    
            let bikeFound = await Bike.findById(bikeId);
    
            if (!bikeFound) {
                return res.status(404).send({message: 'Bike not found'})
            } else {
                let stationUpdated = await Station.findByIdAndUpdate({_id: stationId}, {$addToSet: {bikes: bikeId}});
                let bikeUpdated = await Bike.findByIdAndUpdate({_id: bikeId}, {$set: {assigned: true}});
                if (!stationUpdated) {
                    return res.status(404).send({message: 'Station not found'})
                }
                if (!bikeUpdated) {
                    return res.status(404).send({message: 'Bike not found'})
                }
            }
            res.status(200).send({message: "Bike added successfully to the station"})
        } catch(err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                res.status(409).send({err: err.message, code: err.code})
            }
            res.status(500).send(err)
        }
    }



//GET STATION DETAILS
stationCtrl.getStationBikeDetail = async (req, res) => {
    console.log("getStationBikeDetail");
    try {
        const _id = req.params.stationId;

        let station = await Station.findById(_id).populate('bike');
        if(!station){
            return res.status(404).send({message: 'Station not found'})
        }else{
            res.status(200).send(station)
        }
    } catch(err) {
        res.status(500).send(err)
    }
}


//GET BIKES
stationCtrl.getBikes = async (req, res) => {
    try {
        let station = await Station.findById(req.params.id).populate('bike');
        if(!station){
            return res.status(404).send({message: 'Station not found'})
        }else{
            //res.status(200).send(station)
            res.status(200).send(station.bike)
        }
    } catch(err) {
        res.status(500).send(err)
    }
}

/* stationCtrl.postBikeStation = async (req,res) => {
    try{
        const stationId = req.body.stationId;
        const bikeId = req.body.bikeId;

        console.log(`StationID: ${stationId}, BikeID: ${bikeId}`);

        let bikeFound = await Bike.findById(bikeId);
        if(!bikeFound){
            return res.status(404).send({message: 'Bike not found'})
        }else if(bikeFound.assigned === true){
            return res.status(500).send({message: 'Bike already assigned'})
        }else{
                let stationUpdated = await Station.findOneAndUpdate({_id: stationId}, {$addToSet:{bikes: bikeId}})
            if (!stationUpdated) {
                return res.status(404).send({message: 'Station not found'})
            }
        let bikeUpdated = await Bike.findByIdAndUpdate({_id: bikeId}, {assigned: "true"});
            console.log(bikeUpdated);
        }

        res.status(200).send({message: "Added successfully"})
    }catch(err) {
        if (err.name === 'MongoError' && err.code === 11000) {
            res.status(409).send({err: err.message, code: err.code})
        }
        res.status(500).send(err)
    }
}
 */
//GetStationDetail
stationCtrl.getStationDetail = async (req,res) => {
    console.log("getStationDetail");
    try{
        const _id = req.params.stationId;

        let station = await Station.findById(_id).populate('bikes');
        if(!station){
            return res.status(404).service({message: 'station not found'});
        }else{
            res.status(200).send(station);
        }
    }catch(err){
        res.status(500).send(err);
    }
}


//Post Bike Station
stationCtrl.postBikeStation = async (req,res) => {
    try{
        const stationId = req.body.stationId;
        const bikeId = req.body.bikeId;

        console.log(`StationID: ${stationId}, BikeID: ${bikeId}`);

        let bikeFound = await Bike.findById(bikeId);
        if(!bikeFound){
            return res.status(404).send({message: 'Bike not found'})
        }else if(bikeFound.assigned === true){
            return res.status(500).send({message: 'Bike already assigned'})
        }else{
                let stationUpdated = await Station.findOneAndUpdate({_id: stationId}, {$addToSet:{bikes: bikeId}})
            if (!stationUpdated) {
                return res.status(404).send({message: 'Station not found'})
            }
        let bikeUpdated = await Bike.findByIdAndUpdate({_id: bikeId}, {assigned: "true"});
            console.log(bikeUpdated);
        }

        res.status(200).send({message: "Added successfully"})
    }catch(err) {
        if (err.name === 'MongoError' && err.code === 11000) {
            res.status(409).send({err: err.message, code: err.code})
        }
        res.status(500).send(err)
    }
}

//GetBikeStationDetal
stationCtrl.deleteBikeStation = async (req,res) => {
    try {
        const _id = req.params.stationId;
        let station = await Station.findById(_id).populate('bikes');
        if(!station){
            return res.status(404).send({message: 'station not found'})
        }else{
            res.status(200).send(station)
        }
    }catch(err) {
        res.status(500).send(err)
    }
}


//Delete Bike Station
stationCtrl.deleteBikeStation = async (req,res) => {
    try{
        const stationId = req.params.stationId;
        const bikeId = req.params.bikeId;

        console.log(`StationID: ${stationId}, BikeID: ${bikeId}`);

        let station = await Station.findById(stationId);
        if(!station){
            return res.status(404).send({message: 'Station not found'})
        }else{
            mongoose.Types.ObjectId(bikeId);

            let stationUpdated = await Station.update({_id: stationId}, {$pull: {bikes: bikeId}});

            if (stationUpdated.nModified === 0) {
                return res.status(404).send({message: 'Bike not found'})
            }

            let bikeUpdated = await Bike.findByIdAndUpdate({_id: bikeId}, {assigned: "false"});
            console.log(bikeUpdated);
        }
        res.status(200).send({message:'Bike deleted successfully'});
    }catch(err){
        res.status(500).send(err)
    }

}



module.exports = stationCtrl;