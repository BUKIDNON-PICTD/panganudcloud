var covid19subscribers = require('../models/covid19subscribers');


exports.getAll = async (req, res) => {
    try {
        const items = await covid19covid19subscribers.findAll();
        return res.status(200).json(items);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
exports.getById = async (req, res) => {
    try {
        const {
            objid
        } = req.params;
        const item = await covid19covid19subscribers.findOne({
            where: {
                objid: objid
            },
        });
        if (item) {
            return res.status(200).json(item);
        }
        return res.status(404).send("Item with the specified ID does not exists");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
// exports.subscribe = async (req, res) => {
//     try {
//         const item = await covid19covid19subscribers.create(req.body);
//         return res.status(201).json(item);
//     } catch (error) {
//         return res.status(500).send()
//     }
// };

// exports.unsubscribe = async (req, res) => {
//     try {
//         const {
//             id
//         } = req.params;
//         const deleted = await covid19covid19subscribers.destroy({
//             where: {
//                 id: id
//             }
//         });
//         if (deleted) {
//             return res.status(204).send("Item deleted");
//         }
//         throw new Error("Item not found");
//     } catch (error) {
//         return res.status(500).send(error.message);
//     }
// };


exports.subscribe = async (req,res) => {
    try {
     
        const push_access_token = req.body.push_access_token;
        const subscriber = await covid19subscribers.findOne({
            where: { push_access_token: push_access_token },
        });
        if (!subscriber) {
            var newsubscriber = {
                state : 'ACTIVE',
                push_access_token : push_access_token,
            }
            const subscriber = await covid19subscribers.create(newsubscriber);
            return res.status(200).json(subscriber);
        }else {
            const [ updated ] = await covid19subscribers.update({
                state:'ACTIVE',
                push_access_token : push_access_token,
                }, {
                where: { push_access_token: push_access_token }
            });
            if (updated) {
                const updateditem = await covid19subscribers.findOne({ where: { push_access_token: push_access_token } });
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
        const push_access_token = req.body.push_access_token;

        const [ updated ] = await covid19subscribers.update({state:'INACTIVE'}, {
            where: { push_access_token: push_access_token }
        });
        if (updated) {
            const updateditem = await covid19subscribers.findOne({ where: { push_access_token: push_access_token } });
            return res.status(200).json(updateditem);
        }
        throw new Error('Subscriber not found');
        } catch (error) {
        return res.status(500).send(error.message);
        }
};

exports.checksubscriptionstatus = async (req,res) => {
    try {
        const push_access_token = req.body.push_access_token;
        const subscriber = await covid19subscribers.findOne({
            where: { push_access_token: push_access_token },
        });
        if (subscriber) {
            if (subscriber.state == 'ACTIVE'){
                return res.status(200).json({status:'ACTIVE'});
            }
            return res.status(200).json({status:'INACTIVE'});
        }
        throw new Error('Subscriber not found');
    } catch (error) {
        return res.status(500).send(error.message);
    }
};