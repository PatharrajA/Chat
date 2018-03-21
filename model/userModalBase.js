var user_modal = mongoose.Schema({
    email: {
        required: true,
        type: String,
        unique: true
    },
    username: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        required: true,
        type: String
    },
    created_at: {
        type: Date,
        value: Date.now()
    },
    profile_img: {
        type: String,
        default:""
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    gender:{
        type:String
    },
    dob:{
        type:Date
    },
    updated_at: {
        type: Date,
        value: Date.now()
    },
    friends:[],
    groups:[],
    fcm_token:{
        type:String
    }
});

user_modal.pre('save', function(next) {
    var user = this;
    if (user.isModified('password') || user.isNew) {
        bcrypt.genSalt(10, function(err, salt) {
            if (err) {
                return next(err);
            } else {
                bcrypt.hash(user.password, salt, null, function(err, hash) {
                    if (err) {
                        return next(err);
                    } else {
                        user.password = hash;
                        next();
                    }
                });
            }
        });
    } else {
        return next();
    }
});

user_modal.methods.comparePassword = function(password, callback) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err) {
            return callback(err, null);
        } else {
            callback(null, isMatch);
        }
    });
};

module.exports = mongoose.model('User', user_modal);