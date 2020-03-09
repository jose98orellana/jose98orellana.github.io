const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
var usersContainer = document.getElementById('users-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

var name = "user"+Math.floor((Math.random() * 100) + 1);
var color = "#000000"
appendMessage(`You are ${name}.`)
socket.emit('new-user', name)
socket.emit('color-user', color)

socket.on('assign-user', name => {
    setUsername(`${name}`)
})

socket.on('change-color', color => {
    changeColor(`${color}`)
})

socket.on('chat-message', data => {
    appendMessage(`${data.time} ${data.name}: ${data.message}`)
})

socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected`)
})

socket.on('user-connected', name => {
    appendMessage(`${name} connected`)
})

socket.on('users-connected', name => {
    appendUser(`${name}`)
})

socket.on('remove-user', name => {
    removeUser(`${name}`)
})

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    var now = new Date();
    var h = now.getHours();
    var m = now.getMinutes();
    if (m < 10) {m = "0"+m;}
    var time = h+":"+m
    var coloredName = name.fontcolor(color)
    var preMessage = time+" "+coloredName+": "+message
    var finalMessage = preMessage.bold()
    appendMessage(`${finalMessage}`)
    socket.emit('send-chat-message', message)
    messageInput.value = ''
})

function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerHTML = message
    messageContainer.append(messageElement)
}
function appendUser(user) {
    var userElement = document.createElement('div')
    userElement.id = user
    userElement.innerText = user
    usersContainer.append(userElement)
}
function removeUser(user) {
    document.getElementById(user).remove();
}
function setUsername(username) {
    name = username
}
function changeColor(newColor) {
    color = newColor
}