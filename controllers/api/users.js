const service = require('../../services/users');
const jwt = require('jsonwebtoken');

exports.getAll = async (req,res) => {
    try {
        // on récupère la liste des utilisateurs et on la retourne.
        const users= await service.getAll();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json(error);
    };
};

exports.getOneByEmail = async (req,res) => {
    const email = req.params.email;

    try {
        // on vérifie que l'utilisateur existe et on le récupère.
        const user = await service.getOneByEmail(email);
        if (!user){
            return res.status(404).json({message:"user not found"});
        };

        // on le retourne.
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json(error);
    };
};

exports.add = async (req,res) => {
    const newUser= {
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
    };
    try {
        const user =await service.add(newUser);
        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json(error);
    };
};

exports.update = async (req,res) => {
    const email = req.params.email;
    // l'email ne peut pas être changé pour des raisons évidentes
    const changes = {
        username:req.body.username,
        password:req.body.password
    };

    try {
        // on vérifie que l'utilisateur existe.
        const user = await service.getOneByEmail(email);
        if (!user){
            return res.status(404).json({message:"user not found"});
        }


        // on applique les modifications et on retourne le succès de l'opération.
        await service.update(email,changes);
        return res.status(200).json("user updated");

    } catch (error) {
        return res.status(500).json(error);
    };
};

exports.delete = async (req,res) => {
    const email = req.params.email;

    try {
        // on vérifie que l'utilisateur existe.
        const user = await service.getOneByEmail(email);
        if (!user){
            return res.status(404).json({message:"user not found"});
        };

        // on supprime l'utilisateur et on retourne le succès de l'opération.
        await service.delete(email);
        return res.status(204).json();
    } catch (error) {
        return res.status(500).json(error);
    };
};


exports.login = async (req,res) => {
    const email=req.body.email;
    const password=req.body.password;

    try {
        // on vérifie la validité du login
        const user = service.authenticate(email,password);

        // on crée un token contennant l'utilisateur
        const token = jwt.sign(
            {user: user},
            process.env.SECRET_KEY,
            {expiresIn: '24h'}
        );

        // on ajoute le token au header avant de le retourner le succès de l'authentification.
        res.header('Authorization','Bearer '+token);
        return res.status(200).json('authenticate_succed');
    } catch (error) {
        return res.render('error',{message:error.message,error:error});
    };
};