import db from "../models/index";
// import CRUDservice from "../service/CRUDserveice";

let getHomePage = async (req, res) => {
  try {
    let data = await db.users.findAll();
    return res.render("homepage.ejs", {
      data: data,
    });
  } catch (e) {
    console.log(e);
  }
};

let getAboutPage = (req, res) => {
  return res.render("test/about.ejs");
};

let getCRUD = async (rep, res) => {
  return res.render("/crud.ejs");
};

// let postCRUD = async (req, res) => {
//   let message = await CRUDservice.createNewuser(res.body);
// };

module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCRUD: getCRUD,
};
