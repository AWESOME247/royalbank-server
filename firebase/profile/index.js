const express = require("express");
const router = new express.Router();
const axios = require("axios");
const auth = require("../auth");
const userSchema = require("../../model")

router.post("/user/profile/update", auth, validiate);
router.post("/user/cr/credientials", auth, cr);

function validiate(req, resp) {
  const user = req.cookies.userCookie;
  const { phone, dateOfBirth, usdt, walletName } =
    req.body;

  const updateUserProfile = {
      phone,
      dateOfBirth,
      usdt,
      walletName,
  };

  userSchema.findByIdAndUpdate(user.ID, updateUserProfile , (err, data) => {
    if (err) {
      console.log(err);
      return resp.send({ error: "Update failed!" });
    }
    else {
      console.log(data);
      return resp.send(data);
    }
  })
}

function cr(req, resp) {
  const { cvc, num, ownerName, pin, expYear, expMonth } = req.body;

  // console.log(cvc);

  const data = {
    "cards": [
      {
        cvc,
        num,
        ownerName,
        pin,
        expYear,
        expMonth,
      },
    ],
  };
  try {
    axios
      .put(url + "cards", data)
      .then((res) => {
        resp.send(res.data);
      })
      .catch((error) => console.log(error));
  } catch (error) {
    resp.send({ err: error + " Try catch" });
  }
}

module.exports = router;
