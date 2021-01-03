require('./db/mongoose')

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser');

//Different routes
const registerRouter = require('./routers/register.js')
// const userRouter = require('./routers/user.js')
// const postRouter = require('./routers/post.js')
// const adminRouter = require('./routers/admin')
// const supplierRouter = require('./routers/supplier')
// const storeRouter = require('./routers/store.js')
//Configuring the app
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors({
    credentials:true,
    origin: '*'
}))
app.use(cookieParser())
app.use('/register',registerRouter)
app.get('/', (req,res) => {

    res.send("Gamed");
})

app.listen(process.env.PORT, () => {
    console.log('Server is Up on', process.env.PORT)
})