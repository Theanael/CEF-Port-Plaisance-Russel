const service = require('../../services/catways')

exports.getAll = async (req,res) => {
    try {

        // on récupère la liste des catway et on la retourne.
        const catways= await service.getAll();
        return res.status(200).json(catways);
    } catch (error) {
        return res.status(500).json(error);
    };
};

exports.getOneById = async (req,res) => {
    const id = req.params.id;

    try {
        // on vérifie que le catway existe et on le récupère...
        const catway = await service.getOneById(id);
        if (!catway){
            return res.status(404).json({message:"catway not found"});
        }
        
        // ... puis on le retourne.
        return res.status(200).json(catway);
    } catch (error) {
        return res.status(500).json(error);
    };
};

exports.add = async (req,res) => {
    const newCatway= {
        catwayNumber:req.body.catwayNumber,
        catwayType:req.body.catwayType,
        catwayState:req.body.catwayState
    }

    try {
        // on crée le nouveau catway et on le retourne.
        const catway =await service.add(newCatway);
        return res.status(201).json(catway);
    } catch (error) {
        return res.status(500).json(error)
    };
};

exports.updateState = async (req,res) => {
    const id = req.params.id;
    const newState = req.body.catwayState;

    try {
        // on vérifie que le catway existe et on le récupère...
        const catway = await service.getOneById(id);
        if (!catway){
            return res.status(404).json({message:"catway not found"});
        }
        // ... on le met à jour puis on retourne un message de succès.
        await service.updateState(id,newState);
        return res.status(200).json("catwayState changed");
    } catch (error) {
        return res.status(500).json(error);
    };
};

exports.delete = async (req,res) => {
    const id = req.params.id;

    try {
        // on vérifie que le catway existe 
        const catway = await service.getOneById(id);
        if (!catway){
            return res.status(404).json({message:"catway not found"});
        }
        
        // on le supprime puis on indique le succès de l'opération.
        await service.delete(id);
        return res.status(204);
    } catch (error) {
        return res.status(500).json(error);
    };
};