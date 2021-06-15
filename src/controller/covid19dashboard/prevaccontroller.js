var Item = require("../../models/covid19dashboard/prevac");
const { QueryTypes } = require("sequelize");
const db = require("../../config/tagabukidgisdb");
const { Op } = require("sequelize");
const moment = require("moment");
const { NodeSSH } = require("node-ssh");
const ssh = new NodeSSH();

exports.getAll = async (req, res) => {
  try {
    const items = await Item.findAll();
    return res.status(200).json(items);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
exports.getById = async (req, res) => {
  try {
    const { objid } = req.params;
    const item = await Item.findOne({
      where: {
        objid: objid,
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
exports.create = async (req, res) => {
  try {
    const { address_municipality_code } = req.body;

    const result = await db.query(
      `SELECT xx.* FROM 
        (SELECT s.*,(SELECT COUNT(*) FROM bukidnoncovid19_prevacs WHERE scheddate = s.scheddate) as totalregistered FROM bukidnoncovid19_prevacsched s
        ORDER BY scheddate ASC) xx
        WHERE xx.numberofdoses > xx.totalregistered AND xx.municipality_code = :municipality_code AND xx.scheddate >= DATE(NOW())
        LIMIT 1`,
      {
        replacements: {
          municipality_code: address_municipality_code,
        },
        type: QueryTypes.SELECT,
      }
    );
    if (result.length > 0) {

      req.body.scheddate = result[0].scheddate;


      const registered = await Item.findOne({
        where: {
          lastname: req.body.lastname,
          firstname: req.body.firstname,
          scheddate: new Date(result[0].scheddate)
        },
      });
    
      if(registered) {
        return res.status(500).send("Profile already registered for " + result[0].scheddate);
      }

      const item = await Item.create(req.body);
      const message = "FROM: covid19.bukidnon.gov.ph. You are registered for vaccination on " + result[0].scheddate + " 8AM to 2PM only. NAME:" + item.lastname + ", " + item.firstname + " | " + moment(item.birthdate).format('MM-DD-YYYY') + " | " + item.gender + " | " + item.prioritygroup + " | " + item.address_barangay_lguname + ", " + item.address_street;
      const mobileno = "+63"+item.mobileno.substring(1);
      if (item) {
        ssh
        .connect({
          host: global.gConfig.smsserver,
          username: "root",
          privateKey: "./.ssh/id_rsa",
        })
        .then(function () {
          ssh
            .execCommand(
              '/home/administrator/smsgateway/scripts/sendsms.sh -m="' +
                message +
                '" -n="' +
                mobileno +
                '"'
            )
            .then(function (result) {
              let datesent = new Date();
              result = result.stdout.split("\n");
              console.log("STDOUT: " + result);
              return res
                .status(200)
                .json({ message: result, timestamp: datesent });
            });
        });
      }
      return res.status(201).json(item);
    }
    return res.status(500).send("No Schedule/ Slot is Available")
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
exports.update = async (req, res) => {
  try {
    const { objid } = req.params;
    const [updated] = await Item.update(req.body, {
      where: {
        objid: objid,
      },
    });
    if (updated) {
      const updateditem = await Item.findOne({
        where: {
          objid: objid,
        },
      });
      return res.status(200).json(updateditem);
    }
    throw new Error("Item not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.delete = async (req, res) => {
  try {
    const { objid } = req.params;
    const deleted = await Item.destroy({
      where: {
        objid: objid,
      },
    });
    if (deleted) {
      return res.status(204).send("Item deleted");
    }
    throw new Error("Item not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
