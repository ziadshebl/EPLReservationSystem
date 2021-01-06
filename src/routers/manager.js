const express = require('express')

//Improting Models
const MainRefree = require('../models/mainrefree')
const Team = require('../models/teams')
const Match = require('../models/match')
const LinesMan = require('../models/linesman')
const Stadium = require('../models/stadium')

// //Importing auth
// const { checkAccessToken, checkRefreshToken, checkResetPasswordToken } = require('../middleware/auth')

//Intialize router
const router = express.Router()

//Add Stadium
router.post('/addStadium', async (req, res) => {

    try{
        const {
            name,
            rows,
            numberOfSeatsPerRow
        } = req.body
        
        const stadium = new Stadium({
            name,
            rows,
            numberOfSeatsPerRow
        })
        await stadium.save()

        res.send(stadium)
    }catch(e){

        res.status(400).send({
            error: "Stadium name already exists"
        })
    }
    
})

router.post('/addMatch', async(req, res) => {
    try{
        const {
            homeTeam,
            awayTeam,
            matchVenue,
            date,
            time,
            mainReferee,
            linesman1,
            linesman2,
        } = req.body
        if(homeTeam === awayTeam || linesman1 == linesman2) throw new Error("Invalid Data")
        const stadium = await Stadium.findById(
            matchVenue
        );
        console.log(stadium)
        var allSeats = [];
        for(var i = 0 ; i< stadium.rows ;i++){
            for(var j =0; j< stadium.numberOfSeatsPerRow; j++){
                allSeats.push(`R${i}C${j}`)
            }
        }
        console.log(mainReferee)
        const match = new Match({
            homeTeam,
            awayTeam,
            matchVenue,
            linesman1,
            linesman2,
            mainReferee,
            date,
            time,
            allSeats,
        })
        await match.save()

        res.send(match)
    }catch(e){

        res.status(400).send({
            error: e.message
        })
    }
    
})
module.exports = router