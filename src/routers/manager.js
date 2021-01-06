const express = require('express')

//Improting Models
const MainRefree = require('../models/mainrefree')
const Team = require('../models/teams')
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

// router.post('/addMatch', async(req, res) => {
//     try{
//         const {
//             homeTeam,
//             awayTeam,
//             matchVenue,
//             date,
//             time,
//             mainRefree,
//             linesman1,
//             linesman2,
//         } = req.body
        
//         const stadium = await Stadium.findById({
//             matchVenue
//         });
//         console.log(matchVenue)
//         for(var i = 0 ; i< rows ;i++){
//             for(var j =0; j< rows; j++){

//             }
//         }
//         const match = new Match({
//             name,
//             rows,
//             numberOfSeatsPerRow
//         })
//         // await match.save()

//         res.send()
//     }catch(e){

//         res.status(400).send({
//             error: "Stadium name already exists"
//         })
//     }
    
// })
module.exports = router