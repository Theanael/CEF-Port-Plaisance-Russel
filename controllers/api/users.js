const service = require('../../services/users')


exports.getAll = async (req,res) => {
    try {
        const users= await service.getAll()
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json(error)
    }
}

exports.getOneById = async (req,res) => {
    const id = req.params.id
    try {
        const user = await service.getOneById(id)
        if (!user){
            return res.status(404).json({message:"user not found"})
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json(error)
    }
}
