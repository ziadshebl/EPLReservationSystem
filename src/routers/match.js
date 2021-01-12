const express = require('express')

//Improting Models
const MainRefree = require('../models/mainrefree')
const Team = require('../models/teams')
const LinesMan = require('../models/linesman')
const Match = require('../models/match')
const Stadium = require('../models/stadium')
const Reservation = require('../models/reservation')
// //Importing auth
const { checkAccessTokenOnly} = require('../middleware/auth')

//Intialize router
const router = express.Router()


module.exports = function(wss){

    try{
        const rooms = {}
    wss.on('connection', (ws) => {
        ws.on('unhandledRejection', (reason, p) => {
            console.log('Unhandled Rejection at: Promise', p, 'reason:', reason.stack);
            // application specific logging, throwing an error, or other logic here
          });
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
                    rooms[matchId][userId] = ws; // join the room
                    
                }
    
               else if (action === 'disconnect'){
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
  
        router.post('/bookMatch',checkAccessTokenOnly ,async(req,res) => {
            try{

                const {
                    matchId,
                    seat
                } = req.body
                const match = await Match.findOneAndUpdate({
                    _id: matchId,
                    allSeats:{$all:seat},
                    reservedSeats:{
                        $not:{
                            $all:seat
                        }
                    }
                },{
                    $addToSet:{
                        reservedSeats: seat
                    }
                },{
                    new: true
                })
                //console.log(match);
                if(!match) throw new Error('Seats Are Reserved')
               
                
                seat.forEach(async (s) => {
                    const reservation = new Reservation({
                        matchId,
                        seat:s,
                        userId: req.user._id
    
                    })
                    await reservation.save()
                })
               
                
                if(rooms[matchId])
                Object.entries(rooms[matchId]).forEach(([, sock])=> {

                    
                    sock.send(JSON.stringify({ reservedSeats: match.reservedSeats }))
                     
                    });
                res.send()
            
            }catch(e){
                console.log(e)
                res.status(400).send({
                    error:e.message
                })
            }
            
        })

        router.post('/cancelReservation', checkAccessTokenOnly, async(req,res) => {

            try{

                const {
                    reservationId,
                    seat
                } = req.body
                const reservation = await Reservation.findOneAndDelete({
                    _id: reservationId
                })
                console.log(reservation)
                if(!reservation) throw new Error('No reservation Found')
                const match = await Match.findOneAndUpdate({
                       _id: reservation.matchId,
                        allSeats:seat
                },{
                        $pull:{
                            reservedSeats: seat
                        }
                },{
                    new: true
                })
                if(!match) throw new Error('No Match Found')
                console.log(match)
                if(rooms[match.id])
                Object.entries(rooms[match.id]).forEach(([, sock])=> {
                    sock.send(JSON.stringify({ reservedSeats: match.reservedSeats }))
                    });
                res.send()
            
            }catch(e){
                console.log(e)
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
    }catch(e){

        console.log(e.message)
    }
    

}