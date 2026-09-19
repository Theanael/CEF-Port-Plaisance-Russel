const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const homeController=require('../controllers/dashboard/home')

exports.checkJWT = async (req,res, next) =>{
    // on récupère notre token,on vérifie qu'il a le bon en-tête puis on retire l'en-tête.
    let token = req.headers['x-access-token'] ||req.headers['authorization'];
    if (!!token && token.startsWith('Bearer')){
        token = token.slice(7,token.length);
    } 

    // si on a un token
    if (token) {
        // on le vérifie
        jwt.verify(token, SECRET_KEY, (err,decoded) =>{
            if (err) {
                // si le token est invalide on renvoie une erreur.
                return res.status(401).json('token_not_valid');
            } else {
                // si le token est valide on reconstruit un token et on le remets dans le header et on continue.
                req.decoded = decoded;
                const expiresIn = 24 * 60 * 60;
                const newToken = jwt.sign(
                    {user : decoded.user},
                    SECRET_KEY,
                    {expiresIn:expiresIn}
                );
                res.header('Authorization','Bearer '+newToken)
                next()
            }
        });
    } else {
        return res.status(401).json('token required');
    }
}

exports.checkCookie = async (req,res,next) => {
    // on récupère l'utilisateur dans la session
    let user = req.session.user;
    // s'il n'y a pas d'utilisateur on redirige vers "/" puis on affiche la page de login
    if(!user){
        if(req.url=='/') {
            return res.render('loginPage')
        }

        return res.redirect('/')
    }
    // sinon on continue
    next();
}
