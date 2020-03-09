const io = require('socket.io')(3000)

const users = {}
const colors = {}

io.on('connection', socket => {
    // socket.on('user-list', () => {
    //     socket.emit('users-connected', io.sockets.clients())
    // })
    socket.on('color-user', color => {
        colors[socket.id] = color
    })
    socket.on('new-user', name => {
        users[socket.id] = name
        // socket.broadcast.emit('user-connected', name)
        socket.emit('users-connected', users[socket.id])
        socket.broadcast.emit('users-connected', users[socket.id])
    })
    socket.on('send-chat-message', message => {
        if (message.startsWith("/nickcolor")) {
            var newColor = message.substring(10);
            socket.emit('change-color', newColor)
            colors[socket.id] = newColor
        } else if (message.startsWith("/nick")) {
            var newName = message.substring(5);
            socket.emit('assign-user', newName)
            socket.emit('remove-user', users[socket.id])
            socket.broadcast.emit('remove-user', users[socket.id])
            users[socket.id] = newName
            socket.emit('users-connected', users[socket.id])
            socket.broadcast.emit('users-connected', users[socket.id])
        } else {
            var now = new Date();
            var h = now.getHours();
            var m = now.getMinutes();
            if (m < 10) {m = "0"+m;}
            var name = users[socket.id]
            var color = colors[socket.id]
            var coloredName = name.fontcolor(color)
            socket.broadcast.emit('chat-message', { message: message, name: coloredName, time: h+":"+m })
        }
    })
    socket.on('disconnect', () => {
        // socket.broadcast.emit('user-disconnected', users[socket.id])
        socket.emit('remove-user', users[socket.id])
        socket.broadcast.emit('remove-user', users[socket.id])
        delete users[socket.id]
    })
})