var LocalStrategy   = require('passport-local').Strategy;
const Item = require('../models/Item');
var bCrypt = require('bcrypt-nodejs');

var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function(passport){

	passport.use(new FacebookStrategy({
        clientID: 365142850727291,
        clientSecret: "dce65e9c936588dc6c5925d3a8388224",
        callbackURL: "http://localhost/auth/facebook/callback",
        profileFields: ['id', 'emails', 'name']
      },
      function(accessToken, refreshToken, profile, done) {
        var email= profile.emails[0].value;
        Item.findOne({ username: email }, function(err, user) {
            if (err){
                console.log('Error in Facebook login: '+err);
                return done(err);
            }
            if (user) {
                console.log('User already exists with username: '+email);
                return done(null, user);
            } else {
                // if there is no user with that email
                // create the user
                var newUser = new Item();
  
                // set the user's local credentials
                newUser.username = email;
  
                // save the user
                newUser.save(function(err) {
                    if (err){
                        console.log('Error in Saving user: '+err);  
                        throw err;  
                    }
                    console.log('User Registration succesful');    
                    return done(null, newUser);
                });
            }
  
        });
      }
    ));

}