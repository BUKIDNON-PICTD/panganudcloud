// var Item = require('../models/vaccinesurvey_totals');
var Item = require('../../models/hrmis/hrmis_pds_totals');
var ItemOfficeJO = require('../../models/hrmis/hrmis_office_jo_totals');
var ItemOfficeCasual = require('../../models/hrmis/hrmis_office_casual_totals');


exports.getTotals = async (req, res) => {
    try {
        const items = await Item.findOne();
        return res.status(200).json(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getOfficeCasual = async (req, res) => {
    try {
        const items = await ItemOfficeCasual.findAll();
        return res.status(200).json(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.getOfficeJO = async (req, res) => {
    try {
        const items = await ItemOfficeJO.findAll();
        return res.status(200).json(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};


// exports.getAgeRange = async (req, res) => {
//     try {
//         const items = await ItemAge.findAll();
//         return res.status(200).json(items);
//     } catch (error) {
//         return res.status(500).send(error.message);
//     }
// };

