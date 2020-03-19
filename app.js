
var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var userList = [];

app.use(express.static(__dirname + '/www'));

app.get('/', function(req, res){
    res.sendfile('./www/default.html');
})

io.sockets.on('connection', function (socket) {

    socket.on('user', function (usr) {
        socket.userName = usr;
        socket.emit('greetings', 'Welcome  ' + '<b>' + socket.userName + '</b>' + ' to this message group.');
        socket.broadcast.emit('updateChat', socket.userName, ' New User just joined.');
    });
    socket.on('userImage', function (image) {
        io.sockets.emit('addimage', socket.userName, image);
    });
    socket.on('chatSMS', function (message) {
        io.sockets.emit('updateChat', socket.userName, message);
    });
});
server.listen(8080, function () {
    console.log('Server is running on port http://localhost:8080');
});