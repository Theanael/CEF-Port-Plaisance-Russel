const reservations = require('../models/reservations');
const Reservation = require('../models/reservations')

exports.getAll = async () =>{
    const reservations = Reservation.find();
    return reservations;
} 