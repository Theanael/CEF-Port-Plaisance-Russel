const service = require('../../services/users');

exports.getList = async (req,res) => {
    try {
        // on récupère la liste des utilisateurs et on l'affiche
        const users= await service.getAll();
        return res.render('users/list', {users:users});

    } catch (error) {
        return res.render('error',{message:error.message,error:error})
    };
};

exports.getPage = async (req,res) => {
    const id = req.params.id
    
    try {
        /// on vérifie que l'utilisateur existe et on le récupère
        const user = await service.getOneById(id);
        if (!user) {
            return res.render('error', {message:"User Not Found",error:{status:404}});
        };
        
        // on affiche la page de l'utilisateur
        return res.render('users/page', {user:user});
    } catch (error) {
        return res.render('error',{message:error.message,error:error})
    };
};

exports.create = async (req,res) => {
    // on affiche le formulaire de création
    return res.render('users/create')
}

exports.add = async (req,res) => {
    const newUser= {
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
    }

    try {
        // on crée l'utilisateur et on redirige vers sa page
        const user = await service.add(newUser)
        return res.redirect('/users/'+user._id+'/page')
    } catch (error) {
        return res.render('error',{message:error.message,error:error})
    }
}

exports.update = async (req,res) => {
    const id = req.params.id
    const changes = {
        username:req.body.username,
        password:req.body.password
    }
    try {
        // on vérifie que l'utilisateur existe
        const user = await service.getOneById(id)
        if (!user){
            return res.render('error', {message:"User Not Found",error:{status:404}});
        }

        // on applique les changements et on recharge la page
        await service.update(id,changes)
        return res.redirect('/users/'+id+'/page')

    } catch (error) {
        return res.render('error',{message:error.message,error:error})
    }
}