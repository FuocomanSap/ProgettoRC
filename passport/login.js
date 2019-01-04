var LocalStrategy   = require('passport-local').Strategy;
const Item = require('../models/Item');
var bCrypt = require('bcrypt-nodejs');


var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function(passport){

    passport.use(new FacebookStrategy({
        clientID: 365142850727291,
        clientSecret: "dce65e9c936588dc6c5925d3a8388224",
        callbackURL: "http://localhost/auth/facebook/callback"
      },
      function(accessToken, refreshToken, profile, done) {
        Item.findOne({ username: profile.id }, function(err, user) {
            if (err){
                console.log('Error in Facebook login: '+err);
                return done(err);
            }
            if (user) {
                console.log('User already exists with username: '+profile.id);
                return done(null, user);
            } else {
                // if there is no user with that email
                // create the user
                var newUser = new Item();

                // set the user's local credentials
                newUser.username = profile.id;

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


	passport.use('login', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) { 
            // check in mongo if a user with username exists or not
            Item.findOne({ username :  username }, 
                function(err, user) {
                    // In case of any error, return using the done method
                    if (err)
                        return done(err);
                    // Username does not exist, log the error and redirect back
                    if (!user){
                        console.log('User Not Found with username '+username);
                        return done(null, false, req.flash('message', 'User Not found.'));                 
                    }
                    // User exists but wrong password, log the error 
                    if (!isValidPassword(user, password)){
                        console.log('Invalid Password');
                        return done(null, false, req.flash('message', 'Invalid Password')); // redirect back to login page
                    }
                    // User and password both match, return user from done method
                    // which will be treated like success
                    console.log("L'utente "+username+" si è loggato!");
                    return done(null, user);
                }
            );

        })
    );


    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    }
    
}