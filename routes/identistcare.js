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
        if(req.user.admin=="true") return 2;
        else return 1;
    }
    else return 0;
}



module.exports = function(passport){

	
	
	//test su pagina del doctor
	router.get('/',function(req, res){
        var type = CheckUserType(req,res);
        if(type==1)	res.render('ProgettoLTW/afterLogin/afterloginindex.html', { user: req.user });
        if(type==2) res.render('ProgettoLTW/afterLogin/afteradminloginindex.html', { user: req.user });
        else res.render('ProgettoLTW/index.html', { user: req.user });
    });

	router.get('/contatti',function(req, res){
        var type = CheckUserType(req,res);
        if(type==1)	res.render('ProgettoLTW/afterLogin/contatti.html', { user: req.user });
        if(type==2) res.render('ProgettoLTW/afterLogin/afterloginAdmin/contatti.html', { user: req.user });
        else res.render('ProgettoLTW/contatti.html', { user: req.user });
	});

	router.get('/chisiamo',function(req, res){
        var type = CheckUserType(req,res);
        if(type==1)	res.render('ProgettoLTW/chisiamo.xml', { user: req.user });
        if(type==2) res.render('ProgettoLTW/chisiamo.xml', { user: req.user });
        else res.render('ProgettoLTW/chisiamo.xml', { user: req.user });
	});

	router.get('/dovesiamo',function(req, res){
		var type = CheckUserType(req,res);
        if(type==1)	res.render('ProgettoLTW/afterLogin/dovesiamo.html', { user: req.user });
        if(type==2) res.render('ProgettoLTW/afterLogin/afterloginAdmin/dovesiamo.html', { user: req.user });
        else res.render('ProgettoLTW/dovesiamo.html', { user: req.user });
	});


    router.get('/login',function(req, res){
        res.render('ProgettoLTW/login.html', { user: req.user });
    });


    router.get('/register',function(req, res){
        res.render('ProgettoLTW/register.html', { user: req.user });
    });


    router.post('/register', passport.authenticate('signup', {        
        successRedirect: '/login',
        failureRedirect: '/register',
        failureFlash : true,
        session: false   // After a user signs up, he won't access his account
      }));

      router.post('/login', passport.authenticate('login', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash : true  
      }));

	return router;
}
