const mongoose = require('mongoose')

const matchSchema = new mongoose.Schema(
    {
        homeTeam:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Team'
        },
        awayTeam:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Team'
        },
        matchVenue:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Stadium'
        },
        date:{
            type: Date,
            required: true,
            unique: true
        },
        time:{
            type: String,
            required: true,
            unique: true
        },
        mainReferee:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'MainReferee'
        },
        linesman1:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Linesman'
        },
        linesman2:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Linesman'
        },
        reservedSeats:{
            type: Array,
            required: true,
            unique: true,
            default: [],
        },
        allSeats:{
            type: Array,
            required: true,
            unique: true
        },
    }
)

const Match = mongoose.model('Match', matchSchema)

module.exports = Match