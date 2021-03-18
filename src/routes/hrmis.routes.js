
// HRMIS
var hrmispdsdashboardcontroller  = require('./controller/hrmis/HRMISPDSDashboardcontroller');


module.exports = (routes) => {

// HRMIS

routes.get('/hrmispdsdashboard/gettotals', hrmispdsdashboardcontroller.getTotals);
routes.get('/hrmispdsdashboard/getofficetotal', hrmispdsdashboardcontroller.getOfficeTotal);
routes.get('/hrmispdsdashboard/getpositiontotal', hrmispdsdashboardcontroller.getPositionTotal);
routes.get('/hrmispdsdashboard/getagegrouptotal', hrmispdsdashboardcontroller.getAgeGroupTotal);
routes.get('/hrmispdsdashboard/geteligibilitytotal', hrmispdsdashboardcontroller.getEligibilityTotal);

};

