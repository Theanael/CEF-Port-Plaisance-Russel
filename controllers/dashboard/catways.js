const service = require('../../services/catways')
const reservationService = require('../../services/reservations')

exports.getList = async (req,res) => {
    try {
        const catways= await service.getAll();
        return res.render('catways/list', {catways:catways});
    } catch (error) {
        return res.render('error',{message:error.message,error:error})
    };
};

exports.getPage = async (req,res) => {
    const id = req.params.id
    
    try {
        const catway = await service.getOneById(id);
        if (!catway) {
            return res.render('error', {message:"Catway Not Found",error:{status:404}});
        };

        const reservations = await reservationService.getAllByCatway(catway.catwayNumber)
        
        return res.render('catways/page', {catway:catway, reservations:reservations});
    } catch (error) {
        return res.render('error',{message:error.message,error:error})
    };
};

exports.create = async (req,res) => {
    return res.render('catways/create')
}

exports.add = async (req,res) => {
    const newCatway= {
        catwayNumber:req.body.catwayNumber,
        catwayType:req.body.catwayType,
        catwayState:req.body.catwayState
    }
    console.log(newCatway)
    try {
        const catway =await service.add(newCatway)
        return res.redirect('/catways/page/'+catway._id)
    } catch (error) {
        return res.render('error',{message:error.message,error:error})
    }
}

exports.updateState = async (req,res) => {
    const id = req.params.id
    const newState = req.body.catwayState
    try {
        const catway = await service.getOneById(id)
        if (!catway){
            return res.render('error', {message:"Catway Not Found",error:{status:404}});
        }
        await service.updateState(id,newState)
        return res.redirect('/catways/page/'+id)

    } catch (error) {
        return res.render('error',{message:error.message,error:error})
    }
}



exports.delete = async (req,res) => {
    const id = req.params.id
    try {
        const catway = await service.getOneById(id)
        if (!catway){
            return res.render('error', {message:"Catway Not Found",error:{status:404}});
        }
        await service.delete(id)
        return res.redirect('/catways/list')

    } catch (error) {
        return res.render('error',{message:error.message,error:error})
    }
}