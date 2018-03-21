var contact_model=mongoose.Schema({
    "user_id":{
        type:String,
        unique:true,
        reqired:true
    },
    "contacts":[
        {
            "firstName":{
                type:String
            },
            "lastName":{
                type:String
            },
            "mobile":{
                type:Number,
                max:10,
                min:10
            },
            "joined":{
                type:Boolean,
                default:false
            }
        }
    ]
    
});
_contactModel=mongoose.model('contact',contact_model);

var contact=function(){
    var _getContacts=function(user_id,callback){
        if(user_id !=undefined && user_id !=null){
            _contactModel.find({"user_id":user_id},function(err,contact){
                if(!err){
                    result_obtained = {
                        data: contact,
                        message: config.messages.contact.get_successContact,
                        code: 200,
                        success: true
                    };
                    callback(null, result_obtained);
                }else{
                    error_obtained = {
                        data: err,
                        message: config.messages.contact.get_errorContact,
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

    var _createContact=function(jsonData,callback){
        var contactModel=new _contactModel(jsonData);
        contactModel.save(function(err,contact){
            if(!err){
                result_obtained = {
                    data: contact,
                    message: config.messages.contact.success_contact,
                    code: 201,
                    success: true
                };
                callback(null, result_obtained);
            }else{
                error_obtained = {
                    data: err,
                    message: config.messages.contact.error_contact,
                    code: 204,
                    success: false
                };
                callback(error_obtained, null); 
            }
        });
    };

    var _deleteContact=function(contact_id,callback){
        if(contact_id !=undefined && contact_id !=null){
            _contactModel.remove({"user_id":contact_id},function(err,contact){
                if(!err){
                    result_obtained = {
                        data: contact,
                        message: config.messages.contact.delete_success,
                        code: 200,
                        success: true
                    };
                    callback(null, result_obtained);
                }else{
                    error_obtained = {
                        data: err,
                        message: config.messages.contact.delete_error,
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

    var _updateContact=function(jsonData,callback){
        if(jsonData['user_id'] !=undefined && jsonData['user_id'] !=null){
            _contactModel.update({"user_id":jsonData.user_id},{$set:jsonData},function(err,contact){
                if(!err){
                    result_obtained = {
                        data: contact,
                        message: config.messages.contact.update_success,
                        code: 200,
                        success: true
                    };
                    callback(null, result_obtained);
                }else{
                    error_obtained = {
                        data: err,
                        message: config.messages.contact.update_error,
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
        getContacts:_getContacts,
        createContact:_createContact,
        deleteContact:_deleteContact,
        updateContact:_updateContact
    }
}();

module.exports=contact;