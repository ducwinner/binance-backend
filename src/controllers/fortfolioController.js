import fortfolioService from "../service/fortfolioService";

let getFortfolio = async (req, res) => {
  const userId = req.body.userId;

  if (!userId) {
    return res.status(500).json({
      message: "not oke",
    });
  }

  let fortfolioData = await fortfolioService.getDataFortfolio(userId);

  return res.status(200).json({
    fortfolioData,
  });
};

let createCoinFortfolio = async (req, res) => {
  let coinId = req.body.coinId;
  let userId = req.body.userId;

  if (!coinId || !userId) {
    return res.status(500).json({
      message: "not oke",
    });
  }

  let newCoinFortfolio = await fortfolioService.createCoin(userId, coinId);

  return res.status(200).json({
    newCoinFortfolio: newCoinFortfolio,
  });
};

let updateDataUser = async (req, res) => {
  const userId = req.body.userId;
  const coinId = req.body.coinId;
  const price = req.body.priceInput;
  const quantity = req.body.quantity;
  if (!userId || !coinId) {
    return res.status(500).json({
      message: "not oke",
    });
  }

  let fortfolioData = await fortfolioService.updateDataFortfolio(
    userId,
    coinId,
    price,
    quantity
  );

  return res.status(200).json({
    fortfolioData: fortfolioData,
  });
};

let deleteCoinFortfolio = async (req, res) => {
  let userId = req.body.userId;
  let coinId = req.body.coinId;
  if (!userId || !coinId) {
    return res.status(500).json({
      message: "not oke",
    });
  }

  let result = await fortfolioService.deleteCoin(userId, coinId);

  return res.status(200).json({
    message: result.message,
    error: result.error,
  });
};

module.exports = {
  getFortfolio: getFortfolio,
  updateDataUser: updateDataUser,
  deleteCoinFortfolio: deleteCoinFortfolio,
  createCoinFortfolio: createCoinFortfolio,
};
