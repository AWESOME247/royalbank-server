const express = require("express");
const router = new express.Router();
const referral = require("referral-code-generator");
const jwt = require("jsonwebtoken");
const ref = referral.alphaNumeric("lowercase", 3, 2);
const { v4: uuidv4 } = require("uuid");
const ID = uuidv4();
const multer = require("multer");
const bcrypt = require("bcrypt");
const userSchema = require("../../model");
const cloudinary = require("cloudinary");
const moment = require("moment");
const mongoose = require("mongoose");
const postmark = require("postmark");
const client = new postmark.ServerClient(process.env.POSTMARK);
const mail = require("../mail/template")
const verify = require("../mail/verify")
const randomToken = require('random-token').create('abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');

// const NodeCache = require("node-cache");
// const myCache = new NodeCache({ stdTTL: 180000 });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

const DIR = "profile";
let extension;

const storage = multer.diskStorage({
  destination: (req, res, next) => {
    next(null, DIR);
  },
  filename: (req, file, next) => {
    next(null, new Date().toISOString() + "-" + file.originalname);
  },
  onError: function (err, next) {
    console.log("Multer", err);
    next(null);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10000000 },
});

router.post(
  "/signup",
  upload.single("file"),
  (req, res, next) => {
    if (req.file) {
      return cloudinary.uploader
        .upload(req.file.path)
        .then((result) => {
          extension = result.secure_url;
          next();
        })
        .catch((error) => {
          console.log("Cloudinary", error);
        });
    }
    next();
  },
  validiate
);

async function validiate(req, resp) {
  mongoose.connection.once("open", () => {
    console.log("DB Connected!");
  });
  const { email, phone, fullName, social, password, country, refCode, accountNumber } =
    req.body;


  const trimedEmail = email.trim();

  try {
    const data = await userSchema.findOne({ email: trimedEmail }).exec();

    if (data) {
      return resp.send({ error: "Email already in use!" });
    }

    const hashPassword = await bcrypt.hash(password, 8);

    const token = jwt.sign(
      {
        user_id: ID,
        trimedEmail,
      },
      process.env.TOKEN,
      { expiresIn: "1h" }
    );

    await signup(
      trimedEmail,
      fullName,
      hashPassword,
      phone,
      social,
      country,
      refCode,
      token,
      accountNumber,
      resp
    );
  } catch (error) {
    console.log(error);
    resp.send({ error: "Turn on your internet connection!" });
  }
}

const signup = async (
  email,
  fullName,
  password,
  phone,
  social,
  country,
  refCode,
  token,
  accountNumber,
  resp
) => {
  if (refCode.length > 1) {
    const reff = await userSchema.findOne({ ref: refCode }).exec();
    userSchema.findOneAndUpdate(
      { ID: reff.ID },
      { referred: reff.referred + 1 },
      (err, data) => {
        if (err) console.log(err);
        else console.log(data);
      }
    );
  }

  try {
    const result = await userSchema.create({
      ID: ID,
      ref: ref,
      email: email.toLowerCase(),
      fullname: fullName,
      password: password,
      balance: 0.0,
      profit: 0.0,
      level: 1,
      isAdmin: false,
      accountNumber,
      phone,
      social,
      country,
      extension,
      referred: 0,
      isVerify: false,
      isCopyTrade: false,
      isVerifyEmail: false,
      transactions: [
        {
          transactionType: "Creation",
          amount: 0,
          withdraw: 0,
          status: "success",
          date: moment().format("MMM Do YY"),
        },
      ],
    });

    client.sendEmail({
      From: "UCMBANK SIGNUP <support@ucmb.online>",
      To: email,
      Subject: "Email Account Verification!",
      HtmlBody: mail(`https://dashboard.ucmbank.online/verified-account/${randomToken(24)}`, fullName),
    });

    const userCookie = {
      ID: result._id,
      email,
      token,
      // user: userData.users
    };

    resp.cookie("userCookie", userCookie, {
      maxAge: 3600000,
      secure: process.env.NODE_ENV === "production",
      httpOnly: process.env.NODE_ENV === "production",
      overwrite: true,
    });

    return resp.send({ success: "Signup Successful!" });
  } catch (error) {
    console.log(error);
  }
};

router.use(verify)

module.exports = router;
