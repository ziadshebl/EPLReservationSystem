const mongoose = require('mongoose')

const mainRefereeSchema = new mongoose.Schema(
    {
        fullName:{
            type: String,
            required: true,
            unique: true
        },
    }
)

mainRefereeSchema.virtual('match', {
    ref: 'Match',
    localField: '_id',
    foreignField: 'mainReferee'
})

const MainReferee = mongoose.model('MainReferee', mainRefereeSchema)

module.exports = MainReferee