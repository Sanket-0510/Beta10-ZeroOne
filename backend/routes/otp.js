const express = require("express");
const {handleOtp} = require("../controllers/auth.js")
const otpRouter = express.Router();

otpRouter.post("/login", handleOtp)

module.exports = otpRouter