const mongoose = require('mongoose')

//Importing bycrypt tto encrypt Data
const bcrypt = require('bcrypt')

//Importing jwt
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema(
    {
        userName:{
            type: String,
            required: true,
            unique: true
        },
        password:{
            type: String,
            required: true
        },
        dateOfBirth: {
            type: Date,
            required: true
        },
        gender: {
            type: String,
            enum: ['Male', 'Female'],
            default: 'Male',
            required: true
        },
        address:
        {
            type: String,
            
        },
        city:
        {
            type: String,
            required: true
        },
        firstName:
        {
            type: String,
            required: true
        },
        lastName:
        {
            type: String,
            required: true
        },
        email:
        {
            type: String,
            required: true,
            unique: true
        },
        role:
        {
            type: String,
            enum: ['user', 'manager', 'admin'],
            default: 'user',
            required: true
        },
        accepted:{
            type: Boolean,
            default: false,
            required: true,
        }
    },
    {
        timestamps: true
    }
)

//Utilities
userSchema.pre('save', async function (next) {
    const user = this

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }

    next()
})

//Static Methods
userSchema.statics.findByCredentials = async (email, password)=>{
    const user = await User.findOne({
        $or:[
            {
                email
            }, {
            userName:email
        }]
    })
    if(!user){
        throw new Error('Email/Username not Found')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        throw new Error('Password is wrong')
    }
    return user
}

//Methods
//Generatating an access Token and a refresh token
userSchema.methods.generateTokens = function () {
    const user = this

    //Generating access token
    const accessToken = jwt.sign({ _id: user._id.toString(), role: user.role}, process.env.ACCESS_TOKEN_SECRET)

    return accessToken
       
    
}


const User = mongoose.model('User', userSchema)

module.exports = User