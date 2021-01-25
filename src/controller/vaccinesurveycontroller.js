var Item = require('../models/vaccinesurvey');


exports.getAll = async (req, res) => {
    try {
        const items = await Item.findAll();
        return res.status(200).json(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
exports.getById = async (req, res) => {
    try {
        const {
            objid
        } = req.params;
        const item = await Item.findOne({
            where: {
                objid: objid
            },
        });
        if (item) {
            return res.status(200).json(item);
        }
        return res.status(404).send("Item with the specified ID does not exists");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
exports.create = async (req, res) => {
    try {
        await Item.create(req.body);
        return res.status(201).json(201);
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};
exports.update = async (req, res) => {
    try {
        const {
            objid
        } = req.params;
        const [updated] = await Item.update(req.body, {
            where: {
                objid: objid
            }
        });
        if (updated) {
            const updateditem = await Item.findOne({
                where: {
                    objid: objid
                }
            });
            return res.status(200).json(200);
        }
        throw new Error('Item not found');
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.delete = async (req, res) => {
    try {
        const {
            objid
        } = req.params;
        const deleted = await Item.destroy({
            where: {
                objid: objid
            }
        });
        if (deleted) {
            return res.status(204).send("Item deleted");
        }
        throw new Error("Item not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};