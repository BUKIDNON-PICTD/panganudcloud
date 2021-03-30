const Sequelize = require("sequelize");
const db = require("../../config/tagabukidgisdb.js");

const Covid19SymptomsDashboard = db.define(
  "vw_bukidnoncovid19_symptoms",
  {
    address_muncity: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    totalconfirmed: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    totalsymptomatic: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    totalasymptomatic: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "vw_bukidnoncovid19_symptoms",
    timestamps: false,
  }
);

Covid19SymptomsDashboard.removeAttribute("id");

module.exports = Covid19SymptomsDashboard;
