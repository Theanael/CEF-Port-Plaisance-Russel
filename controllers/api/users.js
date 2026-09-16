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

exports.add = async (req,res) => {
    const newUser= {
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
    }
    try {
        const user =await service.add(newUser)
        return res.status(201).json(user)
    } catch (error) {
        return res.status(500).json(error)
    }
}

exports.update = async (req,res) => {
    const id = req.params.id
    // l'email ne peut pas être changé pour des raisons évidentes
    const changes = {
        username:req.body.username,
        password:req.body.password
    }
    try {
        const user = await service.getOneById(id)
        if (!user){
            return res.status(404).json({message:"user not found"})
        }
        await service.update(id,changes)
        return res.status(200).json("user updated")

    } catch (error) {
        return res.status(500).json(error)
    }
}