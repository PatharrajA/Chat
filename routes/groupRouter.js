/**
 * Create Group
 * @constructor 
 * @param {string} title - Create New Group
 * @param {string} author - Patharraj
 * @description Create New Group
 * @returns Group
 */
router.route('/').post(passport.authenticate('jwt', { session: true }),function(req,res){
try{
    var infoMsg = {
        "url": req.originalUrl,
        "params": req.body || req.params,
        "data": req.body || req.query || req.params
    };
    winston.info(infoMsg);
    groupController.createGroup(req.body,function(err,group){
        if(!err){
            res.json({
                result:group
            });
        }else{
            res.json({
                result:err
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

/**
 * Get Groups.
 * @constructor 
 * @param {string} title - Get group
 * @param {string} author - Patharraj
 * @param {string} Parameter - group_id
 * @description Get Group by id
 * @returns Group
 */
router.route('/:group_id').get(passport.authenticate('jwt', { session: true }),function(req,res){
    try{
        var infoMsg = {
            "url": req.originalUrl,
            "params": req.body || req.params,
            "data": req.body || req.query || req.params
        };
        winston.info(infoMsg);
        var group_id=req.body.group_id || req.params.group_id || req.query.group_id;
        groupController.getGroup(group_id,function(err,data){
            if(!err){
                res.json({
                    result:data
                });
            }else{
                res.json({
                    result:err
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


router.route('/leftGroup').put(passport.authenticate('jwt', { session: true }),function(req,res){
    try{
        var infoMsg = {
            "url": req.originalUrl,
            "params": req.body || req.params,
            "data": req.body || req.query || req.params
        };
        winston.info(infoMsg);
        var group_id=req.body['group_id'],
        user_id=req.body['user_id'];
        groupController.leftGroup(group_id,user_id,function(err,data){
            if(!err){
                res.json({
                    result:data
                });
            }else{
                res.json({
                    result:err
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

router.route('/updateGroup').put(passport.authenticate('jwt', { session: true }),function(req,res){
    try{
        var infoMsg = {
            "url": req.originalUrl,
            "params": req.body || req.params,
            "data": req.body || req.query || req.params
        };
        winston.info(infoMsg);
        console.log(req.body);
        groupController.updateGroup(req.body,function(err,data){
            if(!err){
                res.json({
                    result:data
                });
            }else{
                res.json({
                    result:err
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

module.exports = router;