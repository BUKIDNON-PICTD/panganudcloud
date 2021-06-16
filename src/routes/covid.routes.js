var qrlogscontroller = require("../controller/qrlogscontroller");
var covid19subscriberscontroller = require("../controller/covid19subscriberscontroller");

var vaccinesurveycontroller  = require('../controller/vaccinesurveycontroller');
var prevaccontroller  = require('../controller/covid19dashboard/prevaccontroller');
var vaccinesurveydashboardcontroller  = require('../controller/vaccinesurveydashboardcontroller');

module.exports = (routes) => {
  routes.post("/qrlogs", qrlogscontroller.create);
  routes.post(
    "/covid19subscriber/subscribe",
    covid19subscriberscontroller.subscribe
  );
  routes.post(
    "/covid19subscriber/unsubscribe",
    covid19subscriberscontroller.unsubscribe
  );
  routes.post(
    "/covid19subscriber/checksubscriptionstatus",
    covid19subscriberscontroller.checksubscriptionstatus
  );
  const fakeDatabase = [];

  routes.post("/covid19subscriber/subscribe2", (req, res) => {
    const subscription = req.body;
    fakeDatabase.push(subscription);
  });

  routes.post("/covid19subscriber/sendNotification", (req, res) => {
    const notificationPayload = {
      notification: {
        title: "New Notification",
        body: "This is the body of the notification",
        icon: "assets/icons/icon-512x512.png",
      },
    };

    const promises = [];
    fakeDatabase.forEach((subscription) => {
      promises.push(
        webpush.sendNotification(
          subscription,
          JSON.stringify(notificationPayload)
        )
      );
    });
    Promise.all(promises).then(() => res.sendStatus(200));
  });

  routes.get("/vaccinesurvey", vaccinesurveycontroller.getAll);
  routes.get("/vaccinesurvey/:objid", vaccinesurveycontroller.getById);
  routes.post("/vaccinesurvey", vaccinesurveycontroller.create);
  routes.put("/vaccinesurvey/:objid", vaccinesurveycontroller.update);
  routes.delete("/vaccinesurvey/:objid", vaccinesurveycontroller.delete);
  routes.get(
    "/vaccinesurveydashboard/gettotals",
    vaccinesurveydashboardcontroller.getTotals
  );


  routes.post("/prevac", prevaccontroller.create);
};
