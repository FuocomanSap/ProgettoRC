var FacebookStrategy = require('passport-facebook').Strategy;
const Item = require('../models/Item');

module.exports = function(passport){

    passport.use(new FacebookStrategy({
        clientID: 365142850727291,
        clientSecret: dce65e9c936588dc6c5925d3a8388224,
        callbackURL: "http://localhost/auth/facebook/callback"
      },
      function(accessToken, refreshToken, profile, done) {
        Item.findOrCreate({ username: profile.displayName }, function(err, user) {
          if (err) { return done(err); }
          done(null, user);
        });
      }
    ));


}