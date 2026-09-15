const catwayService = require('../../services/catways')
const reservationService = require('../../services/reservations')

exports.getAllByCatway = async(req,res) => {
    const catwayId=req.params.id

    try {
        // on vérifie que le catway existe et on le récupère
        const catway = await catwayService.getOneById(catwayId);
        if (!catway){
            return res.status(404).json({message:"catway not found"})
        }

        // on récupère la liste des réservations du catway puis on l'envoie dans la réponse
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
        // on vérifie que le catway existe et on le récupère
        const catway = await catwayService.getOneById(catwayId);
        if (!catway){
            return res.status(404).json({message:"catway not found"})
        }

        // on vérifie que la réservation existe et est dans le bon catway et on la récupère 
        const reservation = await reservationService.getOneById(reservationId);
        if (!reservation || reservation.catwayNumber!=catway.catwayNumber){
            return res.status(404).json({message:"reservation not found"})
        }

        // on renvoie la réservation.
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
        // on vérifie que le catway existe et on le récupère
        const catway = await catwayService.getOneById(catwayId);
        if (!catway){
            return res.status(404).json({message:"catway not found"})
        }

        // on ajoutes le numéro de catway aux données de création puis on crée une nouvelle réservation avec
        newReservation.catwayNumber=catway.catwayNumber
        const reservation = await reservationService.add(newReservation)

        // on renvoie la réservation.
        return res.status(201).json(reservation)
    } catch (error) {
        return res.status(500).json(error)
    }

}

exports.update = async (req,res) => {
    const catwayId=req.params.id
    const reservationId=req.params.idReservation
    // Je pars du principe qu'une réservation ne peut pas changer de catway
    // pour des raisons de praticité
    const changes={
        clientName:req.body.clientName,
        boatName:req.body.boatName,
        startDate:req.body.startDate,
        endDate:req.body.endDate,
    }

    try {
        // on vérifie que le catway existe et on le récupère
        const catway = await catwayService.getOneById(catwayId);
        if (!catway){
            return res.status(404).json({message:"catway not found"})
        }

        // on vérifie que la réservation existe et est dans le bon catway
        const oldReservation = await reservationService.getOneById(reservationId);
        if (!oldReservation || oldReservation.catwayNumber!=catway.catwayNumber){
            return res.status(404).json({message:"reservation not found"})
        }

        // On modifie la réservation puis on notifie l'utilisateur du succès de l'
        await reservationService.update(reservationId,changes);
        return res.status(201).json({message:"Reservation Updated"})
    } catch (error) {
        return res.status(500).json(error)
    }
    
}
