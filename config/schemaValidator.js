  // Joi Validator
  var validator = function() {
      // User Schema Validator
      // Login Schema
      var _login_validate = Joi.object().keys({
          username: Joi.string().required(),
          password: Joi.string().min(6).required()
      });

      // Register Schema
      var _register_validate = Joi.object().keys({
          username: Joi.string().required(),
          email: Joi.string().required(),
          password: Joi.string().min(6).required()
      });

    //   Chat Schema
    var _chat_validate=Joi.object().keys({
        receiver_id:Joi.string().required(),
        sender_id:Joi.string().required(),
        chat_type:Joi.string().required(),
        message:Joi.string().required()
    });

      return {
          login_validate: _login_validate,
          register_validate: _register_validate
      };
  }();
  module.exports = validator;