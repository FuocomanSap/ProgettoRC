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

module.exports = function(passport){

  // GET Login page
  router.get('/', CheckLogged, (req, res) => {
    Utente.find()
      .then(utenti => res.render('index', { utenti }))
      .catch(err => res.status(404).json({ msg: 'No users found' }));
  });


	// Handle Login POST
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/',
		failureFlash : true  
	}));

	// GET Registration Page
	router.get('/signup', function(req, res){
		res.render('register',{message: req.flash('message')});
	});

	// Handle Registration POST 
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/',
		failureRedirect: '/signup',
		failureFlash : true,
		session: false 	// After a user signs up, he won't access his account
	}));

	// GET Home Page 
	router.get('/home', CheckAuth, function(req, res){
		res.render('home', { user: req.user });
	});

	// Handle Logout
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	//////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////
	
	
	//test page
	router.get('/test',function(req, res){
		res.render('Chat/chat.html', { user: req.user });
	});
	
	

	return router;
}
