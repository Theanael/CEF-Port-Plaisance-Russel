const mongoose = require('mongoose');

const Reservation = mongoose.Schema({

    catwayNumber:{type:Number,required:true},
    clientName:{type:String,required:true,trim:true},
    boatName:{type:String,required:true,trim:true},
    startDate:{type:Date,required:true},
    endDate:{type:Date,required:true}
})

// il serait probablement judicieux d'ajouter un contrôle de sorte qu'un même 
// bateau ne puisse pas être réservé plusieurs fois au même moment

module.exports = mongoose.model('Reservation',Reservation);