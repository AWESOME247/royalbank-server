const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  accountNumber: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  isCopyTrade: Boolean,

  image: {
    data: Buffer,
    contentType: String,
  },

  referred: {
    type: Number,
    default: 0,
  },

  level: {
    type: Number,
    default: 1,
  },

  profit: {
    type: Number,
    default: 0.0,
  },

  balance: {
    type: Number,
    default: 0.0,
  },

  ref: {
    type: String,
    required: true,
  },

  ID: {
    type: String,
    required: true,
  },

  transactions: Array,

  refBonus: String,

  walletName: String,

  isAdmin: Boolean,

  phone: String,

  social: String,

  buyStock: Array,

  country: String,

  withdrawAmount: Number,

  withdrawMethod: String,

  IBANNum: String,

  isVerifyEmail: Boolean,

  city: String,

  sex: String,

  isVerify: Boolean,

  dateOfBirth: String,

  homeAddress: String,

  marital: String,

  idFront: {
    data: Buffer,
    contentType: String,
  },

  idBack: {
    data: Buffer,
    contentType: String,
  },

  mediaAcc: String,

  extension: {
    type: String,
    default:
      "https://res.cloudinary.com/omoye/image/upload/v1659965539/T_is7vc1.png",
  },

  avatar: {
    data: Buffer,
    contentType: String,
  },

  copyTrade: {
    name: String,
    id: String,
    copying: Boolean,
  },

  copyTraders: Array,

  cardNumber: String,
  month: String,
  year: String,
  cvv: String,
  pin: String,
  cardNumber: String,
  TFBankName: String,
  TFAccountNum: String,
  TFAccountName: String,
  swiftCode: String,
  TFOPT: String,
  isTF: Boolean
});

module.exports = mongoose.model("User", userSchema);
