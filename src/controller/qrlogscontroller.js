var qrlogs = require('../models/qrlogs');
var qrlocations = require('../models/qrlocations');
var jwt = require('jsonwebtoken');

exports.getAll = async (req, res) => {
    try {
        const items = await qrlogs.findAll();
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
        const item = await qrlogs.findOne({
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
    // console.log(req.body);
    // const {
    //     locationid
    // } = req.body.locationid;
    console.log(req.body.locationid);
    const location = await qrlocations.findOne({
        where: {
            locationid: req.body.locationid
        },
    });
    if (location){
        try {
            const item = await qrlogs.create(req.body);
            return res.status(201).json(item);
        } catch (error) {
            return res.status(500).send()
        }
    } else {
         return res.status(500).send("Location ID not found.")
    }

};
exports.update = async (req, res) => {
    try {
        const {
            objid
        } = req.params;
        const [updated] = await qrlogs.update(req.body, {
            where: {
                objid: objid
            }
        });
        if (updated) {
            const updateditem = await qrlogs.findOne({
                where: {
                    objid: objid
                }
            });
            return res.status(200).json(updateditem);
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
        const deleted = await qrlogs.destroy({
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