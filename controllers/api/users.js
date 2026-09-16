const service = require('../../services/users')


exports.getAll = async (req,res) => {
    try {
        const catways= await service.getAll()
        return res.status(200).json(catways)
    } catch (error) {
        return res.status(500).json(error)
    }
}
