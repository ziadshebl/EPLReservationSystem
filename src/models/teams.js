const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            unique: true
        },
    }
)

teamSchema.virtual('homeMatch', {
    ref: 'Match',
    localField: '_id',
    foreignField: 'homeTeam'
})

teamSchema.virtual('awayMatch', {
    ref: 'Match',
    localField: '_id',
    foreignField: 'awayTeam'
})

const Team = mongoose.model('Team', teamSchema)

module.exports = Team

