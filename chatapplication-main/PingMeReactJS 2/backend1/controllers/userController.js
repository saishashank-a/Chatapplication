const UserModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const { createJWT, verifyJWT } = require('../config/JWT')

const handleErrors = (err) => {
    console.log(err.message, err.code)
    return err
}

const signin_post = async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await UserModel.findOne({ username })
        if (user) {
            const passwordMatched = await bcrypt.compare(password, user.password)
            if (passwordMatched) {
                const jwt = await createJWT(user._id)
                res.cookie('jwt', jwt, { httpOnly: true, maxAge: 3600000 })
                res.status(200).json({ jwt: await createJWT(user._id) })
            }
            else
                res.status(200).json({ msg: "Wrong Password" })
        }
        else {
            res.status(200).json({ msg: "User doesn't exist" })
        }
    }
    catch (err) {
        handleErrors(err)
        res.status(200).json({ msg: 'Error in sign-in' })
    }
}
const signup_post = async (req, res) => {
    const { email, password, username } = req.body
    try {
        const user = await UserModel.create({ email, username, password })
        res.status(200).json({ ok: "User Created Successfully" })
    }
    catch (errors) {
        handleErrors(errors)
        res.status(200).json(errors)
    }
}

const logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 })
    res.status(200).json({ msg: "Logged Out" })
}

const user_get = async (req, res) => {
    const { id } = req.body
    try {
        const { username, email } = await UserModel.findById(id)
        res.status(200).json({ username, email })
    }
    catch (err) {
        res.status(200).json({ msg: 'Error' })
    }
}

const uploadProfilePicture_post = async(req, res) => {
    const { filename } = req.file
    await UserModel.findOneAndUpdate({ username:req.body.username },{profilePictureFileName:`${filename}`})
    res.status(200).send()
}

const profilePicture_get = async (req, res) => {
    const { username } = req.params
    const userData = await UserModel.findOne({ username })
    if(userData && userData.profilePictureFileName)
        res.status(200).sendFile(`D://PingMe/backend/uploads/${userData.profilePictureFileName}`)
    else
        res.status(200).sendFile(`D://PingMe/backend/uploads/default.png`)
}

module.exports = { signin_post, signup_post, logout_get, user_get, uploadProfilePicture_post, profilePicture_get }