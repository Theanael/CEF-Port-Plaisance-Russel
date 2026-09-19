const User = require('../models/users');

const bcrypt = require('bcrypt');

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
    // on récupère l'utilisateur
    const user = await User.findOne({email:email});
    
    // s'il existe...
    if (user) {
        // on parcours les changements requis et s'ils ne sont pas vides on les applique à l'objet utilisateur
        Object.entries(changes).forEach(([key, field]) => {
            if (field != '' && field !=undefined) {
                user[key] = field;
            }
        });
        // on utilise save() plutôt qu'un simple updateOne pour activer le chiffrement du mot de passe sur pre('save').
        await user.save();
    }
}

exports.delete = async(email)=> {
    await User.deleteOne({email:email});
    return;
}

exports.authenticate = async (email, password) => {
    // on vérifie que l'utilisateur existe et on le récupère.
    const user = await User.findOne({ email:email });
    if (!user) {
        throw new Error('Email ou mot de passe incorrect');
    }

    // on vérifie que le mot de passe de l'utilisateur correspond à celui envoyé. 
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        throw new Error('Email ou mot de passe incorrect');
    }

    // on renvoie les données utiles de l'utilisateur.
    const userData={username:user.username,email:user.email};
    return userData;
};