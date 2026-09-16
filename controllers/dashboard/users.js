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