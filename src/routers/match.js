const express = require('express')

//Improting Models
const MainRefree = require('../models/mainrefree')
const Team = require('../models/teams')
const LinesMan = require('../models/linesman')
const Match = require('../models/match')
const Stadium = require('../models/stadium')
// //Importing auth
// const { checkAccessToken, checkRefreshToken, checkResetPasswordToken } = require('../middleware/auth')

//Intialize router
const router = express.Router()


module.exports = function(wss){


    const rooms = {}
    wss.on('connection', (ws) => {
    
      
        ws.on('message', async (message) => {
    
            // const data = message.split(' ')
            try{
                const {
                    action,
                    matchId,
                    userId,
                    seat
                } = JSON.parse(message)
                console.log(action)
                
                if(action === 'join'){
                    if(! rooms[matchId]) rooms[matchId] = {}; // create the room
                    if(! rooms[matchId][userId]) rooms[matchId][userId] = ws; // join the room
                }
    
               else if (action === 'leave'){
                    if(! rooms[matchId][userId]) return;
    
                    // if the one exiting is the last one, destroy the room
                    if(Object.keys(rooms[matchId]).length === 1) delete rooms[matchId];
                    // otherwise simply leave the room
                    else delete rooms[matchId][userId];
                }
            }catch(e){
                
                ws.send({
                    error: e.message
                })
            }
            // console.log(data)
            //ws.send("Cleaninggggggggggg Codeeeeeeeeeeee")
        })
        ws.send('ho!')
        })

        router.post('/bookMatch', async(req,res) => {
            try{

                const {
                    matchId,
                    seat
                } = req.body
                const match = await Match.findOneAndUpdate({
                    _id: matchId
                },{
                    $addToSet:{
                        reservedSeats: seat
                    }
                })
                console.log(match);
                if(match.reservedSeats.includes(seat)) throw new Error('Seat is Already Reserved')
    
                match.reservedSeats.push(seat)
                console.log(match.reservedSeats)
                res.send()
                Object.entries(rooms[matchId]).forEach(([, sock]) => sock.send({ reservedSeats: match.reservedSeats }));
            }catch(e){
                res.status(400).send({
                    error:e.message
                })
            }
            
        })
        //Get Teams and Get Referees and Get LinesMen
        router.get('/getReferees',  async (req,res) => {
            res.send(await MainRefree.find({}))
        }) 
        router.get('/getLinesMen', async (req,res) => {

            res.send(await LinesMan.find({}))


        }) 
        router.get('/getTeams', async (req,res) => {

            res.send(await Team.find({}))


        }) 
        router.get('/getStadium', async(req, res) => {

            try{

                const stadiums = await Stadium.find({});

                res.send(stadiums)
            }catch(e){
                res.status(400).send({
                    error: e.message
                })
            }
        })
        router.get('/getMatches', async(req,res) => {


            res.send(await Match.find({}).populate('homeTeam').populate('awayTeam').populate('matchVenue')
            .populate('mainReferee').populate('linesman1').populate('linesman2'))
        })
    return router;

}