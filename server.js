const express = require("express");
require("dotenv").config();
const compression = require("compression");
const cookieParser = require("cookie-parser");
const profile = require("./firebase/profile");
const signup = require("./firebase/signup");
const user = require("./firebase/user");
const signin = require("./firebase/signin");
const security = require("./firebase/security");
const changeIMG = require("./firebase/update-img");
const admin = require("./firebase/admin/user-id");
const route = require("./router");
const mongoose = require("mongoose");
const { connectDB } = require("./database");
const router = new express.Router();

connectDB();

if (process.env.NODE_ENV) {
  mongoose.connection.once("open", () => {
    console.log("DB Connected!");
  });
}
router.use(cookieParser());
router.use(express.json());
router.use(compression());
router.use(express.urlencoded({ extended: false }));

router.use(profile);
router.use(route);
router.use(signup);
router.use(signin);
router.use(user);
router.use(security);
router.use(changeIMG.router);
router.use(admin.router);

module.exports = router;
