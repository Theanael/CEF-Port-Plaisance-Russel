const Catway = require('../models/catways')

exports.getAll = async () => {
    const catways=await Catway.find();
    return catways;
}

exports.getOneById = async (id) => {
    const catway=await Catway.findById(id)
    return catway;
}

exports.add = async (newCatway) => {
    const catway=await Catway.create(newCatway);
    return catway;
}
