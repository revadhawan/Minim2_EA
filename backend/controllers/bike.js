const Station = require('../models/station')
const Bike = require('../models/bike')

const bikeCtrl = {}

//post BIKE
bikeCtrl.postBike = async (req, res) => {
    const bike = new Bike()
    console.log(bike)
    bike.name = req.body.name,
    bike.kms = req.body.kms,
    bike.state = req.body.state,
    bike.description = req.body.description
    bike.assigned = req.body.assigned
    console.log(bike)

    try {
        await bike.save()
        res.status(200).send({message: "Bike posted successfully"})
    } catch (err) {
        res.status(500).send(err)
        console.log(err)
    }
}

//GET AVAILABLE BIKES
bikeCtrl.getAvailableBikes = async (req, res) => {
    try {
        let AvailableBikes = await Bike.find({assigned: "false"});
        res.status(200).send(AvailableBikes);
    } catch(err) {
        res.status(500).send(err)
    }
}

//GET UNAVAILABLE BIKES
bikeCtrl.getUnavailableBikes = async (req, res) => {
    const bikes = await Bike.find({state: false})
    res.json(bikes)
}


//DELETE BIKE
bikeCtrl.deleteBike = async (req, res) => {
    try{
        const _id = req.params.bikeId;
        let bike = await Bike.findByIdAndDelete(_id);
        if(!bike){
            return res.status(404).send({message: 'Bike not found'})
        }else{
            mongoose.Types.ObjectId(_id);
            await Station.update({}, {$pull: {bikes: _id}}, {multi: true});
            res.status(200).send({message:'bike deleted'});
        }
    } catch (err){
        res.status(500).send(err);
    }
}



/* bikeCtrl.deleteBike = async (req, res) => {
    try{
        const _id = req.params.bikeId;
        let bike = await Bike.findByIdAndRemove(_id);
        if(!bike){
            return res.status(404).send({message: 'Bike not found'})
        }else{
            res.status(200).send({message:'Bike deleted successfully'})
        }
    }catch(err){
        res.status(500).send(err)
    }
}
 */


module.exports = bikeCtrl