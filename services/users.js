const User = require('../models/users');

const bcrypt = require('bcrypt')

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

exports.authenticate = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Email ou mot de passe incorrect');
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
        throw new Error('Email ou mot de passe incorrect');
    }

    const userData={
        username:user.username,
        email:user.email
    }

    return userData;
};