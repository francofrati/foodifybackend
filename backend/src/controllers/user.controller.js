const bcrypt = require("bcrypt");

const User = require("../models/User.js")
const Food = require("../models/Food.js")
const { getByName, getByEmail, createToken, validateToken } = require("../lib/user.controller.helper")


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
        }) :
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
    const { idFood, idUser } = req.params

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
    const { idUser } = req.params
    try {
        await User.findByIdAndUpdate(idUser, { deleted: true })
        return res.status(200).json({ status: 'User deleted' })
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}


//Aún falta la ruta para la compra de comidas



const signUp = async (req, res) => {
    const { email, username, name, password } = req.body

    try {
        const currentUser = await User.findOne({ email: email })

        if (currentUser) throw Error(`El email: ${email} ya corresponde a un usuario`)

        const newUser = await User.create({
            email,
            username,
            name,
            password
        })

        const token = createToken(newUser)

        return res.status(201).send({
            created_user: newUser,
            token,
        })

    } catch (error) {
        return res.status(409).send({
            Codigo: 409,
            Error: error.message
        })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    try {

        const currentUser = await User.findOne({ email: email })
        console.log(currentUser.hashPassword)

        if (!currentUser) {
            throw Error(`El email: ${email} no corresponde a ningun usuario.`)
        }

        //RESOLVER POR QUE NO TRAE LA CONTRASEÑNA DESDE LA DB

        // const isCorrectPassword = currentUser.hashPassword === password
        //     ? true
        //     : false


        // if (currentUser && !isCorrectPassword) {
        //     throw Error('Contraseña incorrecta')
        // }

        //Si coincide email con contraseña entonces creo jwt y la envio.
        const token = createToken(currentUser)
        return res.status(201).json({
            logged_user: currentUser,
            token
        })

    } catch (error) {
        return res.status(404).send({
            Codigo: 404,
            Error: error.message
        })
    }
}

const getCreds = async (req, res) => {
    const { token } = req.body
    console.log(token)
    try {
        const decodedToken = validateToken(token)
        return res.send(decodedToken)
    } catch (error) {
        return res.status(400).send({
            Codigo: 400,
            Error: error.message
        })
    }
}

module.exports = {
    signUp,
    login,
    getCreds,
    getUsers,
    deleteUser,
    putUserFood,
    putUser,
    getUserById
}

