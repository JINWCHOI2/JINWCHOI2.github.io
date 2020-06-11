var local_login = require('./passport/local_login');
var local_signup = require('./passport/local_signup');

module.exports = function (app, passport) {
    console.log('called config/passport');
    // When the authorization is successful
    passport.serializeUser(function(user, done){
        console.log ('serializeUser() is called');
        console.dir(user);
    });
    //
    passport.deserializeUser(function(user, done) {
        console.log ('deserializeUser() is called');
        console.dir(user);
        done(null, user);
    });

    passport.use('local-login', local_login);
    passport.use('local-signup', local_signup);
};

