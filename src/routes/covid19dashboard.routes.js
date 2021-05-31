var covid19dashboardcontroller = require("../controller/covid19dashboard/covid19dashboardcontroller");

module.exports = (routes,cache) => {
  routes.get("/bukidnoncovid19_view_summary",  covid19dashboardcontroller.bukidnoncovid19_view_summary);
  routes.get("/bukidnoncovid19_view_municipality_dashboard", cache.route({ name: 'bukidnoncovid19_view_municipality_dashboard' , expire: 18000}), covid19dashboardcontroller.bukidnoncovid19_view_municipality_dashboard);
  routes.get("/bukidnoncovid19_view_by_municipality_summary", covid19dashboardcontroller.bukidnoncovid19_view_by_municipality_summary);
  routes.get("/bukidnoncovid19_view_agegroup_summary",  covid19dashboardcontroller.bukidnoncovid19_view_agegroup_summary);
};
