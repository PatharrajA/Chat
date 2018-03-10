io.on('connection',function(socket){
    console.log(socket);
    console.log(' User Connected');

    socket.on('users',function(user){
        
    });
    socket.on('disconnect',function(event){
        console.log(event);
        console.log("User Disconnected");
    })
});
