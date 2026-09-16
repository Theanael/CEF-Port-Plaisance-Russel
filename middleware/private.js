/**
 * @module private
 */

const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

exports.checkJWT = async (req,res, next) =>{
    let token = req.headers['x-access-token'] ||req.headers['authorization'];
    if (!!token && token.startsWith('Bearer')){
        token = token.slice(7,token.length);
    } 

    if (token) {
        jwt.verify(token, SECRET_KEY, (err,decoded) =>{
            if (err) {
                return res.status(401).json('token_not_valid');
            } else {
                req.decoded = decoded;
                const expiresIn = 24 * 60 * 60;
                const newToken = jwt.sign(
                    {user : decoded.user},
                SECRET_KEY,
                {expiresIn:expiresIn});
                res.header('Authorization','Bearer '+newToken)
                next()
            }
        });
    } else {
        return res.status(401).json('token required');
    }
}

/**
 * Vérifie qu'un utilisateur est authentifié via une session.
 * Sinon, l'utilisateur est redirigé vers la page de connexion.
 *
 * @param {Request} req Requête HTTP Express.
 * @param {Response} res Réponse HTTP Express.
 * @param {NextFunction} next Fonction permettant de passer au middleware suivant.
 * @returns {void}
 */


exports.checkCookies = async (req,res,next) => {
    if (req.session.user) {
        next()
    } else {
        res.render('login')
    }
}