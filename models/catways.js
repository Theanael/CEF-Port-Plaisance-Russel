const mongoose = require('mongoose');

const Catway = mongoose.Schema({

    catwayNumber:{type:Number,required:true,unique:true},
    catwayType:{type:String,required:true,enum:['short','long']},
    catwayState:{type:String,trim:true}
})

module.exports = mongoose.model('Catway',Catway);