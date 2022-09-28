const User = require("../models/User.js")
const Food = require("../models/Food.js")
const { getByName, getByEmail } = require("../lib/user.controller.helper")

const getUsers = async (req, res) => {
    const { name, email } = req.query
    try {
        const users = await User.find({})

        if (name) users = getByName({ users, name })

        else if (email) user = getByEmail({ users, email })

        return res.status(200).json({ users: users })
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}


//ESTA RUTA AÚN ESTÁ EN DESARROLLO
const getUserById = async (req, res) => {
    const { idUser } = req.params

    try {
        const user = await User.findById(idUser)
            
        return res.status(500).json({ user: user })
        
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}