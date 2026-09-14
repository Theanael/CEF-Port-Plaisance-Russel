const reservations = require('../models/reservations');
const Reservation = require('../models/reservations')

exports.getAll = async () =>{
    const reservations = Reservation.find();
    return reservations;
} 

exports.getAllByCatway = async (catwayNumber) => {
    
    const reservations = Reservation.find({catwayNumber:catwayNumber});
    return reservations;
}
