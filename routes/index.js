var express = require('express');
var router = express.Router();
const Item = require('../models/Item');

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
    Item.find()
      .then(items => res.render('index', { items }))
      .catch(err => res.status(404).json({ msg: 'No items found' }));
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


	//test su pagina del doctor
	router.get('/homeD',function(req, res){
		res.render('ProgettoLTW/index.html', { user: req.user });
	});

	router.get('/contatti.html',function(req, res){
		res.render('ProgettoLTW/contatti.html', { user: req.user });
	});

	router.get('/chisiamo.xml',function(req, res){
		Item.find()
      
      .catch(err => res.status(404).json({ msg: 'No items found' }));
	});

	router.get('/dovesiamo.html',function(req, res){
		res.render('ProgettoLTW/dovesiamo.html', { user: req.user });
	});

	router.get('/index.html',function(req, res){
		res.render('ProgettoLTW/index.html', { user: req.user });
	});




	return router;
}
