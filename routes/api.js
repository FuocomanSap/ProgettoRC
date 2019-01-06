var express = require('express');
var router = express.Router();
const Utente = require('../models/Utente');
let middleware = require('./jwtmiddleware');

module.exports = function(passport){

    //api per richiedere tutti i dottori
    //nel caso specifico possiamo scegliere anche il sesso della quey
    //i valori accettati sono: 'MALE,FEMALE,ALL'
    //ove con 'null' si i ntende tutti i dottori che lavorano
    //nel nostro studio
    // curl -X GET localhost/dottori/<sesso>
        router.get('/dottori/(:sesso)',function(req, res){
            var sex = req.params.sesso;
            if(sex=='ALL'){
               Utente.find({ admin: 'false'})
                       .select('email nome cognome sesso dataNascita')
                       .exec(function(err, txs){
                        res.json(txs);});
            }else{
                Utente.find({ admin: 'false', sesso:sex})
                       .select('email nome cognome sesso dataNascita')
                       .exec(function(err, txs){
                        res.json(txs);});
            }
        });



        // Api che permette ai pazienti di richiedere la propria cartella
        // clinica tramite token (implementato con JWT)
        router.get('/apicartellaclinica', middleware.checkToken, function(req, res){
            Cartella.findOne({ email : req.decoded.username }, function(err, cart) {
                if (err){
                    console.log('Error getting Cartella: '+err);
                    return done(err);   
                }
                Utente.findOne({ email : cart.email }, function(err, datis) {
                    if (err){
                        console.log('Error getting Utente: '+err);
                        return done(err);   
                    }
                    var dati= datis;
                    res.json({
                        info: dati,
                        cartella: cart
                    });
                });
            });
        });
        


        return router;
    }
