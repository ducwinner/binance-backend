const { Sequelize } = require("sequelize");

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(
  "da1tqdnslv13li",
  "tzmgzrdyteeuzy",
  "5f1fe3b3c12448dcfc8c897de43ea1798cdb87a68d7db8ed6ef76bdaf36fdfac",
  {
    host: "ec2-3-213-228-206.compute-1.amazonaws.com",
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);
let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = connectDB;
