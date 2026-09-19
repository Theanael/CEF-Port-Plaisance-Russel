const catwayService = require('../../services/catways');
const reservationService = require('../../services/reservations');

exports.getPage = async (req,res) => {
        const catwayId=req.params.id;
        const reservationId=req.params.idReservation;
    
        try {
            // on vérifie que le catway existe et on le récupère
            const catway = await catwayService.getOneById(catwayId);
            if (!catway){
                 return res.render('error', {message:"Catway Not Found",error:{status:404}});
            };
    
            // on vérifie que la réservation existe et est dans le bon catway et on la récupère 
            const reservation = await reservationService.getOneById(reservationId);
            if (!reservation || reservation.catwayNumber!=catway.catwayNumber){
                 return res.render('error', {message:"Reservation Not Found",error:{status:404}});
            };
    
            // on renvoie la réservation.
            return res.render('reservations/page',{reservation:reservation,catway:catway});
        } catch (error) {
            return res.render('error',{message:error.message,error:error});
        };
};

exports.create = async (req,res) => {
    const catwayId=req.params.id;
    
    try {
        // on vérifie que le catway existe et on le récupère. 
        const catway = await catwayService.getOneById(catwayId);
        if (!catway) {
            return res.render('error', {message:"Catway Not Found",error:{status:404}});
        };

        // on affiche le formulaire de création de réservation
        return res.render('reservations/create',{catway:catway});
    } catch (error) {
        return res.render('error',{message:error.message,error:error});
    };
};

exports.add = async (req,res) => {
    const catwayId=req.params.id;
    const newReservation={
        clientName:req.body.clientName,
        boatName:req.body.boatName,
        startDate:req.body.startDate,
        endDate:req.body.endDate,
    };

    try {
        // on vérifie que le catway existe et on le récupère
        const catway = await catwayService.getOneById(catwayId);
        if (!catway) {
            return res.render('error', {message:"Catway Not Found",error:{status:404}});
        };

        // on ajoutes le numéro de catway à la réservation en cours de création 
        newReservation.catwayNumber=catway.catwayNumber;

        // on crée la réservation puis on redirige vers sa page.
        const reservation=await reservationService.add(newReservation);
        res.redirect('/catways/'+catwayId+'/reservations/'+reservation._id+'/page');
    } catch (error) {
        return res.render('error',{message:error.message,error:error});
    };
};

exports.update = async (req,res) => {
    const catwayId=req.params.id;
    const reservationId=req.params.idReservation;
    // Je pars du principe qu'une réservation ne peut pas changer de catway
    // pour des raisons de praticité 
    const changes={
        clientName:req.body.clientName,
        boatName:req.body.boatName,
        startDate:req.body.startDate,
        endDate:req.body.endDate,
    };

    try {
         // on vérifie que le catway existe et on le récupère
        const catway = await catwayService.getOneById(catwayId);
        if (!catway){
                return res.render('error', {message:"Catway Not Found",error:{status:404}});
        };

        // on vérifie que la réservation existe et est dans le bon catway et on la récupère 
        const reservation = await reservationService.getOneById(reservationId);
        if (!reservation || reservation.catwayNumber!=catway.catwayNumber){
                return res.render('error', {message:"Reservation Not Found",error:{status:404}});
        };

        // on met à jour puis on recharge la page réservation.
        await reservationService.update(reservationId,changes);
        return res.redirect('/catways/'+catwayId+'/reservations/'+reservationId+'/page');
        
    } catch (error) {
        return res.render('error',{message:error.message,error:error});
    };
};

exports.delete = async (req,res) => {
    const catwayId=req.params.id;
    const reservationId=req.params.idReservation;

    try {
         // on vérifie que le catway existe et on le récupère
        const catway = await catwayService.getOneById(catwayId);
        if (!catway){
                return res.render('error', {message:"Catway Not Found",error:{status:404}});
        };

        // on vérifie que la réservation existe et est dans le bon catway et on la récupère 
        const reservation = await reservationService.getOneById(reservationId);
        if (!reservation || reservation.catwayNumber!=catway.catwayNumber){
                return res.render('error', {message:"Reservation Not Found",error:{status:404}});
        };

        // on supprime la réservation puis on recharge la liste des réservations.
        await reservationService.delete(reservationId);
        return res.redirect('/catways/'+catwayId+'/page');
        
    } catch (error) {
        return res.render('error',{message:error.message,error:error});
    };
};