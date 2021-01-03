require('./db/mongoose')

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser');

//Different routes
const registerRouter = require('./routers/register.js');
const { aggregate } = require('./models/user');
const MainRefree = require('./models/mainrefree')
const Team = require('./models/teams')
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
app.get('/add/referees', (req,res) => {

    MainRefree.insertMany([
        {
            fullName:"Amen Omar"
        },
        {
            fullName:"Mohamed Farouk"
        },
        {
            fullName:"Mahmoud Ashour"
        },
        {
            fullName:"Gehad Gresha"
        },
        {
            fullName:"Mohamed Abbas"
        },
        {
            fullName:"Mohamed Abdelkader Morsy"
        },
        {
            fullName:"Samir Mahmoud Osman"
        },
        {
            fullName:"Tawfeek El Sayed"
        },
        {
            fullName:"Yasser Abdelraouf"
        },
        {
            fullName:"Hamdy Shaaban"
        },
        {
            fullName:"Mamdouh Mostafa"
        },
        {
            fullName:"Ahmed Bakr"
        },
        {
            fullName:"Mostafa Attia"
        },
        {
            fullName:"Ahmed El Kayal"
        },
        {
            fullName:"Mohamed Azazi"
        },
        {
            fullName:"Ahmed Attia"
        },
        {
            fullName:"Tahseen Elsadat"
        },
        {
            fullName:"Hany Abdelfattah"
        },
        {
            fullName:"Diaa El Sakran"
        },
        {
            fullName:"Ayman Degesh"
        },
    ])


    res.send();
})
app.get('/add/teams', (req,res) => {


    Team.insertMany([
        {
            name:"Gouna"
        },
        {
            name:"Ahly"
        },
        {
            name:"Zamalek"
        },
        {
            name:"Masry"
        },
        {
            name:"Pyramids"
        },
        {
            name:"Itihad El Sakandary"
        },
        {
            name:"Ceramica Cleopatra"
        },
        {
            name:"Misr El Makassa"
        },
        {
            name:"Ismaily"
        },
        {
            name:"Smouha"
        },
        {
            name:"Aswan"
        },
        {
            name:"Wadi Degla"
        },
        {
            name:"Bank Al Ahly"
        },
        {
            name:"Ghazla Al Mahala"
        },
        {
            name:"Enppi"
        },
        {
            name:"Mokawlon Al Arab"
        },
        {
            name:"Talae El Gesh"
        }
    ])

})
app.listen(process.env.PORT, () => {
    console.log('Server is Up on', process.env.PORT)
})