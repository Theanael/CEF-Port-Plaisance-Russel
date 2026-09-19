const reservationService = require('../../services/reservations')

exports.getHome = async (req,res) => {
    try {
        // on récupère la liste des réservations dont on extrait les réservations en cours
        const reservations= await reservationService.getAll();
        currentReservations=reservations.filter(reservation => (reservation.startDate<now && now<reservation.endDate))
        
        // on récupère la date 
        const now = Date.now()

        // on affiche la page d'accueil
        res.render('index',{user:req.session.user,reservations:currentReservations})
        
    } catch (error) {
        return res.render('error',{message:error.message,error:error})
    }
}