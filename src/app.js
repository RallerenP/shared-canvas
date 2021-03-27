const express = require('express');
const app = express();

const http = require('http').Server(app)
const io = require('socket.io')(http, {cors: {
    origin: '*'
    }});
const cors = require('cors');

app.use(cors());


const { join } = require('path')

const sockets = {}

io.on('connection', (socket) => {
    socket.broadcast.emit('CLIENT_CONNECT', socket.id)

    Object.keys(sockets).forEach(key => socket.emit('CLIENT_CONNECT', key));
    sockets[socket.id] = socket;

    socket.on('MOUSE_MOVE', pos => {
        socket.broadcast.emit('CLIENT_MOVE', socket.id, pos);
    })

    socket.on('DRAW', (last, pos, col) => {
        io.sockets.emit('DRAW', last, pos, col)
    })

    socket.on('disconnect', () => {
        socket.broadcast.emit('CLIENT_DISCONNECT', socket.id)
        delete sockets[socket.id];
    })
})

app.use(express.static(join(__dirname, 'client')))

app.get('/socket.io/socket.io.js', (req, res) => {
    res.sendFile(join(__dirname, '..', 'node_modules', 'socket.io', 'client-dist', 'socket.io.js'))
})

http.listen(3000, () => {
    console.clear();
    console.log("Listening on port 3000...")
})
