var Passport_initalize = function(passport) {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        _userModel.findOne({ id: jwt_payload.id }, function(err, user) {
            if (err) {
                return done(err, false);
            } else {
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            }

        });
    }));
};

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

module.exports = Passport_initalize;