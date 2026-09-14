const service = require('../../services/catways')

exports.getAll = async (req,res) => {
    try {
        const catways= await service.getAll()
        console.log(catways)
        return res.status(200).json(catways)
    } catch (error) {
        return res.status(500).json(error)
    }
    
}

