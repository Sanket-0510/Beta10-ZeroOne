const express = require("express")
const app = express();
const session = require('express-session');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(session({
    secret: 'your-secret-key', // Change this to a secure secret key
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1200000 } // Set the session expiration time (in this case, 60 seconds)
  }));
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