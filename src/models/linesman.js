const mongoose = require('mongoose')

const linesmanSchema = new mongoose.Schema(
    {
        fullName:{
            type: String,
            required: true,
            unique: true
        },
    }
)

teamSchema.virtual('match', {
    ref: 'Match',
    localField: '_id',
    foreignField: 'linesman1'
})
teamSchema.virtual('match', {
    ref: 'Match',
    localField: '_id',
    foreignField: 'linesman2'
})

const Linesman = mongoose.model('Linesman', linesmanSchema)

module.exports = Linesman