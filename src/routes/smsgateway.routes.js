
var smsgatewaycontroller  = require('../controller/smsgateway/smsgatewaycontroller');


module.exports = (routes) => {
routes.post('/smsgateway/sendsms', smsgatewaycontroller.sendsms);
routes.post('/smsgateway/notifySubscribers', smsgatewaycontroller.notifySubscribers);

};

