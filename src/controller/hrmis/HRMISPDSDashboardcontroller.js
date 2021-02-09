var Item = require('../../models/hrmis/hrmis_pds_totals');
var ItemOfficeTotal = require('../../models/hrmis/hrmis_office_totals');
var ItemPositionTotal = require('../../models/hrmis/hrmis_position_totals');


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


// exports.getAgeRange = async (req, res) => {
//     try {
//         const items = await ItemAge.findAll();
//         return res.status(200).json(items);
//     } catch (error) {
//         return res.status(500).send(error.message);
//     }
// };

