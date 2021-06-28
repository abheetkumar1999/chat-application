const express = require('express')
const app = express();


//created server
const http = require('http').createServer(app)

//created the port
const port = process.env.PORT || 8000
//listening the port
http.listen(port,()=>{
    console.log(`connected to the ${port}`)
})
//serving index.html 
app.use(express.static(__dirname+'/public'))
app.get('/', (req,res)=>{
    res.sendFile(__dirname+'/public/index.html');
})

//created the socket.io
const io=require('socket.io')(http)
io.on("connection",(socket)=>{
    console.log('connected')
    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg);
    })
})
