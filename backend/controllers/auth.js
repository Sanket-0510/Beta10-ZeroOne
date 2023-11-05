const { User } = require("../models/user.js");

const { createJwtToken, generateOtp } = require("../utils.js");

const handleLogin = async (req, res) => {
  try {
    const { phoneNo } = req.body;
    const user = await User.findOne({ phoneNo: phoneNo });

    if (user) {
      const otp = generateOtp();
      req.session.user = user;
      req.session.otp = otp;

      // Your Twilio message sending code (unchanged)
      // ...
      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const client = require("twilio")(accountSid, authToken);
      const message = `Your OTP for login is: ${otp}`;
      const result = await client.messages.create({
        body: message,
        from: "+17407910489",
        to: `+91${phoneNo}`,
      });

      res.status(200).send("OTP sent successfully");
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error during login");
  }
};

const verifyOtp = async (req, res) => {
  const otp = req.body.otp;
  const storedOtp = req.session.otp;
  console.log(storedOtp)
  if (otp === storedOtp) {
    const token = createJwtToken(req.session.user);
    
    res.status(200).send(token);
  } else {
    res.status(400).send("Wrong OTP");
  }
};

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

    res.status(200).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error during registration");
  }
};

module.exports={handleLogin, handleRegistration,verifyOtp}