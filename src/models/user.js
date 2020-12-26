const mongoose = require('mongoose')

//Importing bycrypt tto encrypt Data
const bcrypt = require('bcrypt')

//Importing jwt
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema(
    {
        username:{
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
            enum: ['male', 'female'],
            default: 'male',
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

//Methods 
//Generatating an access Token and a refresh token
userSchema.methods.generateTokens = function (hash) {
    const user = this

    //Generating access token
    const accessToken = jwt.sign({ _id: user._id.toString(), role: user.role}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN })

    return {
        accessToken,
        refreshToken
    }
}


const User = mongoose.model('User', userSchema)

module.exports = User