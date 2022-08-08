import db from "../models/index";
import jwt from "jsonwebtoken";
const { Op } = require("sequelize");
require("dotenv").config();

// import bcrypt from "bcrypt";

// [Op.or]: [{authorId: 12}, {authorId: 13}]

let handleUserLogin = (emailOrphone, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkEmailorPhoneNumber(emailOrphone);
      if (isExist) {
        let user = await db.users.findOne({
          where: {
            [Op.or]: [{ email: emailOrphone }, { phoneNumber: emailOrphone }],
          },
          raw: true,
        });

        if (user) {
          // let check = await bcrypt.compareSync(password, user.password); // false
          if (password == user.password) {
            userData.errCode = 0;
            userData.message = `oke`;
            let TokenAccess = jwt.sign(
              {
                id: user.id,
                roleid: user.roleid,
              },

              process.env.JWT_ACCESS_KEY,
              { expiresIn: "30d" }
            );
            let refeshToken = jwt.sign(
              {
                id: user.id,
                roleid: user.roleid,
              },
              process.env.JWT_REFESH_KEY,
              { expiresIn: "360d" }
            );
            userData.userId = user.id;
            userData.roleId = user.roleid;
            userData.token = TokenAccess;
            userData.refeshToken = refeshToken;
          } else {
            userData.errCode = 3;
            userData.message = `Wrong password`;
          }
        } else {
          userData.errCode = 2;
          userData.message = `Your's email isn't exist in your system. plz try other email`;
        }
        console.log(userData);
        resolve(userData);
      } else {
        userData.errCode = 1;
        userData.message = `Your's email isn't exist in your system. plz try other email`;
        resolve(userData);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let checkEmailorPhoneNumber = (emailOrphone) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.users.findOne({
        where: {
          [Op.or]: [{ email: emailOrphone }, { phoneNumber: emailOrphone }],
        },
        raw: true,
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let createUser = (name, email, password, phoneNumber, roleId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.users.findOne({
        where: {
          [Op.or]: [{ email: email }, { phoneNumber: phoneNumber }],
        },
      });

      if (data) {
        resolve({
          errCode: 1,
          message: "Email or phone number already exists",
        });
      } else {
        await db.users.create({
          email: email,
          phoneNumber: phoneNumber,
          password: password,
          fullName: name,
          roleId: roleId,
        });
        resolve({
          errCode: 0,
          message: "create new User success",
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};

let getUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.users.findOne({
        where: { id: userId },
      });
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleUserLogin: handleUserLogin,
  createUser: createUser,
  getUser: getUser,
};
