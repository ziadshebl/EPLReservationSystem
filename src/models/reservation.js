const mongoose = require('mongoose')

const reservationSchema = new mongoose.Schema(
    {
        matchId:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Match'
        },
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        seat:{
            type: String,
            required: true,
        },
    }
)

const Reservation = mongoose.model('Reservation', reservationSchema)

module.exports = Reservation