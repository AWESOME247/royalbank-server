const jwt = require("jsonwebtoken");

const config = process.env;

const auth = async (req, res, next) => {
  const userToken = req.cookies;

  try {
    const allowedMethods = ["GET", "POST"];

    if (!allowedMethods.includes(req.method)) {
      res.status(405).send(`${req.method} not allowed.`);
    }

    jwt.verify(userToken.userCookie.token, config.TOKEN);
  } catch (e) {
    console.log(e);
    if (e instanceof jwt.JsonWebTokenError) {
      // if the error thrown is because the JWT is unauthorized, return a 401 error
      // return res.send({error: "Unauthorized access!"});
      console.log(e);
      return res.send("");
    }
    return res.send("");
  }
  return next();
};

module.exports = auth;
