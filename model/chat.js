var chat_modal=mongoose.Schema({
    receiver_id:{
        type:String,
        required:true
    },
    sender_id:{
        type:String,
        require:true
    },
    receiver_name:{
        type:String
    },
    sender_name:{
        type:String
    },
    created_at:{
        type:Date
    },
    update_at:{
        type:Date
    },
    chat_type:{
        type:String,
        required:true
    },
    message:{
        type:String,
        require:true
    },
    reply:{
        type:Boolean,
        default:false
    },
    reply_message:{
        type:String
    }
});

_chatModal=mongoose.model('Chat',chat_modal);


var chat=function(){
var error_obtained="",result_obtained="";

var _getChat=function(jsonData,callback){
    if((jsonData.receiver  !=undefined && jsonData !=null) || (jsonData.sender !=undefined && jsonData.sender !=null)){
        _chatModal.find({$and:[{"receiver_id":jsonData.receiver},{"sender_id":jsonData.sender}]},function(err,message){
            if(!err){
                result_obtained = {
                    data: message,
                    message: config.messages.chat.get_success,
                    code: 200,
                    success: true
                };
                callback(null, result_obtained);
            }else{
                error_obtained = {
                    data: err,
                    message: config.messages.chat.error_chat,
                    code: 204,
                    success: false
                };
                callback(error_obtained, null);
            }
        });
    }else{
        error_obtained = {
            data: "",
            message: config.messages.error.invalid_parameter,
            code: 400,
            success: false
        };
        callback(error_obtained, null);
    }  
};


var _createChat=function(jsonData,callback){
    var chatModel = new _chatModal(jsonData);
    chatModel.save(function(err,message){
        if(!err){
            result_obtained = {
                data: message,
                message: config.messages.chat.success_chat,
                code: 201,
                success: true
            };
            callback(null, result_obtained);
        }else{
            error_obtained = {
                data: err,
                message: config.messages.chat.error_Chat,
                code: 204,
                success: false
            };
            callback(error_obtained, null);
        }
    });
};

var _updateChat=function(chat_id,jsonData,callback){
    if(chat_id !=undefined && chat_id !=null){
        _chatModal.update({"_id":chat_id},{$set:jsonData},function(err,message){
            if(!err){
                result_obtained = {
                    data: message,
                    message: config.messages.chat.success_chat,
                    code: 201,
                    success: true
                };
                callback(null, result_obtained);
            }else{
                error_obtained = {
                    data: err,
                    message: config.messages.chat.error_Chat,
                    code: 204,
                    success: false
                };
                callback(error_obtained, null);
            }
        });
    }else{
        error_obtained = {
            data: "",
            message: config.messages.chat.error_Chat,
            code: 400,
            success: false
        };
        callback(error_obtained, null);
    }
}

var _deleteChat=function(chat_id,callback){
    if(chat_id !=undefined && chat_id !=null){
        _chatModal.remove({"_id":chat_id},function(err,data){
            if(!err){
                result_obtained = {
                    data: data,
                    message: config.messages.chat.delete_chat,
                    code: 200,
                    success: true
                };
                callback(null, result_obtained);
            }else{
                error_obtained = {
                    data: err,
                    message: config.messages.chat.error_deleteChat,
                    code: 204,
                    success: false
                };
                callback(error_obtained, null);
            }
        });
    }else{
        error_obtained = {
            data: "",
            message: config.messages.error.invalid_parameter,
            code: 400,
            success: false
        };
        callback(error_obtained, null);
    }
};

return{
    getChat:_getChat,
    createChat:_createChat,
    updateChat:_updateChat,
    deleteChat:_deleteChat
};

}();

module.exports=chat;