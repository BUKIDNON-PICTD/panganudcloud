var Covid19SymptomsDashboard = require('../../models/pho/bukidnoncovid19_symptoms');


exports.getSymptomsDashboardData = async (req, res) => {
    try {
        const items = await Covid19SymptomsDashboard.findAll();
        return res.status(200).json(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
