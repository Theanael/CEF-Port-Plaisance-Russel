const Catway = require('../models/catways')

exports.getAll = async () => {
    const catways=await Catway.find();
    return catways;
}