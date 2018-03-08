router.route('/login').post(function(req, res) {
    try {
        var infoMsg = {
            "url": req.originalUrl,
            "params": req.body || req.params,
            "data": req.body || req.query || req.params
        };
        winston.info(infoMsg);
        userController.login(req.body, function(err, user) {
            if (!err) {
                res.json({
                    result: user
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


router.route('/signup').post(function(req, res) {
    try {
        var token = getToken(req.headers);
        console.log(token);
        var infoMsg = {
            "url": req.originalUrl,
            "params": req.body || req.params,
            "data": req.body || req.query || req.params
        };
        winston.info(infoMsg);
        userController.register(req.body, function(err, user) {
            if (!err) {
                res.json({
                    result: user
                });
            } else {
                res.json({
                    result: err
                });
            }
        });
    } catch (err) {
        res.json({
            result: err,
            code: 204,
            message: config.messages.common.invalid_parameter
        });
    }
});


router.get('/getAllUser', passport.authenticate('jwt', { session: true }), function(req, res) {
    var token = getToken(req.headers);
    if (token) {
        try {
            res.header("Access-Control-Allow-Origin", "*");
            var infoMsg = {
                "url": req.originalUrl,
                "params": req.query || req.params,
                "data": req.query || req.params
            };
            winston.info(infoMsg);
            userController.getAllUser(function(err, user) {
                if (!err) {
                    res.json({
                        result: user
                    });
                } else {
                    res.json({
                        result: err
                    });
                }
            });

        } catch (err) {
            res.json({
                result: err,
                code: 204,
                message: config.messages.common.invalid_parameter
            });
        }
    } else {
        res.json({
            result: err,
            code: 401,
            message: config.messages.common.unauthorize
        });
    }
});

router.route('/getUser/:user_id').get(passport.authenticate('jwt', { session: true }), function(req, res) {
    try {
        var infoMsg = {
            "url": req.originalUrl,
            "params": req.query || req.params,
            "data": req.body.user_id || req.params.user_id
        };
        winston.info(infoMsg);
        var user_id = req.body.user_id || req.params.user_id || req.query.user_id;
        userController.getUserById(user_id, function(err, user) {
            if (!err) {
                res.json({
                    result: user
                });
            } else {
                res.json({
                    result: err
                });
            }
        });
    } catch (err) {
        res.json({
            result: err
        });
    }
});


router.route('/profile/:user_id').put(passport.authenticate('jwt', { session: true }), function(req, res) {
    try {
        var infoMsg = {
            "url": req.originalUrl,
            "params": req.query || req.params,
            "data": req.body.user_id || req.params.user_id
        };
        winston.info(infoMsg);
        var user_id = req.body.user_id || req.params.user_id || req.query.user_id;
        var userDetail = req.body;
        userController.updateProfile(user_id, userDetail, function(err, user) {
            if (!err) {
                res.json({
                    result: user
                });
            } else {
                res.json({
                    result: err
                });
            }
        });
    } catch (err) {
        res.json({
            result: err
        });
    }
});

router.route('/logout').get(function(req, res) {
    try {
        var infoMsg = {
            "url": req.originalUrl,
            "params": req.query || req.params,
            "data": req.body || req.params
        };
        winston.info(infoMsg);
        req.logout();
        res.end();
    } catch (err) {
        res.json({
            result: err
        });
    }

});


module.exports = router;