const socket = require('socket.io')




module.exports = function(server){
    
    const io = socket(server);

    io.on('connection',() => {
        console.log("Connected")
    })
    console.log('Ana Hena')
}