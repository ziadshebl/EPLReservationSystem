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

linesmanSchema.virtual('match', {
    ref: 'Match',
    localField: '_id',
    foreignField: 'linesman1'
})
linesmanSchema.virtual('match', {
    ref: 'Match',
    localField: '_id',
    foreignField: 'linesman2'
})

const Linesman = mongoose.model('Linesman', linesmanSchema)

module.exports = Linesman