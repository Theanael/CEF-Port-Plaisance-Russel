const service = require('../../services/catways')

exports.getAll = async (req,res) => {
    try {
        const catways= await service.getAll()
        return res.status(200).json(catways)
    } catch (error) {
        return res.status(500).json(error)
    }
    
}

exports.getOneById = async (req,res) => {
    try {
        const catway = await service.getOneById(req.params.id)
        if (!catway){
            return res.status(404).json({message:"catway not found"})
        }
        return res.status(200).json(catway)
    } catch (error) {
        return res.status(500).json(error)
    }
}

exports.add = async (req,res) => {

    const newCatway= {
        catwayNumber:req.body.catwayNumber,
        catwayType:req.body.catwayType,
        catwayState:req.body.catwayState
    }

    try {
        const catway =await service.add(newCatway)
        return res.status(200).json(catway)
    } catch (error) {
        return res.status(500).json(error)
    }
}