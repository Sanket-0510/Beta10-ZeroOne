const { User } = require("../models/user.js");

const {createJwtToken} = require("../utils.js")

const handleLogin = async (req, res) => {
    try {
      const { phoneNo } = req.body;
      const user = await User.findOne({ phoneNo: phoneNo });
  
      if (user) {
        const token = createJwtToken(user);
        res.send(token);
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Error during login");
    }
  };

  
  const handleOtp = async (req, res) => {
    try {
      const phoneNo = req.body.phoneNo; // Correct the destructuring
      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const client = require("twilio")(accountSid, authToken);
      const otp = Math.floor(100000 + Math.random() * 900000);
      const phoneNumber = phoneNo;
      const message = `Your OTP for login is: ${otp}`;
      const result = await client.messages.create({
        body: message,
        from: "+17407910489",
        to: "+919920996773",
      });
      console.log(result);
      res.status(200).send(result);
    } catch (e) {
      console.log(e);
      res.status(500).send("Error");
    }
  }
  

const handleRegistration = async (req, res) => {
    try {
      const { name, state, phoneNo, address } = req.body;
      const user = new User({
        name: name,
        state: state,
        phoneNo: phoneNo,
        address: address,
      });
      const savedUser = await user.save();
      console.log(savedUser);
      res.status(200).json(savedUser);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error during registration");
    }
  };
  
module.exports = { handleLogin, handleRegistration,handleOtp };
