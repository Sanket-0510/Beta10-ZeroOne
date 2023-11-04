const express = require("express");
const {verifyOtp} = require("../controllers/auth.js")
const otpRouter = express.Router();

otpRouter.post("/verify",verifyOtp)

module.exports = otpRouter