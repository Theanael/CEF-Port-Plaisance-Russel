const service = require('../../services/catways');
const reservationService = require('../../services/reservations');

exports.getList = async (req,res) => {
    try {
        // on récupère la liste des catways et on l'affiche.
        const catways= await service.getAll();
        return res.render('catways/list', {catways:catways});
    } catch (error) {
        return res.render('error',{message:error.message,error:error});
    };
};

exports.getPage = async (req,res) => {
    const id = req.params.id;
    try {
        // on vérifie qule le catway existe et on le récupère.
        const catway = await service.getOneById(id);
        if (!catway) {
            return res.render('error', {message:"Catway Not Found",error:{status:404}});
        };

        // on récupère la liste des réservations du catway.
        const reservations = await reservationService.getAllByCatway(catway.catwayNumber);
        
        // on affiche les informations du catway et ses réservations.
        return res.render('catways/page', {catway:catway, reservations:reservations});
    } catch (error) {
        return res.render('error',{message:error.message,error:error});
    };
};

exports.create = async (req,res) => {
    // on affiche le formulaire de création de catway.
    return res.render('catways/create');
};

exports.add = async (req,res) => {
    const newCatway= {
        catwayNumber:req.body.catwayNumber,
        catwayType:req.body.catwayType,
        catwayState:req.body.catwayState
    };

    try {
        // on crée le nouveau catway puis on redirige vers sa page.
        const catway =await service.add(newCatway);
        return res.redirect('/catways/'+catway._id+'/page');
    } catch (error) {
        return res.render('error',{message:error.message,error:error});
    };
};

exports.updateState = async (req,res) => {
    const id = req.params.id;
    const newState = req.body.catwayState;
    try {
        // on vérife que le catway existe.
        const catway = await service.getOneById(id);
        if (!catway){
            return res.render('error', {message:"Catway Not Found",error:{status:404}});
        };

        // on applique les changements puis on recharge la page.
        await service.updateState(id,newState);
        return res.redirect('/catways/'+id+'/page');
    } catch (error) {
        return res.render('error',{message:error.message,error:error});
    };
};



exports.delete = async (req,res) => {
    const id = req.params.id;
    try {
        // on vérife que le catway existe
        const catway = await service.getOneById(id);
        if (!catway){
            return res.render('error', {message:"Catway Not Found",error:{status:404}});
        };

        // on supprime le catway puis on redirige vers la liste des catways.
        await service.delete(id);
        return res.redirect('/catways/list');

    } catch (error) {
        return res.render('error',{message:error.message,error:error});
    };
};