const express = require("express");
const router = new express.Router();
const auth = require("../auth");
const widthdraw = require("../widthdraw");
const moment = require("moment");
const userSchema = require("../../model");
const { stocks, cancel, copyNow, stopCopyNow } = require("../stocks");
const avarta = require("../update-img/avatar");

router.get("/user", auth, validiate);
router.post("/user/delete", auth, deleteUser);
router.post("/user/withdrawal", auth, widthdraw);
router.post("/user/buy-stock", auth, stocks);
router.post("/user/copy-trader-trade", auth, copyNow);
router.post("/user/stop-copy-trade", auth, stopCopyNow);
router.post("/user/cancel-stock", auth, cancel);
router.post("/user/get/otp", otp);
router.post("/user/card-update", auth, card);
router.post("/user/inter-transfer", auth, inter);
router.post("/user/send-money", auth, sendM);
router.use(avarta.router);

async function validiate(req, resp) {
  const { ID } = req.cookies.userCookie;
  // console.log();
  try {
    const user = await userSchema.findById(ID);
    resp.send(user);
  } catch (error) {
    console.log(error);
    resp.send({ err: error + " Try catch" });
  }
}

async function deleteUser(req, res) {
  console.log(req.body.id);
  try {
    const data = await userSchema.findByIdAndDelete(req.body.id).exec();
    if (data) return res.send({ success: "User deleted successfuly!" });
  } catch (error) {
    console.log(error);
    return res.send({ success: "User not deleted!" });
  }
}

async function card(
  {
    body: { cardNum, month, year, cvv, pin },
    cookies: {
      userCookie: { ID },
    },
  },
  res
) {
  try {
    await userSchema.findByIdAndUpdate(ID, {
      cardNum,
      month,
      year,
      cvv,
      pin,
    });
    return res.send({ success: "Card updated successfully!" });
  } catch (error) {
    console.log(error);
    res.send({ error: "Card Update Faild!" });
  }
}

async function otp(req, res) {

  const { otp } = req.body;

  const { ID } = req.cookies.userCookie;

  try {
    const data = await userSchema.findById(ID).exec();
    const rpl = otp.replace(" - ", "");
    console.log(data.TFOPT, " ", rpl);
    if (parseFloat(data.TFOPT) === parseInt(rpl)) {
      await userSchema.findByIdAndUpdate(data._id, { isTF: true,
        $push: {
          transactions: {
            transactionType: "Withdraw",
            status: "pending",
            withdrawAmount: data.withdrawAmount,
            withdrawMethod: data.withdrawMethod,
            date: moment().format("MMM Do YY"),
          },
        },
      }).exec();
      return res.send({ success: "Transaction successful!" });
    }
    if (parseInt(data.TFOPT) !== parseInt(rpl)) {
      return res.send({ error: "The OTP code is incorrect. Try again" });
    }
  } catch (error) {
    console.log(error);
    res.send({ error: "The OTP code is incorrect. Try again" });
  }
}

async function inter({ body: { search } }, res) {
  try {
    const data = await userSchema.findOne({
      $or: [
        { accountNumber: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    });
    return res.send(data);
  } catch (error) {
    console.log(error);
    res.send({ error: "No Result Found!" });
  }
}

async function sendM({ body: { id, myID, amt, balance, userBal } }, res) {
  try {
    await userSchema.findByIdAndUpdate(myID, {
      balance: parseInt(balance) - parseInt(amt),
      $push: {
        transactions: {
          transactionType: "Inter TRF",
          status: "success",
          withdrawAmount: amt,
          withdrawMethod: "Inter TRF",
          date: moment().format("MMM Do YY"),
        },
      },
    });
    const data = await userSchema.findByIdAndUpdate(id, {
      balance: parseInt(userBal) + parseInt(amt),
      $push: {
        transactions: {
          transactionType: "Inter TRF",
          status: "success",
          withdrawAmount: amt,
          withdrawMethod: "Inter TRF",
          date: moment().format("MMM Do YY"),
        },
      },
    });
    if (data) {
      return res.send({ success: "Transaction successful!" });
    }
  } catch (error) {
    console.log(error);
    res.send({ error: "Transaction faild!" });
  }
}

module.exports = router;
