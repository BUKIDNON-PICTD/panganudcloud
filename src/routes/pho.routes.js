
var PHODashboardcontroller  = require('../controller/pho/PHODashboardcontroller');


module.exports = (routes) => {

routes.get('/phodashboard', PHODashboardcontroller.getSymptomsDashboardData);

};

