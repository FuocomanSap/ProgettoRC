var LocalStrategy   = require('passport-local').Strategy;
const Utente = require('../models/Utente');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

	passport.use('signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
            
        },
        
        function(req, username, password, done) {
            //function(req,name,surname,email,password,phoneNumber,address,CF,birthday,birthcountry,category,User,copy,done){
            findOrCreateUser = function(){
                // find a user in Mongo with provided username
                Utente.findOne({ email : username }, function(err, user) {
                    // In case of any error, return using the done method
                    if (err){
                        console.log('Error in SignUp: '+err);
                        return done(err);   
                    }
                    // already exists
                    if (user) {
                        console.log('User already exists with username: '+username);
                        return done(null, false, req.flash('message','User Already Exists'));
                    } else {
                        // if there is no user with that email
                        // create the user
                        var newUser = new Utente();

                        // set the user's local credentials
                        newUser.email = username;
                        newUser.password = createHash(password);
                        newUser.name=req.body.name;
                        newUser.cognome=req.body.surname;
                        newUser.telefono=req.body.phoneNumber;
                        newUser.indirizzo=req.body.address;
                        newUser.codicefiscale=req.body.CF;
                        newUser.dataNascita=req.body.birthday;
                        newUser.luogoNascita=req.body.birthcountry;
                        newUser.esenzioni=req.body.category;
                        newUser.tipoUtente=req.body.User;
                        newUser.admin=false;
                        //newUser.nome = nome;

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
            };
            // Delay the execution of findOrCreateUser and execute the method
            // in the next tick of the event loop
            process.nextTick(findOrCreateUser);
        })
    );

    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }

}