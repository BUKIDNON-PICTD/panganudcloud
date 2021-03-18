var Item = require('../models/vaccinesurvey_totals');
var ItemAge = require('../models/vaccinesurvey_total_ages');


exports.getTotals = async (req, res) => {
    try {
        const items = await Item.findOne();
        return res.status(200).json(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};


exports.getAgeRange = async (req, res) => {
    try {
        const items = await ItemAge.findAll();
        return res.status(200).json(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

