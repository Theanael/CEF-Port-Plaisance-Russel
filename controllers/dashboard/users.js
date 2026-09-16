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