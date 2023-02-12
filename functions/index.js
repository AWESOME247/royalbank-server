const serverlessHTTP = require("serverless-http");
const server = require("../server");
const express = require("express");
// const cors = require("cors");

const app = express();
// app.enable("trust proxy");
// app.use(cors({
//     origin: ["http://localhost:9000", "capacitor://online.ucmbank.app"],
//     credentials: true
// }));
// app.options("*", cors(config));

app.use("/.netlify/functions/index", server);

exports.handler = serverlessHTTP(app);
