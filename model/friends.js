var friend_model=mongoose.Schema({
    user_id:{
        type:String,
        required:true
    },
    friend_id:{
        type:String,
        required:true
    },
    profile:[],
    request_profile:[],
    status:{
        type:Boolean,
        required:false
    }
}); 

_friendsModel=mongoose.model('friends',friend_model);

var _friends=function(){
    var error_obtained="",
        result_obtained="";
    
    _getFriends=function(user_id,callback){
        if(user_id !=undefined && user_id !=null){
        _friendsModel.find({$and:[{"user_id":user_id},{"status":true}]},function(err,friends){
            if(!err){
                if(friends.length>=1){
                    result_obtained = {
                        data: friends,
                        message: config.messages.friends.getFriends,
                        code: 200,
                        success: true
                    };
                    callback(null, result_obtained);
                }else{
                    result_obtained = {
                        data: "No Friends Found",
                        message: config.messages.friends.getFriends,
                        code: 200,
                        success: true
                    };
                    callback(null, result_obtained);
                }
               
            }else{
                error_obtained = {
                    data: err,
                    message: config.messages.friends.error_getFriends,
                    code: 204,
                    success: false
                };
                callback(error_obtained, null);
            }
        });
    }else{
        error_obtained = {
            data: "",
            message: config.messages.error.params_error,
            code: 400,
            success: false
        };
        callback(error_obtained, null); 
    }
    };

    _getFriendProfile=function(user_id,callback){
        if(user_id !=undefined && user_id !=null){
        _userModel.findById({"_id":user_id},function(err,friend){
            if(!err){
                result_obtained = {
                    data: friend,
                    message: config.messages.friends.getFriends,
                    code: 200,
                    success: true
                };
                callback(null, result_obtained);
            }else{
                error_obtained = {
                    data: err,
                    message: config.messages.friends.error_getFriends,
                    code: 204,
                    success: false
                };
                callback(error_obtained, null);
            }
        });
    }else{
        error_obtained = {
            data: "",
            message: config.messages.error.params_error,
            code: 400,
            success: false
        };
        callback(error_obtained, null); 
    }
    };

    _unfriend=function(user_id,callback){
        if(user_id !=undefined && user_id !=null){
        _friendsModel.findByIdAndRemove({"friend_id":user_id},function(err,data){
if(!err){
    result_obtained = {
        data: data,
        message: config.messages.friends.success_unfriend,
        code: 200,
        success: true
    };
    callback(null, result_obtained);
}else{
    error_obtained = {
        data: err,
        message: config.messages.friends.error_unfriend,
        code: 204,
        success: false
    };
    callback(error_obtained, null);
}
        });
    }else{
        error_obtained = {
            data: "",
            message: config.messages.error.params_error,
            code: 400,
            success: false
        };
        callback(error_obtained, null); 
    }
    };

    _getFriendRequest=function(friend_id,callback){
        if(friend_id !=undefined && friend_id !=null){
            _friendsModel.find($and[{"friend_id":friend_id},{"status":false}],function(err,friendList){
                if(!err){
                    result_obtained = {
                        data: friendList,
                        message: config.messages.friends.getFriends,
                        code: 200,
                        success: true
                    };
                    callback(null, result_obtained);  
                }else{
                    error_obtained = {
                        data: err,
                        message: config.messages.friends.error_getFriends,
                        code: 204,
                        success: false
                    };
                    callback(error_obtained, null);
                }
            });
        }else{
            error_obtained = {
                data: "",
                message: config.messages.error.params_error,
                code: 400,
                success: false
            };
            callback(error_obtained, null); 
        }
    }

_sendRequest=function(jsonData,callback){
    var friends =new _friendsModel(jsonData);
    friends.save(function(err,data){
        if(!err){
            result_obtained = {
                data: data,
                message: config.messages.friends.success_friends,
                code: 200,
                success: true
            };
            callback(null, result_obtained);
        }else{
            error_obtained = {
                data: err,
                message: config.messages.friends.error_request,
                code: 204,
                success: false
            };
            callback(error_obtained, null);
        }
    })
};

_acceptFriendRequest=function(jsonData,callback){
    if((jsonData.user_id !=undefined && jsonData.user_id !=null) || (jsonData.request_id !=undefined && jsonData.request_id !=null)){
        var data={"staus":true};
        var updateUserModal=jsonData.friendInfo;
        _friendsModel.findByIdAndUpdate({"_id":jsonData.request_id},{$set:data},function(err,data){
            if(!err){
                _userModel.update({"_id":jsonData.user_id},{$set:updateUserModal},function(err,user){
                    if(err){
                        error_obtained = {
                            data: err,
                            message: config.messages.error.no_user,
                            code: 204,
                            success: false
                        };
                        callback(error_obtained, null);
                    }
                });
                result_obtained = {
                    data: data,
                    message: config.messages.friends.success_friends,
                    code: 200,
                    success: true
                };
                callback(null, result_obtained);

            }else{
                error_obtained = {
                    data: err,
                    message: config.messages.friends.error_accept,
                    code: 204,
                    success: false
                };
                callback(error_obtained, null);
            }
        }); 
    }else{
        error_obtained = {
            data: "",
            message: config.messages.error.params_error,
            code: 400,
            success: false
        };
        callback(error_obtained, null); 
    }
};

_declineFriendRequest=function(request_id,callback){
    if(request_id  !=undefined && request_id !=null){
        _friendsModel.remove({"_id":request_id},function(err,data){
            if(!err){
                result_obtained = {
                    data: data,
                    message: config.messages.friends.success_friends,
                    code: 200,
                    success: true
                };
                callback(null, result_obtained); 
            }else{
                error_obtained = {
                    data: err,
                    message: config.messages.friends.error_accept,
                    code: 204,
                    success: false
                };
                callback(error_obtained, null);
            }
        });
    }else{
        error_obtained = {
            data: "",
            message: config.messages.error.params_error,
            code: 400,
            success: false
        };
        callback(error_obtained, null);  
    }
};


return {
    getAllFriends:_getFriends,
    getFriends:_getFriendProfile,
    getFriendRequest:_getFriendRequest,
    unfriend:_unfriend,
    sendRequest:_sendRequest,
    acceptFriendRequest:_acceptFriendRequest,
    declineFriendRequest:_declineFriendRequest
}

}();

module.exports =_friends;