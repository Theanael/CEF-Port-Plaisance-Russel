const service = require('../../services/users');

exports.getList = async (req,res) => {
    try {
        // on récupère la liste des utilisateurs et on l'affiche.
        const users= await service.getAll();
        return res.render('users/list', {users:users});
    } catch (error) {
        return res.render('error',{message:error.message,error:error})
    };
};

exports.getPage = async (req,res) => {
    const email = req.params.email
    
    try {
        /// on vérifie que l'utilisateur existe et on le récupère.
        const user = await service.getOneByEmail(email);
        if (!user) {
            return res.render('error', {message:"User Not Found",error:{status:404}});
        };
        
        // on affiche la page de l'utilisateur.
        return res.render('users/page', {user:user});
    } catch (error) {
        return res.render('error',{message:error.message,error:error})
    };
};

exports.create = async (req,res) => {
    // on affiche le formulaire de création.
    return res.render('users/create')
}

exports.add = async (req,res) => {
    const newUser= {
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
    }

    try {
        // on crée l'utilisateur et on redirige vers sa page.
        const user = await service.add(newUser)
        return res.redirect('/users/'+user.email+'/page')
    } catch (error) {
        return res.render('error',{message:error.message,error:error})
    }
}

exports.update = async (req,res) => {
    console.log("boop")
    const email = req.params.email
    const changes = {
        username:req.body.username,
        password:req.body.password
    }
    try {
        // on vérifie que l'utilisateur existe.
        const user = await service.getOneByEmail(email)
        if (!user){
            return res.render('error', {message:"User Not Found",error:{status:404}});
        }

        // on applique les changements et on recharge la page.
        await service.update(email,changes);
        return res.redirect('/users/'+email+'/page');

    } catch (error) {
        return res.render('error',{message:error.message,error:error})
    }
}

exports.delete = async (req,res) => {
    const email = req.params.email
    try {
        // on vérifie que l'utilisateur existe.
        const user = await service.getOneByEmail(email)
        if (!user){
            return res.render('error', {message:"Catway Not Found",error:{status:404}});
        }
        
        // on supprime l'utilisateur et on reviens à la liste des utilisateurs.
        await service.delete(email)
        return res.redirect('/users/list')

    } catch (error) {
        return res.render('error',{message:error.message,error:error})
    }
}

exports.login = async(req,res) => {
    const email=req.body.email;
    const password=req.body.password;

    try {
        // on essaie d'authentifier l'utilisateur
        const user = await service.authenticate(email,password);

        // on stocke les données utilisateurs dans la session puis on redirige vers la page d'accueil.
        req.session.user = user
        res.redirect('/')
    } catch (error) {
        return res.render('loginPage',{message:error.message,error:error})
    }
}

exports.logout = async(req,res) => {
    // on supprime les données utilisateurs de la session puis on redirige vers la page d'accueil (qui affichera la page de connexion).
    delete req.session.user;
    res.redirect('/')
    
}