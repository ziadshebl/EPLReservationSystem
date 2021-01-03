const express = require('express')

//Improting Models
const MainRefree = require('../models/mainrefree')
const Team = require('../models/teams')
const LinesMan = require('../models/linesman')
const Match = require('../models/match')
// //Importing auth
// const { checkAccessToken, checkRefreshToken, checkResetPasswordToken } = require('../middleware/auth')

//Intialize router
const router = express.Router()

//Get Teams and Get Referees and Get LinesMen
router.get('/getReferees', async (req,res) => {
    res.send(await MainRefree.find({}))
}) 
router.get('/getLinesMen', async (req,res) => {

    res.send(await LinesMan.find({}))


}) 
router.get('/getTeams', async (req,res) => {

    res.send(await Team.find({}))


}) 


module.exports = router