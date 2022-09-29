require('dotenv').config()

const jwt = require('jsonwebtoken')

const { SECRET } = process.env


const getByName = ({ users, name }) => {
    return users.filter((user) =>
        user.name?.toLowerCase().includes(name.toLowerCase())
    )
}

const getByEmail = ({ users, email }) => {
    return users.filter((user) =>
        user.email?.toLowerCase().includes(email.toLowerCase())
    )
}

const createToken = (user) => {
    const { id, name, email, type } = user
    console.log(id, type)
    const payload = {
        id,
        name,
        email,
        type
    }
    return jwt.sign(payload, SECRET, { expiresIn: '3d' })
}

const validateToken = (token) => {
    try {
        const decodedToken = jwt.verify(token, SECRET)

        return decodedToken

    } catch (error) {

        console.log(error)
        return {
            error: error.message
        }
        
    }

}

module.exports = {
    createToken,
    validateToken,
    getByName,
    getByEmail
}