var express = require('express');
var router = express.Router();
//const Item = require('../models/Item');
const Utente = require('../models/Utente');

// Function that checks if a user is authenticated
function CheckAuth(req, res, next) {
	if (req.isAuthenticated()){
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
	if (req.isAuthenticated()){
    res.redirect('/home');
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

	/*
	router.get('/cartellaclinica',function(req, res){
        var type = CheckUserType(req,res);
        if(type==2)	res.render('ProgettoLTW/index.html');
        if(type==1) res.render('ProgettoLTW/patient/apicartellaclinica.html', { user: req.user.nome });
        else res.render('ProgettoLTW/index.html');
    });
    */
    router.get('/prenota',function(req, res){
        var type = CheckUserType(req,res);
        if(type==2)	res.render('ProgettoLTW/index.html');
        if(type==1) res.render('ProgettoLTW/patient/prenota.html', { user: req.user.nome });
        else res.render('ProgettoLTW/index.html');
    });

    
	

	return router;
}
