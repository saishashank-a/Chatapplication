const jwt = require('jsonwebtoken')

const createJWT = async (id) => {
    const token = await jwt.sign({id},process.env.JWT_SECRET)
    return token
}
const verifyJWT = async(token)=>{
    return await jwt.verify(token,process.env.JWT_SECRET)
}
module.exports = {createJWT,verifyJWT}