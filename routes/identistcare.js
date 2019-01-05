var express = require('express');
var router = express.Router();
const Utente = require('../models/Utente');

// JWT configuration
let jwt = require('jsonwebtoken');
let config = require('./config');
let middleware = require('./jwtmiddleware');

function JWTAuth(req,res) {
    let username = req.user.email;
    
    let token = jwt.sign({username: username},
    config.secret,
    { expiresIn: '24h' // expires in 24 hours
    }
    );

    // return the JWT token for the future API calls
    res.render('ProgettoLTW/afterLogin/test.html', { user: req.user.nome, token: token });
}



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
    res.redirect('/');
  } else {
    return next(); 
  }
}

//function that checks if a user is an Admin
function CheckUserType(req,res){
    if(req.isAuthenticated()){
        if(req.user.admin=="true") return 2;
        else return 1;
    }
    else return 0;
}

// Function that checks if user can log chatbot
function CheckLoggedChat(req, res, next) {
	if (!req.isAuthenticated()){
    res.redirect('/');
  } else {
    return next(); 
  }
}




module.exports = function(passport){

	router.get('/',function(req, res){
        var type = CheckUserType(req,res);
        if(type==1)	res.render('ProgettoLTW/afterLogin/afterloginindex.html', { user: req.user.nome });
        else if(type==2) res.render('ProgettoLTW/afterLogin/afteradminloginindex.html', { user: req.user.nome });
        else res.render('ProgettoLTW/index.html');
    });

	router.get('/contatti',function(req, res){
        var type = CheckUserType(req,res);
        if(type==1)	res.render('ProgettoLTW/afterLogin/contatti.html', { user: req.user.nome });
        else if(type==2) res.render('ProgettoLTW/afterLogin/afterloginAdmin/contatti.html', { user: req.user.nome });
        else res.render('ProgettoLTW/contatti.html');
	});

	router.get('/chisiamo',function(req, res){
        var type = CheckUserType(req,res);
        if(type==1)	res.render('ProgettoLTW/chisiamo.xml', { user: req.user.nome });
        else if(type==2) res.render('ProgettoLTW/chisiamo.xml', { user: req.user.nome });
        else res.render('ProgettoLTW/chisiamo.xml');
	});

	router.get('/dovesiamo',function(req, res){
		var type = CheckUserType(req,res);
        if(type==1)	res.render('ProgettoLTW/afterLogin/dovesiamo.html', { user: req.user.nome });
        else if(type==2) res.render('ProgettoLTW/afterLogin/afterloginAdmin/dovesiamo.html', { user: req.user.nome });
        else res.render('ProgettoLTW/dovesiamo.html');
	});


    router.get('/login', CheckLogged,function(req, res){
        res.render('ProgettoLTW/login.html');
    });


    router.get('/register', CheckLogged,function(req, res){
        res.render('ProgettoLTW/register.html');
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


    router.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

    router.get('/medchat', CheckLoggedChat, function(req, res){
		res.render('Chat/chat.html');
	});

    //REST API WITH JWT SERVICE
    router.get('/apilogin', CheckLoggedChat, function(req, res){
		res.render('ProgettoLTW/afterLogin/test.html', { user: req.user.nome, token: "not generated yet" });
    });
    
    router.post('/apilogin', CheckLoggedChat, JWTAuth);
    router.post('/api', middleware.checkToken, function(req, res){
        res.render('ProgettoLTW/patient/cartellaclinica.html');
    });

	return router;
}
