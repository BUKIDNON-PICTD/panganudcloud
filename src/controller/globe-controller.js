var Subscribers = require('../models/subscribers');
var request = require("request");
exports.getAll = async (req, res) => {
    try {
      const subscribers = await Subscribers.findAll();
      return res.status(200).json(subscribers);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };
exports.getById = async (req, res) => {
try {
    const { id } = req.params;
    const subscriber = await Subscribers.findOne({
    where: { id: id },
    });
    if (subscriber) {
    return res.status(200).json(subscriber);
    }
    return res.status(404).send("Subscriber with the specified ID does not exists");
} catch (error) {
    return res.status(500).send(error.message);
}
};
exports.create = async (req, res) => {
try {
    const subscriber = await Subscribers.create(req.body);
    return res.status(201).json(subscriber);
} catch (error) {
    return res.status(500).json({ error: error.message });
}
};
exports.update = async (req, res) => {
    try {
    const { id } = req.params;
    const [ updated ] = await Subscribers.update(req.body, {
        where: { id: id }
    });
    if (updated) {
        const updateditem = await Subscribers.findOne({ where: { id: id } });
        return res.status(200).json(updateditem);
    }
    throw new Error('Subscriber not found');
    } catch (error) {
    return res.status(500).send(error.message);
    }
};

exports.delete = async (req, res) => {
    try {
    const { id } = req.params;
    const deleted = await Subscribers.destroy({
        where: { id: id }
    });
    if (deleted) {
        return res.status(204).send("Subscriber deleted");
    }
    throw new Error("Subscriber not found");
    } catch (error) {
    return res.status(500).send(error.message);
    }
};

exports.subscribe = async (req,res) => {
    console.log(req.query);
    try {
        const subscriber_number = req.query.subscriber_number;
        const subscriber = await Subscribers.findOne({
        where: { mobile_number: subscriber_number },
        });
        if (!subscriber) {
            var newsubscriber = {
                state : 'ACTIVE',
                mobile_number : req.query.subscriber_number,
                access_token : req.query.access_token,
            }
            const subscriber = await Subscribers.create(newsubscriber);
            return res.status(200).json(subscriber);
        }else {
            const [ updated ] = await Subscribers.update({state:'ACTIVE',access_token:req.query.access_token}, {
                where: { mobile_number: subscriber_number }
            });
            if (updated) {
                const updateditem = await Subscribers.findOne({ where: { mobile_number: subscriber_number } });
                return res.status(200).json(updateditem);
            }
            return res.status(404).send("Subscriber already exists");
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
exports.unsubscribe = async (req,res) => {
    console.log(req.body);
    try {
        const subscriber_number = req.body.unsubscribed["subscriber_number"];

        const [ updated ] = await Subscribers.update({state:'INACTIVE'}, {
            where: { mobile_number: subscriber_number }
        });
        if (updated) {
            const updateditem = await Subscribers.findOne({ where: { mobile_number: subscriber_number } });
            return res.status(200).json(updateditem);
        }
        throw new Error('Subscriber not found');
        } catch (error) {
        return res.status(500).send(error.message);
        }
};
exports.receiveSMS = (req,res) => {
    console.log(req.body);
};

exports.notifyAllSubscribers = async (req,res) => {
    console.log(req.body);
    try {
        const subscribers = await Subscribers.findAll({
            where: {
              state: 'ACTIVE'
            }
          });
        const shortcode = global.gConfig.globelabsshortcode;
        const senderaddress = shortcode.substr(shortcode.length - 4);  

       
        subscribers.forEach( subscriber => {
            var apiurl = "https://devapi.globelabs.com.ph/smsmessaging/v1/outbound/"+senderaddress+"/requests?access_token=" + subscriber.access_token;
            var message = {
                outboundSMSMessageRequest : {
                    clientCorrelator: req.body.eventid + subscriber.id,
                    senderAddress : senderaddress,
                    outboundSMSTextMessage: 
                        {
                            message: req.body.message
                        },
                    address : '0'+subscriber.mobile_number

                }
            }
            console.log(message);
            request.post(
                {
                  url: apiurl,
                  json: message,
                  timeout: 5000
                },
                function(error, response, body) {
               
                    console.log("message sent");
                    console.log(body);
               
                }
              );
        });  
        return res.status(200).json(subscribers);
      } catch (error) {
        return res.status(500).send(error.message);
      }
};