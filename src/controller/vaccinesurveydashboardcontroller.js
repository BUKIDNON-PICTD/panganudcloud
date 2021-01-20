var Item = require('../models/vaccinesurvey_totals');


exports.getTotals = async (req, res) => {
    try {
        const items = await Item.findOne();
        return res.status(200).json(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

