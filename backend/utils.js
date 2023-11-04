
const jwt = require('jsonwebtoken')

 function createJwtToken(user){
  console.log(user)
    const payload = {
      _id: user._id,
      name:user.name,
      phoneNo: user.PhoneNo,
      address: user.address
    }
    const token = jwt.sign(payload, process.env.SECRETE_KEY)
    return token

}
async function verifyJwt(token){
     const payload = jwt.verify(token, process.env.SECRETE_KEY)
     return payload 
}

function generateOtp(){
  return Math.floor(100000 + Math.random() * 900000);
}

module.exports = {createJwtToken, verifyJwt,generateOtp}

