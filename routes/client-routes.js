var express = require('express');
var router = express.Router();
const Utente = require('../models/Utente');
const Cartella = require('../models/Cartella');

// JWT configuration
let jwt = require('jsonwebtoken');
let config = require('./config');
let middleware = require('./jwtmiddleware');

function JWTAuth(req,res) {
    let username = req.user.email;
    let password = req.user.password;
    
    let token = jwt.sign({username: username, password: password},
    config.secret,
    { expiresIn: '5m' // expires in 5 mins
    }
    );

    // return the JWT token for the future API calls
    res.render('ProgettoLTW/patient/gentoken.html', { user: req.user.nome, token: token });
}


// Function that checks if a user is logged and redirects him to the right page
// (if he tries to access pre-login pages)
function CheckLogged(req, res, next) {
	if (!req.isAuthenticated()){
    res.redirect('/');
  } else {
    return next(); 
  }
}

//function that check if a user is the an Admin
function CheckUserType(req,res){
    if(req.isAuthenticated()){
        if(req.user.email=="doc") return 2;
        else return 1;
    }
    else return 0;
}


module.exports = function(passport){

	//REST API WITH JWT SERVICE
    router.get('/gentoken', CheckLogged, function(req, res){
		res.render('ProgettoLTW/patient/gentoken.html', { user: req.user.nome, token: "not generated yet" });
    });
    
    router.post('/gentoken', CheckLogged, JWTAuth);
    
    router.get('/apicartellaclinica', middleware.checkToken, function(req, res){
        Cartella.findOne({ email : req.decoded.username }, function(err, cart) {
            Utente.findOne({ email : cart.email }, function(err, datis) {
                var dati= datis;
                res.json({
                    info: dati,
                    cartella: cart
                });
            });
        });
    });

	router.get('/cartellaclinica',function(req, res){
        var type = CheckUserType(req,res);
        if(type==2)	res.render('ProgettoLTW/index.html');
        if(type==1) res.render('ProgettoLTW/patient/cartellaclinica.html', { user: req.user });
        else res.render('ProgettoLTW/index.html');
    });
    
    router.get('/prenota',function(req, res){
        var type = CheckUserType(req,res);
        if(type==2)	res.render('ProgettoLTW/index.html');
        if(type==1) res.render('ProgettoLTW/patient/prenota.html', { user: req.user.nome });
        else res.render('ProgettoLTW/index.html');
    });

    
	

	return router;
}
