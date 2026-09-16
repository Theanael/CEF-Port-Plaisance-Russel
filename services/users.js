const User = require('../models/users');

exports.getAll = async () => {
    const users = await User.find();
    return users;
}

exports.getOneById = async (id) => {
    const user = await User.findById(id);
    return user;
}

exports.add = async (newUser) => {
    const user = await User.create(newUser);
    return user;
}

exports.update = async(id,changes)=> {
    const user = await User.findById(id);

    if (user) {
        Object.entries(changes).forEach(([key, field]) => {
            if (field != '') {
                user[key] = field;
            }
        });
        await user.save();
    }
}

exports.delete = async(id)=> {
    await User.deleteOne({_id:id});
    return;
}