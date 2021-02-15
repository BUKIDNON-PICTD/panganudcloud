var Item = require('../models/vaccinesurvey_totals');


exports.getTotals = async (req, res) => {
    try {
        const item = await Item.findOne();
        return res.status(200).json(item);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

