const express = require('express')

//Improting Models
const User = require('../models/user')
const Team = require('../models/teams')
const LinesMan = require('../models/linesman')
const Stadium = require('../models/stadium')

// //Importing auth
const { checkAccessTokenAndGetUser,checkAccessTokenOnly, HasRole} = require('../middleware/auth')

//Intialize router
const router = express.Router()

//Add Stadium
router.get('/getPendingUsers', checkAccessTokenOnly, HasRole('admin'), async (req, res) => {

    try{
        const users = await User.find({
            accepted: false,
            role: 'user'
        },{
            password: 0,
        }).lean()
        res.send(users)
    }catch(e){

        res.status(400).send({
            error: e.message
        })
    }
    

   
})

router.post('/updateAllPending',checkAccessTokenOnly, HasRole('admin'), async (req,res) => {

    try{
        const {
            accepted,
        }= 
        req.body
        if(accepted){
            await User.updateMany({
                accepted: false,
                role: 'user'
            },{
               accepted: true,
            })
        }
        else{
            await User.deleteMany({
                accepted: false,
                role: 'user'
            })
        }
        res.send()
    }catch(e){

        res.status(400).send({
            error: e.message
        })
    }    
})
router.post('/updatePending', checkAccessTokenOnly, HasRole('admin'), async(req,res) => {

    const {
        accepted,
        _id
    }= 
    req.body
    try{
        if(!accepted) {
            const result = await User.deleteOne({
                _id,
                accepted: false,
            })
        if(!result.ok) throw new Error("User not found")
            res.send()
        }
        else{

            const result = await User.findOneAndUpdate({
                accepted: false,
                _id
            },{
               accepted: true,
            })
            if(!result) throw new Error("User not found")
            res.send()
        }
        
    }catch(e){

        res.status(400).send({
            error: e.message
        })
    } 

})

router.get('/getAllUsers', checkAccessTokenOnly, HasRole('admin'), async( req, res) => {

    try{
        const users = await User.find({
            role: 'user'
        },{
            password: 0,
        }).lean()
        res.send(users)
    }catch(e){

        res.status(400).send({
            error: e.message
        })
    }

})
module.exports = router