io.on('connection',function(socket){
    console.log(' User Connected');

    socket.on('users',function(user){
        
    });

    socket.on('save-message', function(data){
        console.log(data);
        io.emit('new-message', data);
      });

    socket.on('disconnect',function(event){
        console.log(event);
        console.log("User Disconnected");
    })
});
