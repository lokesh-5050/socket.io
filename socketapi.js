const io = require("socket.io")();
const socketapi = {
    io: io
};


var username = []
var userId = []

// Add your socket.io logic here!
io.on("connection", function (socket) {

     //for user is typing
     socket.on("typing" , function(typedText){
        let index = userId.indexOf(socket.id)
        let whoIsTyping = username[index]
        console.log(whoIsTyping + " ....whoIsTyping");
        socket.broadcast.emit("typing" , whoIsTyping)
    })

    //for allOnlineUsers
    io.emit("onlineusers", username)

    console.log("A user connected");

    socket.on("name", function (name) {
        
        console.log(name);
        socket.broadcast.emit("name", name)
        username.push(name)
        userId.push(socket.id)
        socket.emit("loggedIn" , name)

        io.emit("onlineusers", username)


        console.log(username, userId);

    })

    socket.on("msg", function (msg) {
        console.log(msg + "    msg");
        var index = userId.indexOf(socket.id)
        var name = username[index]

        console.log(name + "  nam");
        io.emit("allmsg", { msg, name })
    })

    socket.on("disconnect", function (data) {
        let index = userId.indexOf(socket.id)
        var disconnectedUser = username[index]
        io.emit("disconnectedUser" , disconnectedUser)
        username.splice(index, 1)
        userId.splice(index, 1)
        io.emit("onlineusers", username)

        console.log(userId, username);



    })

   
});
// end of socket.io logic

module.exports = socketapi;