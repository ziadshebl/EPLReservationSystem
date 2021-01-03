const mongoose = require('mongoose')

const stadiumSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            unique: true
        },
        rows:{
            type: Number,
            required: true,
        },
        numberOfSeatsPerRow:{
            type: Number,
            required: true,
        }
    }
)


stadiumSchema.virtual('match', {
    ref: 'Match',
    localField: '_id',
    foreignField: 'matchVenue'
})

const Stadium = mongoose.model('Stadium', stadiumSchema, 'stadiums')

module.exports = Stadium