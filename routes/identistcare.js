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

	//test page
	router.get('/test',function(req, res){
		res.render('Chat/chat.html', { user: req.user });
	});
	
	//test su pagina del doctor
	router.get('/homeTest',function(req, res){
        var type = CheckUserType(req,res);
        if(type==1)	res.render('ProgettoLTW/afterLogin/afterloginindex.html', { user: req.user });
        if(type==2) res.render('ProgettoLTW/afterLogin/afteradminloginindex.html', { user: req.user });
        else res.render('ProgettoLTW/index.html', { user: req.user });
    });

	router.get('/contatti.html',function(req, res){
		res.render('ProgettoLTW/contatti.html', { user: req.user });
	});

	router.get('/chisiamo.xml',function(req, res){
		Utente.find()
      .then(utenti => res.render('ProgettoLTW/chisiamo.xml', { utenti }))
      .catch(err => res.status(404).json({ msg: 'No users found' }));
	});

	router.get('/dovesiamo.html',function(req, res){
		res.render('ProgettoLTW/dovesiamo.html', { user: req.user });
	});

	router.get('/index.html',function(req, res){
		res.render('ProgettoLTW/index.html', { user: req.user });
	});

	return router;
}
