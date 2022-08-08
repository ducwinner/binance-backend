import bcrypt from "bcryptjs";
// var salt = bcrypt.genSaltSync(10);
import db from "../models/index";

let createNewuser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      await db.users.create({
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
        fullName: data.fullName,
        image: "",
        adress: data.adress,
        roleid: data.roleid,
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

// let hashUserPassword = (password) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       var hashPassword = await bcrypt.hashSync(password, salt);
//       resolve(hashPassword);
//     } catch (error) {
//       reject(e);
//     }
//   });
// };

module.exports = {
  createNewuser: createNewuser,
};
