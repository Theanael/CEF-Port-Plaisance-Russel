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

exports.getOneById = async (id) => {
    const reservation = Reservation.findById(id);
    return reservation;
}

exports.add = async (newReservation) => {
    const reservation = Reservation.create(newReservation);
    return(reservation)
}