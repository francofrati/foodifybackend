const bcrypt = require("bcrypt");

const User = require("../models/User.js")
const Food = require("../models/Food.js")
const Restaurant = require("../models/Restaurant.js");

const {
    getByName,
    getByEmail,
    createToken,
    validateToken,
    sendEmail,
    randomCode
} = require("../lib/user.controller.helper");


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

        return res.status(200).json({ user: user })

    } catch (error) {
        return res.status(500).json({
            error: error
        })
    }
}



const putUser = async (req, res) => {
    const { idUser } = req.params
    const { username, name, email, hashPassword, country } = req.body
    const user = User.findById(idUser)
    const contraseña = await bcrypt.hash(hashPassword, 10)
    let actualUser;
    hashPassword ?
        (actualUser = {
            username: username,
            name: name,
            email: email,
            password: await bcrypt.hash(hashPassword, 10),
            country: country
        }) :
        (actualUser = {
            username: username,
            name: name,
            email: email,
            country: country,

        });
    const nuevo = await bcrypt.compare(hashPassword, contraseña)
    console.log(nuevo)
    await user.updateOne(actualUser)

    console.log(hashPassword)

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
    const { email, name, password } = req.body

    try {
        const currentUser = await User.findOne({ email: email })

        if (currentUser) throw Error(`El email: ${email} ya corresponde a un usuario`)

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const code = randomCode()

        const newUser = await User.create({
            email,
            name,
            password: hash,
            verification_code: code
        })

        const token = createToken({
            id: newUser.id,
            email,
            name,
            type: 'user',
            favorites: newUser.favorites
        })

        //Mail de bienvenida

        const temporalVerificationLink = `http://localhost:3000/verifyAccount/${newUser.id}`

        await sendEmail(newUser.email, newUser.name, temporalVerificationLink, code)

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

        if (!currentUser) {
            throw Error(`El email: ${email} no corresponde a ningun usuario.`)
        }

        //RESOLVER POR QUE NO TRAE LA CONTRASEÑNA DESDE LA DB

        const isCorrectPassword = await bcrypt.compare(password, currentUser.password)

        if (currentUser && !isCorrectPassword) {
            throw Error('Contraseña incorrecta')
        }

        //Si coincide email con contraseña entonces creo jwt y la envio.
        const token = createToken({
            name: currentUser.name,
            email,
            id: currentUser.id,
            type: 'user',
            favorites: currentUser.favorites
        })

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

const getAuth = async (req, res) => {

    const { token } = req.body

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

const googleAuth = async (req, res) => {

    const { email, name } = req.body

    console.log(email, name)

    try {
        const isUser = await User.findOne({ email: email })

        if (isUser) {
            const token = createToken({
                name: isUser.name,
                email: isUser.email,
                type: 'user',
                id: isUser.id
            })

            return res.status(201).send({
                token
            })
        }

        // const code = randomCode()

        const createUserWithGoogle = await User.create({
            email,
            name,
            account_verified: true
        })

        const token = createToken({
            name: createUserWithGoogle.name,
            email: createUserWithGoogle.email,
            favorites: createUserWithGoogle.favorites,
            type: 'user',
            id: createUserWithGoogle.id
        })
        // const temporalVerificationLink = `http://localhost:3000/verifyAccount/${createUserWithGoogle.id}`

        // await sendEmail(createUserWithGoogle.email, createUserWithGoogle.name, temporalVerificationLink, code)

        return res.status(201).send({
            token
        })


    } catch (error) {
        return res.status(400).send({
            Codigo: `400 Error en autorizacion con google`,
            Error: error.message
        })
    }
}

const getVerification = async (req, res) => {
    const { userId, code } = req.body


    try {
        const user = await User.findOne({ _id: userId })

        if (!user) {
            throw Error(`No tienes los permisos necesarios para estar en esta pagina`)
        }

        const correctCode = code === user.verification_code
            ? true
            : false

        if (correctCode) {

            await User.findByIdAndUpdate(
                { _id: userId },
                { account_verified: true },
                { new: true })

            return res.status(200).send({
                status: true,
                msg: 'Codigo correcto'
            })
        }

        throw Error('Codigo incorrecto intenta de nuevo')

    } catch (error) {
        return res.send({
            status: false,
            msg: error.message
        })
    }
}

const isUserVerificated = async (req, res) => {
    const { userId } = req.params

    try {
        const user = await User.findOne({ _id: userId })

        if (!user) {
            throw Error(`El id: ${userId} no pertenece a ningun usuario`)
        }

        if (user.account_verified) {
            throw Error(`El usuario con id: ${userId} ya verifico su cuenta`)
        }

        return res.status(200).send({
            status: true,
            msg: 'El Usuario debe verificar su cuenta'
        })

    } catch (error) {
        return res.status(200).send({
            status: false,
            msg: error.message
        })
    }
}

const addFavoriteRestaurant = async (req, res) => {
    const { restId, userEmail } = req.body


    try {

        const user = await User.findOne({ email: userEmail }).populate('favorites')

        const removeFromFavorites = user.favorites.findIndex(r => r.id === restId)

        if (removeFromFavorites !== -1) {

            const newFavorites = user.favorites.filter(r => r.id !== restId)

            await User.findOneAndUpdate(
                {
                    email: userEmail
                },
                {
                    favorites: newFavorites
                },
                {
                    new: true
                }
            )
            return res.status(200).send({
                status: true,
                msg: `Se elimino de favoritos`
            })

        }


        const restaurant = await Restaurant.findOne({ _id: restId })

        console.log(restaurant)

        if (!restaurant) throw Error(`El negocio con id: ${restId} no existe`)

        const userUpdate = await User.findOneAndUpdate(
            {
                email: userEmail
            },
            {
                $push: { favorites: restaurant._id }
            },
            {
                new: true
            }
        )

        console.log(userUpdate)
        return res.status(200).send({
            status: true,
            msg: `Se agrego a favoritos`,
        })

    } catch (error) {

        return res.status(400).send({
            status: false,
            msg: error.message
        })
    }
}

const getFavoriteRestaurants = async (req, res) => {
    const { userId } = req.params
    // console.log(userId)
    try {
        const user = await User.findOne({
            _id: userId
        }).populate('favorites')

        return res.status(200).send({
            status: true,
            favs: user.favorites
        })

    } catch (error) {

        return res.send({
            status: false,
            msg: error.message
        })
    }
}

module.exports = {
    signUp,
    login,
    getAuth,
    getUsers,
    deleteUser,
    putUserFood,
    putUser,
    getUserById,
    googleAuth,
    getVerification,
    isUserVerificated,
    addFavoriteRestaurant,
    getFavoriteRestaurants
}
