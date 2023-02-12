const express = require("express");
const router = new express.Router();
const userSchema = require("../../model");
const postmark = require("postmark");
const client = new postmark.ServerClient(process.env.POSTMARK);
const mail = require("../mail/template");
const bcrypt = require("bcrypt");

router.get("/reset/password/:token/:pwd", async (req, res) => {
  const { token, pwd } = req.params;
  try {
    const password = await bcrypt.hash(pwd, 8);
    await userSchema.findOneAndUpdate({ token }, { password: password })
    return res.send({ success: "Password updated succesfully!" });
  } catch (error) {
    console.log(error)
    return res.send({ error: "Password not updated!" });
  }
});

router.get("/password/email/reset/:email", async (req, res) => {
  const { email } = req.params;
  const user = await userSchema.findOne({ email }).exec();
  if (!user) return res.send({ error: "No such user!" });
  try {
    client.sendEmail({
      From: "Remi Investment Password Reset <support@ucmb.online>",
      To: user.email,
      Subject: "Account Passord Reset!",
      HtmlBody: mail(
        `https://dashboard.remiinvestment.com/password/reset/${user.token}`,
        user.fullname
      ),
    });
    return res.send({ success: "Password sent to your email succesfully!" });
  } catch (error) {
    return res.send({ error: "No such user!" });
  }
});

module.exports = router;
