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

	
	
	//test su pagina del doctor
	router.get('/imieipazienti',function(req, res){
        var type = CheckUserType(req,res);
        if(type==1)	res.render('https://media.giphy.com/media/muKS0FZTV8Ih2/giphy.gif', { user: req.user });
        if(type==2) res.render('ProgettoLTW/afterLogin/afteradminloginindex.html', { user: req.user });
        else res.render('https://media.giphy.com/media/muKS0FZTV8Ih2/giphy.gif', { user: req.user });
    });



	

	return router;
}
