const express = require('express')

//Importing Models
const User = require('../models/user');
const { checkAccessTokenAndGetUser } = require('../middleware/auth');

//Improting middlewares

// //Importing auth
// const { checkAccessToken, checkRefreshToken, checkResetPasswordToken } = require('../middleware/auth')



//Intialize router
const router = express.Router()


router.get('/', (req, res) => {

    console.log(req.cookies.accessToken);
    res.send('Tmm');
})

// //User Routes
router.post('/signUp', async (req, res) => {

    let { email,
        password,
        firstName,
        lastName,
        dateOfBirth,
        gender,
        userName, 
        address,
        city
    } = req.body
    console.log(req.body)
    let newUser
    try {
        email = email.toLowerCase();
        newUser = new User({
            userName,
            password,
            address,
            city,
            firstName,
            lastName,
            email,
            dateOfBirth,
            gender,
        })

        //Generating Tokens
        const accessToken = newUser.generateTokens()

        //Saving to database
        await newUser.save()
        
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            expires: new Date(Date.now() + 24 * 30 * 60 * 60 * 1000),
            secure: true,
            sameSite: 'none'
        })

       
        //Send response
        res.status(201).send()
        

    } catch (e) {
        if (newUser) {
            console.log(e)
            await newUser.remove()
        }
        let message = {}
        if (e.code && e.code) {
            message = `${Object.keys(e.keyValue).toString().charAt(0).toUpperCase() + Object.keys(e.keyValue).toString().slice(1)} already exists`
        }
        else if (e.errors) {
            message = `${e.errors[Object.keys(e.errors)].path.toString().charAt(0).toUpperCase() + e.errors[Object.keys(e.errors)].path.toString().slice(1)} is required`
        }
        res.status(400).send({
            error: message
        })
    }

})

router.post('/signIn', async (req, res) => {
    let { email, password } = req.body

    console.log(req.body)
    try {
        if(email.includes('@'))
            email = email.toLowerCase()
        const user = await User.findByCredentials(email, password)

        //Generate tokens
        const accessToken = user.generateTokens()

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            expires: new Date(Date.now() + 24 * 30 * 60 * 60 * 1000),
            secure: true,
            sameSite: 'none'
        })
        
        const userJson = user._doc

        
        delete userJson.password
        delete userJson.accepted
        //Send response
        res.status(200).send({
            accessToken,
            profile:{
                ...userJson
            }
        })

    } catch (e) {
        if(e.message == "Your account is still not accepted!"){

            res.status(404).send()
        }
        else{
            res.status(400).send({
                error: e.message
            })
        }
        
    }


})

router.post('/changePassword', checkAccessTokenAndGetUser,async(req,res) => {

    try{

        const {
            oldPassword,
            newPassword,
        }= req.body

        const user = await User.findByCredentials(req.user.email,oldPassword);

        console.log(user);
        user.password = newPassword;
        
        await user.save()

        res.send()
    }catch(e){

        res.status(400).send({
            error: e.message
        })
    }
})

// router.post('/logout', checkAccessToken, async (req, res) => {
//     try {
//         //Delete token
//         const user = req.user

//         //Delete refreshToken
//         user.deleteRefreshToken(req.fingerprint.hash)

//         //Update user
//         await user.save()

//         if (req.device === 'mobile') {
//             res.send()
//         } else {
//             //Else device is browser send httpOnly token containing refreshToken
//             res.cookie('refreshToken', '', {
//                 httpOnly: true,
//                 secure: process.env.NODEENV === 'DEV' ? false : true,
//                 expires: new Date(Date.now() + 24 * 30 * 60 * 60 * 1000),
//                 sameSite:'none'
//             })
//             res.cookie('accessToken', '', {
//                 httpOnly: true,
//                 secure: process.env.NODEENV === 'DEV' ? false : true,
//                 expires: new Date(Date.now() + 15 * 60 * 1000),
//                 sameSite:'none'
//             })
//             res.send()
            
//         }
//     } catch (e) {
//         res.status(500).send(e.message)
//     }
// })





module.exports = router