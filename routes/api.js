var express = require('express');
var router = express.Router();
const Utente = require('../models/Utente');

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
        


        return router;
    }
