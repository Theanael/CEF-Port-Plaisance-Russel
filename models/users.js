const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const User = mongoose.Schema({
    username:{type:String,required:true, trim:true},
    email:{type:String,required:true,unique:true, trim:true},
    password:{type:String,required:true, trim:true},
    
})

User.pre('save', async function() {
    if(!this.isModified('password')){
        return;
    }
    this.password = await bcrypt.hash(this.password, 10);
})

module.exports = mongoose.model('User',User);