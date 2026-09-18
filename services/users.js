const User = require('../models/users');

const bcrypt = require('bcrypt')

exports.getAll = async () => {
    const users = await User.find();
    return users;
}

exports.getOneByEmail = async (email) => {
    const user = await User.findOne({email:email});
    return user;
}

exports.add = async (newUser) => {
    const user = await User.create(newUser);
    return user;
}

exports.update = async(email,changes)=> {
    const user = await User.findOne({email:email});

    if (user) {
        Object.entries(changes).forEach(([key, field]) => {
            if (field != '' && field !=undefined) {
                user[key] = field;
            }
        });
        console.log(user)
        await user.save();
    }
}

exports.delete = async(email)=> {
    await User.deleteOne({email:email});
    return;
}

exports.authenticate = async (email, password) => {
    const user = await User.findOne({ email:email });

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