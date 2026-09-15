const catwayService = require('../../services/catways')
const reservationService = require('../../services/reservations')

exports.getAllByCatway = async(req,res) => {
    const catwayId=req.params.id
    try {
        const catway = await catwayService.getOneById(catwayId);
        console.log(req.params)
        if (!catway){
            return res.status(404).json({message:"catway not found"})
        }

        const reservations = await reservationService.getAllByCatway(catway.catwayNumber);
        return res.status(200).json(reservations)

    } catch (error) {

        return res.status(500).json("error")
    }
}