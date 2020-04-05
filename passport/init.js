var login = require('./login');
var signup = require('./signup');
var models = require('../src/models');

module.exports = function (passport) {

    // Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function (user, done) {
        done(null, user.username);
    });

    passport.deserializeUser(async function (username, done) {
        const user = await models.User.get(username);

        done(null, user);
    });

    // Setting up Passport Strategies for Login and SignUp/Registration
    login(passport);
    signup(passport);
}
