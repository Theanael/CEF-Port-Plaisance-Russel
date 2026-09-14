const service = require('../../services/catways')

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
        return res.render('catways/page', {catway:catway});
    } catch (error) {
        return res.render('error',{message:error.message,error:error})
    };
};

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
        return res.render('error',{error:error})
    }
}