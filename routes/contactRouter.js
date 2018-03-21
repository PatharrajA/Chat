router.route('/:user_id').get(passport.authenticate('jwt', { session: true }),function(req,res){
   try{
    var infoMsg = {
        "url": req.originalUrl,
        "params": req.body || req.params,
        "data": req.body || req.query || req.params
    };
    winston.info(infoMsg);
    var user_id=req.params.user_id|| req.body.user_id || req.query.user_id;
    contactController.getContacts(user_id,function(err,contact){
        if(!err){
res.json({
    result:contact
});
        }else{
            res.json({
                result:err
            });
        }
    });
   } catch(error){
    res.json({
        result: error,
        code: 204,
        message: config.messages.common.invalid_parameter
    });
   }
})
.delete(passport.authenticate('jwt', { session: true }),function(req,res){
    try{
        var infoMsg = {
            "url": req.originalUrl,
            "params": req.body || req.params,
            "data": req.body || req.query || req.params
        };
        winston.info(infoMsg);
        var user_id=req.params.user_id|| req.body.user_id || req.query.user_id;
        contactController.deleteContact(user_id,function(err,contact){
            if(!err){
    res.json({
        result:contact
    });
            }else{
                res.json({
                    result:err
                });
            }
        });
       } catch(error){
        res.json({
            result: error,
            code: 204,
            message: config.messages.common.invalid_parameter
        });
       }
});
router.route('/').put(passport.authenticate('jwt', { session: true }),function(req,res){
    try{
        var infoMsg = {
            "url": req.originalUrl,
            "params": req.body || req.params,
            "data": req.body || req.query || req.params
        };
        winston.info(infoMsg);
        contactController.updateContact(req.body,function(err,contact){
            if(!err){
                res.json({
                    result:contact
                });
                        }else{
                            res.json({
                                result:err
                            });
                        } 
        });
} catch(error){
    res.json({
        result: error,
        code: 204,
        message: config.messages.common.invalid_parameter
    });
   }
})


router.route('/').post(passport.authenticate('jwt', { session: true }),function(req,res){
    try{
        var infoMsg = {
            "url": req.originalUrl,
            "params": req.body || req.params,
            "data": req.body || req.query || req.params
        };
        winston.info(infoMsg);
        contactController.createContact(req.body,function(err,contact){
            if(!err){
                res.json({
                    result:contact
                });
                        }else{
                            res.json({
                                result:err
                            });
                        } 
        });
} catch(error){
    res.json({
        result: error,
        code: 204,
        message: config.messages.common.invalid_parameter
    });
   }
});
module.exports=router;