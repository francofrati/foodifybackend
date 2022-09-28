const jwt = require('jsonwebtoken')
require('dotenv').config()


const { SECRET } = process.env

const createToken =(user)=>{
    const {id,name,email} = user
    const payload = {
        id,
        name,
        email
    }
    return jwt.sign(payload, SECRET, { expiresIn: '3d' })
}

const validateToken =(token)=>{
    try {
        const decodedToken = jwt.verify(token,SECRET)
        return decodedToken
    } catch (error) {
        console.log(error)
        return {
            error:error.message
        }
    }

}

module.exports = {
    createToken,
    validateToken
}