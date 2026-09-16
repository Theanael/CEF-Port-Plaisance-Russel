const User = require('../models/users');

exports.getAll = async () => {
    const users = User.find();
    return users;
}

exports.getOneById = async (id) => {
    const user = User.findById(id);
    return user;
}