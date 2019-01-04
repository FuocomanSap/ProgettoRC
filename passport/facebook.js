var LocalStrategy   = require('passport-local').Strategy;
const Utente = require('../models/Utente');
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
                
                // Default values for facebook users
                newUser.telefono = 123456789;
                newUser.indirizzo = "Via delle vie 86";
                newUser.codicefiscale = "ABC123KFG67BM501I";
  
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