const User = require("../models/User.js")
const Food = require("../models/Food.js")
const { getByName, getByEmail } = require("../lib/user.controller.helper")
const bcrypt = require("bcrypt");


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



const putUser = async (req, res) => {
    const { idUser } = req.params
    const { username, name, email, hashPassword, country } = req.body

    const user = User.findById(idUser)

    let actualUser;
    hashPassword ?
    (actualUser = {
        username: username,
        name: name,
        email: email,
        hashPassword: await bcrypt.hash(hashPassword, 10),
        country: country
    }):
        (actualUser = {
            username: username,
            name: name,
            email: email, 
            country: country
        });

        await user.updateOne(actualUser)

        return res.status(200).json({
            status: 'User updated'
        })
}



//NOTA MENTAL: También se le podría pasar el idRestaurnt pero creo que no es necesario de momento ya que su referencia es a las comidas que ha hecho
const putUserFood = async (req, res) => {
    const {idFood, idUser} = req.params

    const FoodPurch = await Food.findById(idFood)

    const sellingFoodsUpdate = await User.findByIdAndUpdate(idUser, {
        $push: { purchased_foods: FoodPurch._id }
    })

    const foodUpdated = await Food.findByIdAndUpdate(idFood, {
        $push: { buyer: idUser }
    }) 

    res.status(200).json({
        status: sellingFoodsUpdate,
        statusFood: foodUpdated
    })
}


const deleteUser = async (req, res) => {
    const {idUser} = req.params
    try {
        await User.findByIdAndUpdate(idUser, { deleted: true })
        return res.status(200).json({ status: 'User deleted' })
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}


//Aún falta la ruta para la compra de comidas