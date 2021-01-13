const express = require('express')

//Improting Models
const MainRefree = require('../models/mainrefree')
const Team = require('../models/teams')
const Match = require('../models/match')
const LinesMan = require('../models/linesman')
const Stadium = require('../models/stadium')

// //Importing auth
const { checkAccessTokenOnly, HasRole} = require('../middleware/auth')

//Intialize router
const router = express.Router()

//Add Stadium
router.post('/addStadium', checkAccessTokenOnly, HasRole('manager'), async (req, res) => {

    try{
        const {
            name,
            rows,
            numberOfSeatsPerRow
        } = req.body
        
        if(numberOfSeatsPerRow > 20) throw new Error("SeatsPerRow is larger than 20")
        const stadium = new Stadium({
            name,
            rows,
            numberOfSeatsPerRow
        })
        await stadium.save()

        res.send(stadium)
    }catch(e){
        if(e.code === 11000){
            res.status(400).send({
                error: "Stadium Name Already Exists"
            })
        }  else
        res.status(400).send({
            error: e.message
        })
    }
    
})

router.post('/addMatch',checkAccessTokenOnly, HasRole('manager'), async(req, res) => {
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
        if(homeTeam === awayTeam || linesman1 === linesman2) throw new Error("Invalid Data")
        const stadium = await Stadium.findById(
            matchVenue
        );
        
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

        res.send(await match.populate('homeTeam').populate('awayTeam').populate('matchVenue')
        .populate('mainReferee').populate('linesman1').populate('linesman2'))
    }catch(e){
        
        if(e.code === 11000)
        {
            res.status(400).send({
                error: "Home Team And Away Team Already Have A Match!"
            })
        }
        else{
            res.status(400).send({
                error: e.message
            })
        }
        
    }
    
})

router.post('/editMatch', checkAccessTokenOnly, HasRole('manager'),async(req,res) => {

    try{

        const {
            matchVenue,
            linesman1,
            linesman2,
            mainReferee,
            date,
            time,
            _id,
        } = req.body
        console.log(req.body);
        if(linesman1 == linesman2) throw new Error("Invalid Data")
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
        const match = await Match.findByIdAndUpdate({
            _id
        },{
            matchVenue,
            linesman1,
            linesman2,
            mainReferee,
            date,
            time,
            allSeats,
            reservedSeats: []
        })
        if(!match) throw new Error("No Match Found")
        res.send()
    }catch(e){

        res.status(400).send({
            error: e.message
        })
    }


})
module.exports = router