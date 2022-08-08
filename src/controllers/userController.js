import userService from "../service/userService";

let handleLogin = async (req, res) => {
  let emailOrphone = req.body.emailOrphone;
  let password = req.body.password;
  console.log(password);
  if (!password || !emailOrphone) {
    return res.status(500).json({
      errCode: 3,
      message: "not ok",
    });
  }

  var userData = await userService.handleUserLogin(emailOrphone, password);
  // duc

  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.message,
    roleId: userData.roleId,
    userId: userData.userId,
    token: userData.token,
    refeshToken: userData.refeshToken,
  });
};

let handleRegister = async (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;
  let phoneNumber = req.body.phone;
  let roleId = req.body.roleId;
  if (!name || !password || !email || !phoneNumber || !roleId) {
    return res.status(500).json({
      message: "not oke",
    });
  }

  let result = await userService.createUser(
    name,
    email,
    password,
    phoneNumber,
    roleId
  );

  return res.status(200).json({
    errCode: result.errCode,
    message: result.message,
  });
};

let handleGetUser = async (req, res) => {
  let userId = req.body.userId;

  let dataUser = await userService.getUser(userId);

  return res.status(200).json({
    dataUser,
  });
};

module.exports = {
  handleLogin: handleLogin,
  handleRegister: handleRegister,
  handleGetUser: handleGetUser,
};
