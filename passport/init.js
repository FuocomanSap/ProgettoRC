var login = require('./login');
var signup = require('./signup');
var facebook = require('./facebook');
const Utente = require('../models/Utente');

module.exports = function(passport){

	// Passport needs this to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
        console.log('serializing user: ');console.log(user);
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        Utente.findById(id, function(err, user) {
            console.log('deserializing user:',user);
            done(err, user);
        });
    });

    // Setting up Passport Strategies for Login and SignUp/Registration
    login(passport);
    signup(passport);
    facebook(passport);

}