router.route('/getFriends/:user_id').get(passport.authenticate('jwt', { session: true }),function(req,res){
    try{
        var infoMsg = {
            "url": req.originalUrl,
            "params": req.body || req.params,
            "data": req.body || req.query || req.params
        };
        winston.info(infoMsg);
        var user_id=req.params.user_id;
        friendsController.getAllFriends(user_id,function(err,friend){
            if(!err){
                res.json({
                    result: friend
                });
            }else{
                res.json({
                    result: err
                });
            }
        });
    }catch(error){
        res.json({
            result: error,
            code: 204,
            message: config.messages.common.invalid_parameter
        });
    }
});

router.route('/getFriendProfile/:user_id').get(passport.authenticate('jwt', { session: true }),function(req,res){
    try{
        var infoMsg = {
            "url": req.originalUrl,
            "params": req.body || req.params,
            "data": req.body || req.query || req.params
        };
        winston.info(infoMsg);
        var user_id=req.params.user_id;
        friendsController.getFriends(user_id,function(err,friend){
            if(!err){
                res.json({
                    result: friend
                });
            }else{
                res.json({
                    result: err
                });
            }
        });
    }catch(error){
        res.json({
            result: error,
            code: 204,
            message: config.messages.common.invalid_parameter
        });
    }
});

router.route('/getFriendRequest/:user_id').get(passport.authenticate('jwt', { session: true }),function(req,res){
    try{
        var infoMsg = {
            "url": req.originalUrl,
            "params": req.body || req.params,
            "data": req.body || req.query || req.params
        };
        winston.info(infoMsg);
        var user_id=req.params.user_id;
        friendsController.getFriendRequest(user_id,function(err,friend){
            if(!err){
                res.json({
                    result: friend
                });
            }else{
                res.json({
                    result: err
                });
            }
        });
    }catch(error){
        res.json({
            result: error,
            code: 204,
            message: config.messages.common.invalid_parameter
        });
    }
});

router.route('/sendFriendRequest').post(passport.authenticate('jwt', { session: true }),function(req,res){
try{
    var infoMsg = {
        "url": req.originalUrl,
        "params": req.body || req.params,
        "data": req.body || req.query || req.params
    };
    winston.info(infoMsg);
    friendsController.sendRequest(req.body,function(err,data){
        if(!err){
            res.json({
                result: data
            });
        }else{
            res.json({
                result: err
            });
        }
    });
}catch(error){
    res.json({
        result: error,
        code: 204,
        message: config.messages.common.invalid_parameter
    });
}
});
module.exports=router;