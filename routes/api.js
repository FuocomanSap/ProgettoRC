var express = require('express');
var router = express.Router();
const Utente = require('../models/Utente');

module.exports = function(passport){

    //api per richiedere tutti i dottori
    //nel caso specifico possiamo scegliere anche il sesso della quey
    //i valori accettati sono: 'MALE,FEMALE,null'
    //ove con 'null' si i ntende tutti i dottori che lavorano
    //nel nostro studio
        router.get('/dottori/(:sesso)',function(req, res){
            var sex = req.params.sesso
            if(sex=='null'){
                Utente.find({ admin: 'false'},function (err, docs) {
                    console.log(docs);
                    res.json(docs);});
            }else{
                Utente.find({ admin: 'false', sesso : sex },function (err, docs) {
                console.log(docs);
                res.json(docs);});
            }
        });
        


        return router;
    }
