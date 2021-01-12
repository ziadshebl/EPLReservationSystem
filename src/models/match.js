const mongoose = require('mongoose')

const matchSchema = new mongoose.Schema(
    {
        homeTeam:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Team',
            unique:false,
        },
        awayTeam:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Team',
            unique:false,
        },
        matchVenue:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Stadium'
        },
        date:{
            type: Date,
            required: true,
           
        },
        time:{
            type: String,
            required: true,
           
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
            type: [String],
            required: true,
            default: [],
        },
        allSeats:{
            type: [String],
            required: true
        },
    }
)

matchSchema.index({homeTeam: 1, awayTeam: 1}, {unique: true});
const Match = mongoose.model('Match', matchSchema)

module.exports = Match