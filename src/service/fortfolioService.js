import { raw } from "body-parser";
import db from "../models/index";
require("dotenv").config();

let getDataFortfolio = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataFortfolio = {};
      console.log(userId);
      let fortfolio = await db.fortfolios.findAll({
        where: { userId: userId },
      });

      if (fortfolio.length == 0) {
        dataFortfolio.message = "not match userId";
      } else {
        dataFortfolio.message = "oke";
        dataFortfolio.data = fortfolio;
      }
      resolve(dataFortfolio);
    } catch (error) {
      reject(error);
    }
  });
};

let createCoin = (userId, coinId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.users.findOne({
        where: { id: userId },
      });

      let coin = await db.fortfolios.findOne({
        where: { userId: userId, coinId: coinId },
      });

      if (user) {
        if (coin) {
          resolve({ errCode: 2, message: "Coin already exists" });
        } else {
          await db.fortfolios.create({
            userId: userId,
            coinId: coinId,
            priceInput: 0,
            quantity: 0,
          });
          resolve({ errCode: 0, message: "create success" });
        }
      } else {
        resolve({ errCode: 1, message: "User not found" });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let updateDataFortfolio = (userId, coinId, price, quantity) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataFortfolio = {};
      let fortfolio = await db.fortfolios.findOne({
        where: { userId: userId, coinId: coinId },
      });
      let f_quantity = quantity ?? fortfolio.quantity;
      let f_price = price ?? fortfolio.price;
      if (fortfolio) {
        console.log("start update fortfolios");
        await db.fortfolios.update(
          {
            quantity: f_quantity,
            priceInput: f_price,
          },
          {
            where: { userId: userId, coinId: coinId },
          }
        );
        dataFortfolio.message = "update success";
        dataFortfolio.fortfolio = fortfolio;
      } else {
        dataFortfolio.message = "not match params";
      }
      console.log(fortfolio);
      resolve(dataFortfolio);
    } catch (error) {
      reject(error);
    }
  });
};

let deleteCoin = (userId, coinId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let coinOfUser = await db.fortfolios.findOne({
        where: { userId: userId, coinId: coinId },
      });
      if (!coinOfUser) {
        resolve({
          err: 1,
          message: `the coinOfUser isn't exist`,
        });
      }

      await db.fortfolios.destroy({
        where: { userId: userId, coinId: coinId },
      });
      resolve({
        err: 0,
        message: `delete success`,
      });
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  getDataFortfolio: getDataFortfolio,
  updateDataFortfolio: updateDataFortfolio,
  deleteCoin: deleteCoin,
  createCoin: createCoin,
};
