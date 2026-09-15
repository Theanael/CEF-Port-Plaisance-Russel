const catwayService = require('../../services/catways')
const reservationService = require('../../services/reservations')

exports.getAllByCatway = async(req,res) => {
    const catwayId=req.params.id

    try {
        const catway = await catwayService.getOneById(catwayId);
        if (!catway){
            return res.status(404).json({message:"catway not found"})
        }

        const reservations = await reservationService.getAllByCatway(catway.catwayNumber);
        
        return res.status(200).json(reservations)

    } catch (error) {

        return res.status(500).json("error")
    }
}

exports.getOneById = async (req,res) => {
    const catwayId=req.params.id
    const reservationId=req.params.idReservation

    try {
        const catway = await catwayService.getOneById(catwayId);
        if (!catway){
            return res.status(404).json({message:"catway not found"})
        }

        const reservation = await reservationService.getOneById(reservationId);
        if (!reservation || reservation.catwayNumber!=catway.catwayNumber){
            return res.status(404).json({message:"reservation not found"})
        }

        return res.status(200).json(reservation)
    } catch (error) {
        return res.status(500).json(error)
    }
}

exports.add = async (req,res) => {
    const catwayId=req.params.id
    const newReservation={
        clientName:req.body.clientName,
        boatName:req.body.boatName,
        startDate:req.body.startDate,
        endDate:req.body.endDate,
    }
    
    try {
        const catway = await catwayService.getOneById(catwayId);
        if (!catway){
            return res.status(404).json({message:"catway not found"})
        }

        newReservation.catwayNumber=catway.catwayNumber
        const reservation = await reservationService.add(newReservation)

        return res.status(201).json(reservation)
    } catch (error) {
        return res.status(500).json(error)
    }

}