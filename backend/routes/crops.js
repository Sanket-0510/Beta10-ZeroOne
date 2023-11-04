const express = require("express");
const { handleWebCropPost, handleTwilioCropData } = require("../controllers/crop");
const { auth } = require("../middlewares/auth.js")
const cropRouter = express.Router();

cropRouter.post("/web/getCropData", handleWebCropPost)



cropRouter.post("/twilio/getCropData", handleTwilioCropData)


module.exports = cropRouter