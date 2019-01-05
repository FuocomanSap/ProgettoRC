var LocalStrategy   = require('passport-local').Strategy;
const Utente = require('../models/Utente');
var bCrypt = require('bcrypt-nodejs');

var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function(passport){

	passport.use(new FacebookStrategy({
        clientID: 365142850727291,
        clientSecret: "dce65e9c936588dc6c5925d3a8388224",
        callbackURL: "http://localhost/auth/facebook/callback",
        profileFields: ['id', 'emails', 'name','birthday','hometown']
      },
      function(accessToken, refreshToken, profile, done) {
        //console.log(profile);
        //console.log(profile._json.hometown.name[0]);

        var email= profile.emails[0].value;
        Utente.findOne({ email : email }, function(err, user) {
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
                var newUser = new Utente();
  
                // Setting the user's credentials
                newUser.email = email;
                newUser.nome = profile.name.givenName;
                newUser.cognome = profile.name.familyName;
                
                // Default values for facebook users (just a test)
                newUser.indirizzo= 'da settare tramite facebbok';
                newUser.luogoNascita = profile._json.hometown.name.split(",")[0].toUpperCase();
                newUser.dataNascita  = profile._json.birthday;
  
                // Saving the user
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