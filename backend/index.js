const express = require("express")
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('dotenv').config();

const cors = require('cors');
app.use(cors());

const connectDB = require('./config/database.js');
connectDB();

const cookieParser = require('cookie-parser')
app.use(cookieParser())

const authRouter = require("./routes/auth.js")
const otpRouter = require("./routes/otp.js")

app.use("/otp", otpRouter)
app.use("/auth", authRouter)

app.listen(8000, (req,res)=>{
    console.log("listening at 8000")
})