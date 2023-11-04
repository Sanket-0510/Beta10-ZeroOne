const multer = require('multer');
const express = require("express")
const {handlecvpost,handlePricePost} = require("../controllers/cv.js");
const { handleSms } = require('../controllers/crop.js');
const upload = multer({ dest: '../uploads/' });
const cvRouter = express.Router();

cvRouter.post("/uploadImage", handlecvpost)

cvRouter.post("/predict", handlePricePost)

cvRouter.post("/sms", handleSms)

module.exports=cvRouter