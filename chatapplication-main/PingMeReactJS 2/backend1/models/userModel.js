const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const {isEmail} = require('validator')

const userSchema = mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:[true,'Username cannot be blank'],
    },
    email:{
        type:String,
        unique:true,
        required:[true,'blank_email'],
        lowercase:true,
        validate:[isEmail,'Invalid Email']
    },
    password:{
        type:String,
        required:[true,'blank_password'],
        minlength:[8,'Password should be atleast 8 characters long']
    },
    profilePictureFileName:{
        type:String,
        default:'default.png'
    }
})

userSchema.pre('save', async function (next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password,salt)
    next()
})

const User = mongoose.model('user',userSchema)

module.exports = User