var covid19dashboardcontroller = require("../controller/covid19dashboard/covid19dashboardcontroller");

module.exports = (routes, cache) => {
  routes.get(
    "/bukidnoncovid19_view_summary",
    covid19dashboardcontroller.bukidnoncovid19_view_summary
  );
  routes.get(
    "/bukidnoncovid19_view_municipality_dashboard",
    function (req, res, next) {
      res.express_redis_cache_name = "bukidnoncovid19_view_municipality_dashboard-" + req.query.muncity;
      next();
    },
    cache.route({expire:18000}),
    covid19dashboardcontroller.bukidnoncovid19_view_municipality_dashboard
  );
  routes.get(
    "/bukidnoncovid19_view_by_municipality_summary",
    covid19dashboardcontroller.bukidnoncovid19_view_by_municipality_summary
  );
  routes.get(
    "/bukidnoncovid19_view_agegroup_summary",
    covid19dashboardcontroller.bukidnoncovid19_view_agegroup_summary
  );
  routes.get(
    "/getadar",
    covid19dashboardcontroller.getadar
  );
};
