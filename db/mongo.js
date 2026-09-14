const mongoose = require('mongoose');

exports.initClientDbConnection = async () => {
    try {
        await mongoose.connect(process.env.URL_MONGO) 
        console.log("Connected");
    }
    catch (error) {
        console.log(error); 
        throw error;
    }
} 