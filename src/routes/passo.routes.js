var passoDashboardController  = require('../controller/passo/dashboardcontroller');


module.exports = (routes) => {
    routes.get('/passodashboard', passoDashboardController.getRPUTotals);
    routes.get('/passodashboard/lgus', passoDashboardController.getLGUTotals);
    routes.get('/passodashboard/lgus/:lguid', passoDashboardController.getLGUTotals);
    routes.get('/passodashboard/barangays/:lguid', passoDashboardController.getBarangayTotals);
    routes.get('/passodashboard/barangays/:lguid/:objid', passoDashboardController.getSelectedBarangayTotals);
    routes.get('/passodashboard/classifications', passoDashboardController.getClassificationTotals);

    routes.get('/passodashboard/parcel/:pin', passoDashboardController.getParcelInfo);
};
