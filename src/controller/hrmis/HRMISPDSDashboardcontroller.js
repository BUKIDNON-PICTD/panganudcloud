var Item = require('../../models/hrmis/hrmis_pds_totals');
var ItemOfficeTotal = require('../../models/hrmis/hrmis_office_totals');
var ItemPositionTotal = require('../../models/hrmis/hrmis_position_totals');
var ItemAgeGroupTotal = require('../../models/hrmis/hrmis_agegroup_totals');
var ItemEligibilityTotal = require('../../models/hrmis/hrmis_eligibility_totals');


exports.getTotals = async (req, res) => {
    try {
        const items = await Item.findOne();
        return res.status(200).json(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getOfficeTotal = async (req, res) => {
    try {
        const items = await ItemOfficeTotal.findAll();
        return res.status(200).json(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getPositionTotal = async (req, res) => {
    try {
        const items = await ItemPositionTotal.findAll();
        return res.status(200).json(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getAgeGroupTotal = async (req, res) => {
    try {
        const items = await ItemAgeGroupTotal.findAll();
        return res.status(200).json(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getEligibilityTotal = async (req, res) => {
    try {
        const items = await ItemEligibilityTotal.findOne();
        return res.status(200).json(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

