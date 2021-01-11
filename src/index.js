require('./db/mongoose')

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser');
const http = require('http')
const WebServer = require('ws')

//Different routes
const registerRouter = require('./routers/register.js');
const matchRouter = require('./routers/match')
const managerRouter = require('./routers/manager')
const userRouter = require('./routers/user')
const adminRouter = require('./routers/admin')

const MainRefree = require('./models/mainrefree')
const Team = require('./models/teams')
const LinesMan = require('./models/linesman')

const app = express()
const server = http.createServer(app)

const wss = new WebServer.Server({
    server: server,
    path: '/',
    perMessageDeflate: false
})
wss.on('connection', (ws) => {

  
    ws.on('message', message => {

        // const data = message.split(' ')
        try{
            const test = JSON.parse(message)
            console.log(test)
        }catch(e){
            console.log(e.message)
        }
        // console.log(data)
        ws.send("Cleaninggggggggggg Codeeeeeeeeeeee")
    })
    ws.addEventListener('')
    ws.send('ho!')
  })

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors({
    credentials:true,
    origin: '*'
}))
app.use(cookieParser())
app.use('/register',registerRouter)
app.use('/match', matchRouter)
app.use('/manager', managerRouter)
app.use('/user', userRouter)
app.use('/admin', adminRouter)

app.get('/seeds', (req, res) => {
    
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
        
    ])
    LinesMan.insertMany([
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
    res.send()
})

app.get('/', (req,res) =>{

    res.send('Gamed')
})


server.listen(process.env.PORT, () => {
    console.log('Server is Up on', process.env.PORT)
})
