chatNotification =function(data){
    fcm=new FCM(process.env.fcmServerKey);
    var message ={
        to:data.token,
        notification: {
            title: data.title, 
            body: data.body,
            icon:"",
            sound:"default" 
        }
    };

    fcm.send(message, function(err, response){
        if (err) {
            console.log("Something has gone wrong!");
        } else {
            console.log("Successfully sent with response: ", response);
        }
    });
};

module.exports = chatNotification;