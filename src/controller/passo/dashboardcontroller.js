const { Sequelize, Op } = require('sequelize');
var passoController = require('../../models/passo/passo.province.rputotals');
var passoBarangayController = require('../../models/passo/passo.barangay.rputotals');
var passoLGUController = require('../../models/passo/passo.lgu.rputotals');
var passoClassificationController = require('../../models/passo/passo.classification.rputotals');
var parcelQueryController = require('../../models/passo/passo.parcel.query');


exports.getParcelInfo = async (req, res) => {
    try {
        const items = await parcelQueryController.findAll(req.params.pin ? {
            where: {
                pin: req.params.pin
            },
        } : {});
        return res.status(200).json(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

exports.getRPUTotals = async (req, res) => {
    try {
        const items = await passoController.findAll();
        return res.status(200).json(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

exports.getLGUTotals = async (req, res) => {
    try {
        const items = await passoLGUController.findAll(req.params.lguid ? {
            where: {
                lguid: req.params.lguid
            }
        } : {});
        return res.status(200).json(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

exports.getBarangayTotals = async (req, res) => {
    try {
        const items = await passoBarangayController.findAll(req.params.lguid ? {
            where: {
                lguid: req.params.lguid
            }
        } : {});
        return res.status(200).json(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

exports.getSelectedBarangayTotals = async (req, res) => {
    try {
        const items = await passoBarangayController.findAll(req.params.lguid && req.params.objid ? {
            where: {
                lguid: req.params.lguid,
                barangayid: req.params.objid
            }
        } : {});
        return res.status(200).json(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}


exports.getClassificationTotals = async (req,res) => {
    try {
        const items = await passoClassificationController.findAll();
        return res.status(200).json(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}