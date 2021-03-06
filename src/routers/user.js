const express = require('express')

//Improting Models
const MainRefree = require('../models/mainrefree')
const Team = require('../models/teams')
const LinesMan = require('../models/linesman')
const Stadium = require('../models/stadium')
const Reservation = require('../models/reservation')
// //Importing auth
const { checkAccessTokenAndGetUser,checkAccessTokenOnly, HasRole} = require('../middleware/auth')

//Intialize router
const router = express.Router()

router.get('/getProfile', checkAccessTokenAndGetUser, async(req,res) => {

    const user = req.user;
    delete user.password
    res.send(user)
})
//Add Stadium
router.post('/editProfile', checkAccessTokenAndGetUser, async (req, res) => {

    try{
        const { 
            email,
            firstName,
            lastName,
            dateOfBirth,
            gender,
            userName, 
            address,
            city
        } = req.body
        
        const user = req.user;
        user.firstName = firstName
        user.lastName = lastName
        user.dateOfBirth = dateOfBirth
        user.address = address
        user.city = city
        await user.save()

        res.send()
    }catch(e){

        res.status(400).send({
            error: e.message
        })
    }
    

   
})

router.get('/getReservations', checkAccessTokenOnly, async(req, res) =>{

    try{

        const reservation = await Reservation.find({
            userId: req.user._id
        }).populate({
            path:'matchId',
            populate: [
                {
                    path: 'homeTeam'
                },
                {
                    path: 'awayTeam'
                },
                {
                    path: 'linesman1'
                },
                {
                    path: 'linesman2'
                },
                {
                    path: 'mainReferee'
                },
                {
                    path: 'matchVenue'
                },
            ]
                
            
        })
        

        res.send(reservation)
    }catch(e){

        res.status(400).send({
            error: e.message
        })
    }

})

module.exports = router