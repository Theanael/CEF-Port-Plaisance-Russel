const reservationService = require('../../services/reservations')

exports.getHome = async (req,res) => {
    try {
        const reservations= await reservationService.getAll();
        const now = Date.now()
        currentReservations=reservations.filter(reservation => (reservation.startDate<now && now<reservation.endDate))

        res.render('index',{user:req.session.user,reservations:currentReservations})
        
    } catch (error) {
        return res.render('error',{message:error.message,error:error})
    }
}

exports.getLoginPage = async (req,res) => {
    return res.render('loginPage');
}