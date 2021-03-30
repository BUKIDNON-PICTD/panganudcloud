var phodashboardcontroller  = require('../controller/pho/phodashboardcontroller');


module.exports = (routes) => {
    routes.get('/phodashboardcontroller', phodashboardcontroller.getAll);
};

