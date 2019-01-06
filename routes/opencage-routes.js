var express = require('express');
var router = express.Router();
var request = require('request');

var key = 'b9646aa648ab43e39b6f8cb5fdae5196';
var indirizzo= 'Via Tiburtina 205, Roma'; //Indirizzo del nostro studio

module.exports = function(passport){

    router.get('/opencage/(:query)', function(req, res) {
        var query= req.params.query;
        var myurl;
        if(query == 'studio'){
            myurl = 'https://api.opencagedata.com/geocode/v1/json?q='+indirizzo+'&key='+key;

            request(myurl, function (error, response, body) {
                var myjson = JSON.parse(body) ;
                res.json({
                    coordinate: myjson["results"][0]["annotations"]["DMS"],
                    luogo: myjson["results"][0]["components"]
                });
            });
        }
        myurl = 'https://api.opencagedata.com/geocode/v1/json?q='+query+'&key='+key;

        request(myurl, function (error, response, body) {
            var myjson = JSON.parse(body) ; 
            res.json({
                coordinate: myjson["results"][0]["annotations"]["DMS"],
                luogo: myjson["results"][0]["components"]
            });
        });
        
    });


    return router;
}