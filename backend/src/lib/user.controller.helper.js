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

module.exports = {
    createToken
}