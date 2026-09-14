const service = require('../../services/catways')

exports.getList= async (req,res) => {
    try {
        const catways= await service.getAll()
        return res.render('catways/list', {catways:catways})
    } catch (error) {
        return res.status(500).json(error)
    }
}