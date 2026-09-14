const service = require('../../services/catways')

exports.getList = async (req,res) => {
    try {
        const catways= await service.getAll();
        return res.render('catways/list', {catways:catways});
    } catch (error) {
        return res.render('error',{error:error})
    }
}

exports.getPage = async (req,res) => {
    const id = req.params.id
    try {
        const catway = await service.getOneById(id);
        if (!catway) {
            return res.render('error', {error:{}});
        }
        return res.render('catways/page', {catway:catway});
    } catch (error) {
        return res.render('error',{error:error})
    }
}