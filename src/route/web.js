import express from "express";
import userController from "../controllers/userController";
import fortfolioController from "../controllers/fortfolioController";
import JWTAction from "../middleware/JWTAction";

let router = express.Router();

let initWebRoutes = async (app) => {
  router.post("/api/login", userController.handleLogin);
  router.post("/api/register", userController.handleRegister);

  router.post(
    "/api/get-user-info",
    JWTAction.verifytokenCRUD,
    userController.handleGetUser
  );
  router.post(
    "/api/fortfolio",
    JWTAction.verifytokenCRUD,
    fortfolioController.getFortfolio
  );
  router.post(
    "/api/fortfolio/create-coin",
    fortfolioController.createCoinFortfolio
  );
  router.post("/api/fortfolio/update-coin", fortfolioController.updateDataUser);
  router.post(
    "/api/fortfolio/delete-coin",
    fortfolioController.deleteCoinFortfolio
  );

  return app.use("/", router);
};

module.exports = initWebRoutes;
