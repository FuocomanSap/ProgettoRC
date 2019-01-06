var express = require('express');
var router = express.Router();
const Utente = require('../models/Utente');
var bCrypt = require('bcrypt-nodejs');


// Function that checks if a user is authenticated
function CheckAuth(req, res, next) {
    if (req.isAuthenticated()) {
        console.log("L'utente è loggato");
        return next();
    } else {
        console.log("L'utente non è loggato");
        res.redirect('/');
    }
}

// Function that checks if a user is logged and redirects him to the right page
// (if he tries to access pre-login pages)
function CheckLogged(req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect('/');
    } else {
        return next();
    }
}

//function that checks if a user is an Admin
function CheckUserType(req, res) {
    if (req.isAuthenticated()) {
        if (req.user.admin == true) return 2;
        else return 1;
    }
    else return 0;
}

// Function that checks if user can log chatbot
function CheckLoggedChat(req, res, next) {
    if (!req.isAuthenticated()) {
        res.redirect('/');
    } else {
        return next();
    }
}


module.exports = function (passport) {

    router.get('/', function (req, res) {
        var type = CheckUserType(req, res);
        if (type == 1) res.render('ProgettoLTW/afterLogin/afterloginindex.html', { user: req.user.nome });
        else if (type == 2) res.render('ProgettoLTW/afterLogin/afteradminloginindex.html', { user: req.user.nome });
        else res.render('ProgettoLTW/index.html');
    });

    router.get('/contatti', function (req, res) {
        var type = CheckUserType(req, res);
        if (type == 1) res.render('ProgettoLTW/afterLogin/contatti.html', { user: req.user.nome });
        else if (type == 2) res.render('ProgettoLTW/afterLogin/afterloginAdmin/contatti.html', { user: req.user.nome });
        else res.render('ProgettoLTW/contatti.html');
    });

    router.get('/chisiamo', function (req, res) {
        var type = CheckUserType(req, res);
        if (type == 1) res.render('ProgettoLTW/chisiamo.xml', { user: req.user.nome });
        else if (type == 2) res.render('ProgettoLTW/chisiamo.xml', { user: req.user.nome });
        else res.render('ProgettoLTW/chisiamo.xml');
    });

    router.get('/dovesiamo', function (req, res) {
        var type = CheckUserType(req, res);
        if (type == 1) res.render('ProgettoLTW/afterLogin/dovesiamo.html', { user: req.user.nome });
        else if (type == 2) res.render('ProgettoLTW/afterLogin/afterloginAdmin/dovesiamo.html', { user: req.user.nome });
        else res.render('ProgettoLTW/dovesiamo.html');
    });


    router.get('/login', CheckLogged, function (req, res) {
        res.render('ProgettoLTW/login.html');
    });


    router.get('/register', CheckLogged, function (req, res) {
        res.render('ProgettoLTW/register.html');
    });


    router.post('/register', passport.authenticate('signup', {
        successRedirect: '/login',
        failureRedirect: '/register',
        failureFlash: true,
        session: false   // After a user signs up, he won't access his account
    }));

    router.post('/login', passport.authenticate('login', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));


    router.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    router.get('/medchat', CheckLoggedChat, function (req, res) {
        res.render('Chat/chat.html');
    });

    //funzione che genera dottori casualmente
    router.get('/install/(:arg)', function (req, res) {

            var i =req.params.arg;
            var mail = i + "@identistcare.it";
            Utente.findOne({ email: mail }, function (err, user) {
                // In case of any error, return using the done method
                if (err) {
                    console.log('Error in SignUp: ' + err);
                    return done(err);
                }
                // already exists
                if (user) {
                    console.log('User already exists with username: ' + username);
                    return done(null, false, req.flash('message', 'User Already Exists'));
                } else {
                    var newUser = new Utente();
                    newUser.email = mail;
                    newUser.password = createHash(i);
                    newUser.nome = i;
                    newUser.cognome = i;
                    newUser.telefono = "3488025988";
                    newUser.indirizzo = "la via dello studio".toUpperCase();
                    newUser.codicefiscale = ("CodiceFiscale di:" + i).toUpperCase();
                    newUser.dataNascita = Date.now();
                    newUser.luogoNascita = "dove sono nato".toUpperCase();
                    newUser.esenzioni = "ovviamente non ho diritto ad esenzioni";
                    if (i % 2) newUser.sesso = "FEMALE";
                    else newUser.sesso = "MALE";
                    newUser.admin = true;
                    newUser.save(function (err) {
                        if (err) {
                            console.log('Error in Saving user: ' + err);
                            throw err;
                        }
                        console.log('User Registration succesful');
                    });
                }
            });
        
        res.redirect('/');
    });
    // Generates hash using bCrypt
    var createHash = function (password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }




    return router;
}


