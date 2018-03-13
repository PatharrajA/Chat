/**
 * Get Single Chat.
 * @constructor 
 * @param {string} title - Single Chat
 * @param {string} author - Patharraj
 * @param {string} Parameter - receiver_id sender_id
 * @description Get All Chat one to one chat
 * @returns Chat
 */
router.route('/chat/:receiver_id/:sender_id').get(function(req, res) {
    try {
        var infoMsg = {
            "url": req.originalUrl,
            "params": req.body || req.params,
            "data": req.body || req.query || req.params
        };
        winston.info(infoMsg);
        var chatId={
            receiver:req.params.receiver_id,
            sender:req.params.sender_id
        }
        chatController.getChat(chatId, function(err, chat) {
            if (!err) {
                res.json({
                    result: chat
                });
            } else {
                res.json({
                    result: err
                });
            }
        });
    } catch (error) {
        res.json({
            result: error,
            code: 204,
            message: config.messages.common.invalid_parameter
        });
    }
});

/**
 * Single Chat.
 * @constructor
 * @param {string} title - Create Chat
 * @param {string} author - Patharraj
 * @description Create Chat one to one chat
 * @returns
 */
router.route('/chat').post(function(req,res){
    try{
        var infoMsg = {
            "url": req.originalUrl,
            "params": req.body || req.params,
            "data": req.body || req.query || req.params
        };
        winston.info(infoMsg);
        var chatId={
            receiver_id:req.params.receiver_id,
            sender_id:req.params.sender_id
        }
        chatController.createChat(req.body,function(err,chat){
            if (!err) {
                res.json({
                    result: chat
                });
            } else {
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

/**
 * Single Chat.
 * @constructor
 * @param {string} title - Delete Chat.
 * @param {string} author - Patharraj.
 * @param {string} Parameter - chat_id
 * @description Delete Chat one to one chat
 * @returns
 */
router.route('/chat/:chat_id').delete(function(req,res){
    try {
        var infoMsg = {
            "url": req.originalUrl,
            "params": req.body || req.params,
            "data": req.body || req.query || req.params
        };
        winston.info(infoMsg);
        var chat_id = req.body.chat_id || req.params.chat_id || req.query.chat_id;
        chatController.deleteChat(chat_id, function(err, data) {
            if (!err) {
                res.json({
                    result: data
                });
            } else {
                res.json({
                    result: err
                });
            }
        });
    } catch (error) {
        res.json({
            result: error,
            code: 204,
            message: config.messages.common.invalid_parameter
        });
    }
})

/**
 * Single Chat.
 * @constructor
 * @param {string} title - Update Chat.
 * @param {string} author - Patharraj.
 * @param {string} Parameter - chat_id
 * @description Reply Chat one to one chat
 * @returns
 */
.put(function(req,res){
    try{
        var infoMsg = {
            "url": req.originalUrl,
            "params": req.body || req.params,
            "data": req.body || req.query || req.params
        };
        winston.info(infoMsg);
        var chat_id = req.body.chat_id || req.params.chat_id || req.query.chat_id;
        chatController.updateChat(chat_id,req.body,function(err,chat){
            if (!err) {
                res.json({
                    result: data
                });
            } else {
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