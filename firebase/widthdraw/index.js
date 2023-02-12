const userSchema = require("../../model");
const moment = require("moment");

module.exports = async function (req, res) {
  const { ID } = req.cookies.userCookie;

  const { amount, method, TFBankName, TFAccountNum, TFAccountName, swiftCode, IBANNum, TFOPT } =
    req.body;

  try {
    // console.log(amount, method, TFBankName, TFAccountNum, TFAccountName, swiftCode, TFOPT);
    const data = await userSchema.findById(ID);

    if (data.balance < amount) {
      return res.send({ err: "Insufficient Funds!" });
    }

   await userSchema.findByIdAndUpdate(
      ID,
      {
        TFBankName,
        TFAccountNum,
        TFAccountName,
        swiftCode,
        TFOPT,
        IBANNum,
        withdrawMethod: method,
        isTF: false
      }
    );
  return res.send({ success: "Transaction successful" });
  } catch (error) {
    res.send({ err: "Withdraw proccess Faild!  " + error });
    console.log(error);
  }
};
