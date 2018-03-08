var user = function() {

    var error_obtained = "",
        result_obtained = "";
    /**
     * @api {post} /user/login Login User
     * @apiVersion 1.0.0
     * @apiName Login
     * @apiGroup User
     *
     * @apiParam {String} username  Username of the login user
     * @apiParam {String} password  Password of the login user
     *
     * @apiSuccess {String} user and token of the User.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "success": true,
     *        "token": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwic2VsZWN0ZWQiOnt9LCJnZXR0ZXJzIjp7fSwid2FzUG9wdWxhdGVkIjpmYWxzZSwiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsicGFzc3dvcmQiOiJpbml0IiwidXNlcm5hbWUiOiJpbml0IiwiX192IjoiaW5pdCIsIl9pZCI6ImluaXQifSwic3RhdGVzIjp7Imlnbm9yZSI6e30sImRlZmF1bHQiOnt9LCJpbml0Ijp7Il9fdiI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsInVzZXJuYW1lIjp0cnVlLCJfaWQiOnRydWV9LCJtb2RpZnkiOnt9LCJyZXF1aXJlIjp7fX0sInN0YXRlTmFtZXMiOlsicmVxdWlyZSIsIm1vZGlmeSIsImluaXQiLCJkZWZhdWx0IiwiaWdub3JlIl19LCJlbWl0dGVyIjp7ImRvbWFpbiI6bnVsbCwiX2V2ZW50cyI6e30sIl9ldmVudHNDb3VudCI6MCwiX21heExpc3RlbmVycyI6MH19LCJpc05ldyI6ZmFsc2UsIl9kb2MiOnsiX192IjowLCJwYXNzd29yZCI6IiQyYSQxMCR3Qlo4N2lpMGNCQWNhSUIuZXlzZzdPU1RBb3B6U0dnV3JlTC93VGdFRnoyQzB2SGRyYWQxYSIsInVzZXJuYW1lIjoidGVzdCIsIl9pZCI6IjU5Y2IzNzQxZDVmYzNiMDMzMGVkNTkyYyJ9LCJpYXQiOjE1MDY0OTAyMTF9.d3FUbykmHmOGaW0JACHpNbCye-i1oZcYz0Zsy1P9M34",
     *        "user": {
     *           "_id": "59cb3741d5fc3b0330ed592c",
     *           "username": "test",   
     *        }
     *     }
     *
     * @apiError UserNotFound The id of the User was not found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "UserNotFound"
     *     }
     */
    var _login = function(jsondata, callback) {
        Joi.validate(jsondata, schemaValitator.login_validate, function(err, value) {
            if (!err) {
                _userModel.findOne({ "username": jsondata.username }, function(err, user) {
                    if (!err) {
                        if (user) {
                            user.comparePassword(jsondata.password, function(err, isMatch) {
                                if (isMatch && !err) {
                                    var token = jwt.sign({
                                        data: user
                                    }, config.secret, {
                                        expiresIn: 60 * 60
                                    });
                                    user = user.toObject();
                                    delete user.password;
                                    result_obtained = {
                                        user: user,
                                        token: 'JWT ' + token,
                                        message: config.messages.user.success_user,
                                        code: 200,
                                        success: true
                                    };
                                    callback(null, result_obtained);
                                } else {
                                    error_obtained = {
                                        message: config.messages.user.error_userPassword,
                                        code: 200,
                                        success: false,
                                        data: null
                                    };
                                    callback(error_obtained, null);
                                }
                            });
                        } else {
                            error_obtained = {
                                message: config.messages.user.error_user,
                                code: 200,
                                success: false,
                                data: null
                            };
                            callback(error_obtained, null);
                        }
                    } else {
                        error_obtained = {
                            message: err,
                            code: 400,
                            success: false,
                            data: null
                        };
                        callback(error_obtained, null);
                    }
                });
            } else {
                error_obtained = {
                    message: err,
                    code: 400,
                    success: false,
                    data: null
                };
                callback(error_obtained, null);
            }
        });

    };

    /**
     * @api {post} /user/register Create New User
     * @apiVersion 1.0.0
     * @apiName Register
     * @apiGroup User
     *
     * @apiParam {String} username  Username of the user
     * @apiParam {String} email     Email of the user
     * @apiParam {String} password  Password of the user
     *
     * @apiSuccess {String} user details of the User.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "result": {
     *             "data": {
     *                   "__v": 0,
     *                   "username": "test",
     *                   "email": "test@gmail.com",
     *                   "password": "$2a$10$D795V9ZiVmDISHX9ksiGSeZt/KFqAHz5yaGdGXia1HZ8NJnpiR46q",
     *                   "_id": "59cb476a2c852027c820400f"
     *                },
     *             "message": "User Register Successfully",
     *             "code": 200,
     *             "success": true
     *          }
     *        }
     *
     * @apiError UserNotFound The id of the User was not found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "UserNotFound"
     *     }
     */
    var _register = function(jsondata, callback) {
        Joi.validate(jsondata, schemaValitator.register_validate, function(err, value) {
            if (!err) {
                var newUser = new _userModel({
                    username: jsondata.username,
                    email: jsondata.email,
                    password: jsondata.password,
                    created_at: Date.now()
                });
                newUser.save(function(err, user) {
                    if (!err) {
                        user = user.toObject();
                        delete user.password;
                        result_obtained = {
                            data: userInfo,
                            message: config.messages.user.register_success,
                            code: 200,
                            success: true
                        };
                        callback(null, result_obtained);
                    } else {
                        error_obtained = {
                            message: config.messages.user.register_erroruser,
                            code: 400,
                            success: false,
                            data: null
                        };
                        callback(error_obtained, null);
                    }
                });
            } else {
                error_obtained = {
                    message: err,
                    code: 400,
                    success: false,
                    data: null
                };
                callback(error_obtained, null);
            }
        });
    };

    /**
     * @api {get} /user/getAllUser
     * @apiVersion 1.0.0
     * @apiName Get All Active User
     * @apiGroup User
     *
     * @apiSuccess {String} user details of the User.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *    {
     *       "result": {
     *           "data": [
     *                {
     *                " _id": "59cb98929002652160282eaa",
     *                "username": "test",
     *                "email": "test@gmail.com",
     *                  "__v": 0
     *                }
     *               ],
     *            "message": "Get Users Successfully",
     *            "code": 200,
     *           "success": true
     *         }
     *    }
     *
     * @apiError UserNotFound The id of the User was not found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "UserNotFound"
     *     }
     */

    var _getAllUsers = function(callback) {
        _userModel.find({}, function(err, users) {
            if (!err) {
                if (users.length > 0) {
                    user = user.toObject();
                    delete user.password;
                    result_obtained = {
                        data: users,
                        message: config.messages.user.success_getUser,
                        code: 200,
                        success: true
                    };
                    callback(null, result_obtained);
                } else {
                    result_obtained = {
                        data: [],
                        message: config.messages.user.error_getUser,
                        code: 200,
                        success: true
                    };
                    callback(null, result_obtained);
                }
            } else {
                error_obtained = {
                    message: err,
                    code: 400,
                    success: false,
                    data: null
                };
                callback(error_obtained, null);
            }
        });
    };

    /**
     * @api {get} /user/getAllUserById
     * @apiVersion 1.0.0
     * @apiName Get Particular User
     * @apiGroup User
     *
     * @apiSuccess {String} _id Unique _id of the User.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *    {
     *       "result": {
     *           "data": [
     *                {
     *                " _id": "59cb98929002652160282eaa",
     *                "username": "test",
     *                "email": "test@gmail.com",
     *                  "__v": 0
     *                }
     *               ],
     *            "message": "Get Users Successfully",
     *            "code": 200,
     *           "success": true
     *         }
     *    }
     *
     * @apiError UserNotFound The id of the User was not found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "UserNotFound"
     *     }
     */
    var _getUserById = function(user_id, callback) {
        if (user_id != "" || user_id != undefined) {
            _userModel.findById({ "_id": user_id }, function(err, userData) {
                if (!err) {
                    var user = userData.toObject();
                    delete user.password;
                    result_obtained = {
                        data: user,
                        message: config.messages.user.success_getUser,
                        code: 200,
                        success: true
                    };
                    callback(null, result_obtained);
                } else {
                    error_obtained = {
                        message: config.messages.user.error_noUser,
                        code: 400,
                        success: false,
                        data: null
                    };
                    callback(error_obtained, null);
                }
            });
        } else {
            error_obtained = {
                message: config.messages.user.error_user_id,
                code: 400,
                success: false,
                data: null
            };
            callback(error_obtained, null);
        }

    };


    var _updateProfile = function(user_id, jsondata, callback) {
        if (user_id != "" || user_id != undefined) {
            var updateProfile = {
                profile_img: jsondata.profile,
                first_name: (jsondata.first_name) ? jsondata.first_name : "",
                last_name: (jsondata.last_name) ? jsondata.last_name : "",
                updated_at: Date.now()
            };
            _userModel.update({ "_id": user_id }, { $set: updateProfile }, function(err, user) {
                if (!err) {
                    result_obtained = {
                        data: user,
                        message: config.messages.user.success_update_profile,
                        code: 200,
                        success: true
                    };
                    callback(null, result_obtained);
                } else {
                    error_obtained = {
                        message: config.messages.user.error_update_profile,
                        code: 400,
                        success: false,
                        data: null
                    };
                    callback(error_obtained, null);
                }
            });

        } else {
            error_obtained = {
                message: config.messages.user.error_user_id,
                code: 401,
                success: false,
                data: null
            };
            callback(error_obtained, null);
        }

    };


    return {
        login: _login,
        register: _register,
        getAllUser: _getAllUsers,
        getUserById: _getUserById,
        updateProfile: _updateProfile
    };


}();
module.exports = user;