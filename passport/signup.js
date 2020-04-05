const LocalStrategy = require('passport-local').Strategy;
const models = require('../src/models');
const bCrypt = require('bcryptjs');

module.exports = function (passport) {

    passport.use('signup', new LocalStrategy({
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
        function (req, username, password, done) {

            findOrCreateUser = async function () {
                // find a user in Mongo with provided username

                const user = await models.User.get(username);

                if (user) {
                    return done(null, false, req.flash('message', 'User Already Exists'));
                } else {
                    // if there is no user with that email
                    // create the user
                    const newUser = new User();

                    // set the user's local credentials
                    newUser.username = username;
                    newUser.password = createHash(password);

                    // save the user
                    models.User.create(newUser);
                }
            };
            // Delay the execution of findOrCreateUser and execute the method
            // in the next tick of the event loop
            process.nextTick(findOrCreateUser);
        })
    );

    // Generates hash using bCrypt
    const createHash = function (password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10));
    }

}
