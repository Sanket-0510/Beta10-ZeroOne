const {createHmac, randomBytes} = require('crypto')
const jwt = require('jsonwebtoken')

async function createJwtToken(user){
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

module.exports = {createJwtToken, verifyJwt}

