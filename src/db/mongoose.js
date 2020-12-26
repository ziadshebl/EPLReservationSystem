const mongoose = require('mongoose')

const connectionURL = process.env.MONGOOSEDB

mongoose.connect(connectionURL,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
