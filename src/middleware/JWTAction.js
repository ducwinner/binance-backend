import jwt from "jsonwebtoken";
require("dotenv").config();

const middleWareJWT = {
  //verify token
  verifyToken: (req, res, next) => {
    var token = req.headers.authorization;
    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
        if (err) {
          console.log(err);
          res.status(403).json("Token is not valid");
        } else {
          req.user = user;
          console.log(user);
          next();
        }
      });
    } else {
      res.status(401).json("You're not Authenticateddddd");
    }
  },

  verifytokenCRUD: (req, res, next) => {
    middleWareJWT.verifyToken(req, res, () => {
      if (req.user.id == req.body.userId || req.user.roleid == "admin") {
        next();
      } else {
        res
          .status(403)
          .json(
            "You can not make it, beacause userId not match or you're not admin"
          );
      }
    });
  },
};

module.exports = middleWareJWT;
