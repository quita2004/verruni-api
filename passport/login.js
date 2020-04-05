var LocalStrategy = require('passport-local').Strategy;
var models = require('../src/models');
var bCrypt = require('bcryptjs');

module.exports = function (passport) {

    passport.use('login', new LocalStrategy({
        passReqToCallback: true
    },
        async function (req, username, password, done) {

            const user = await models.User.get(username);
            
            // Username does not exist, log the error and redirect back
            if (!user || user.length === 0) {
                return done(null, false, req.flash('message', 'User Not found.'));
            }
            // User exists but wrong password, log the error 
            if (!isValidPassword(user, password)) {
                return done(null, false, req.flash('message', 'Invalid Password')); // redirect back to login page
            }
            // User and password both match, return user from done method
            // which will be treated like success
            return done(null, user);

        })
    );


    var isValidPassword = function (user, password) {
        return bCrypt.compareSync(password, user.password);
    }
}
