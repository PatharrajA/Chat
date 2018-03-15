var group_model=mongoose.Schema({
    group_name:{
        type:String,
        required:true
    },
    group_icon:{
        type:String,
        default:""
    },
    group_member:[],
    member_count:{
        type:Number,
        default:0
    },
    updated_at:{
        type:Date,
        default:Date.now()
    },
    group_admins:[],
    activity:[]
});

_groupModel=mongoose.model('Group',group_model);

var group=function(){

    var error_obtained="",
    result_obtained="";

    var _createGroup=function(jsondata,callback){
        var groupModel=new _groupModel(jsondata);
        groupModel.save(function(err,group){
            if(!err){
                result_obtained = {
                    data: group,
                    message: config.messages.group.success_group,
                    code: 201,
                    success: true
                };
                callback(null,result_obtained);
            }else{
                error_obtained={
                    data:err,
                    message:config.messages.group.error_group,
                    code: 204,
                    success: false
                };
                callback(error_obtained,null);
            }
        });
    };

    var _getGroup=function(group_id,callback){
        if(group_id !=undefined && group_id !=null){
            _groupModel.find({"_id":group_id},function(err,group){
                if(!err){
                    if(group.length>0){
                        result_obtained = {
                            data: group,
                            message: config.messages.group.get_groupSuccess,
                            code: 200,
                            success: true
                        };
                        callback(null,result_obtained);
                    }else{
                        result_obtained = {
                            data: [],
                            message: config.messages.group.get_groupSuccess,
                            code: 200,
                            success: true
                        };
                        callback(null,result_obtained);
                    }
                }else{
 error_obtained={
                    data:err,
                    message:config.messages.group.get_groupError,
                    code: 204,
                    success: false
                };
                callback(error_obtained,null);
                }
            });
        }else{
            error_obtained = {
                data: "",
                message: config.messages.common.params_error,
                code: 400,
                success: false
            };
            callback(error_obtained, null); 
        }
    };

    var _leftGroup=function(group_id,user_id,callback){
        if((group_id !=undefined && group_id !=null) || (user_id !=undefined && user_id !=null)){
            _groupModel.find({"_id":group_id},function(err,group){
                var group=group[0];
                if(!err){
                    if(group.group_member.length>0){
                        for(var i=0;i<group.group_member.length;i++){
                            if(group.group_member[i].member_id == user_id){
                                group.group_member.splice(i,1);
                            }
                        }
                    }
                    _groupModel.update({"_id":group.id},{$set:group},function(error,groups){
                        if(!error){
                            result_obtained = {
                                data: group,
                                message: config.messages.group.left_groupSuccess,
                                code: 200,
                                success: true
                            };
                            callback(null,result_obtained);
                            if(group.group_member.length ==0){
                                _groupModel.remove({"_id":group_id},function(error,data){
                                    console.log(error);
                                    console.log(data)
                                });
                            }
                            
                        }else{
                            error_obtained={
                                data:groups,
                                message:config.messages.group.left_groupError,
                                code: 204,
                                success: false
                            };
                            callback(error_obtained,null);    
                        }
                    });
                }else{
                    error_obtained={
                        data:err,
                        message:config.messages.group.no_group,
                        code: 204,
                        success: false
                    };
                    callback(error_obtained,null);    
                }
            });
        }else{  
            error_obtained = {
                data: "",
                message: config.messages.common.params_error,
                code: 400,
                success: false
            };
            callback(error_obtained, null); 
        }
    };

    var _updateGroup=function(jsondata,callback){
        if(jsondata['group_id'] !=undefined && jsondata['group_id'] !=null){
            _groupModel.update({"_id":jsondata.group_id},{$set:jsondata},function(err,group){
                if(!err){
                    result_obtained = {
                        data: group,
                        message: config.messages.group.update_groupSuccess,
                        code: 200,
                        success: true
                    };
                    callback(null,result_obtained);
                }else{
                    error_obtained={
                        data:groups,
                        message:config.messages.group.update_groupError,
                        code: 204,
                        success: false
                    };
                    callback(error_obtained,null);    
                }
            });
        }else{
            error_obtained={
                data:"",
                message:config.messages.group.params_error,
                code: 400,
                success: false
            };
            callback(error_obtained,null);
        }
    };

    return {
        createGroup:_createGroup,
        getGroup:_getGroup,
        leftGroup:_leftGroup,
        updateGroup:_updateGroup
    }
}();

module.exports=group;