var express = require('express');
var router = express.Router();
Datastore = require('nedb');
db = new Datastore({filename: 'DATA'});

db.loadDatabase(function(err){
    if(err) console.log(err);

  });


/* GET day page. */
router.get('/', function(req, res, next) {

    var date = req.query.date;



/*
    db.find({date: date}, function(err, docs){

        if(err){ 
            res.send('hubo un error');
            console.log(err);
        }else if(docs){
                console.log(docs);





                db.insert({
                    date: date,
                    body: "esto un test",
                    active: true,
                    timestamp: timestamp
                });

                db.remove({ date: '07/09/2018' }, { multi: true }, function (err, numRemoved) {
                    console.log(numRemoved)
                    
                });

               db.update({ date: '07/09/2018' }, { $push: { body: "esto es otro test" } }, {}, function () {

               });
                              
                if(docs.length == 0){

                    res.send('no hay nada');
                }else{
                    format(docs);
                }

        }
*/

    if(date === '01/01/1900'){

        db.find({}, function (err, docs) {

            if(err) res.end()
            
            res.send(JSON.stringify(docs))

        });
        
    }else{
        db.find({date: date}).sort({ timestamp: 1 }).exec(function (err, docs) {

            //console.log(docs)

            if(docs.length == 0){
                res.send(false);
            }else{
                res.send(docs)
            }
            
        });

    }

});


router.post('/', function(req, res) {

    var text = req.param('text');
    var date = req.param('date');
    var timestamp = req.param('timestamp');

    db.insert({
        date: date,
        body: text,
        active: true,
        timestamp: timestamp
    },function(err,newDoc){

        //res.send(!!err);
        if(err){
            res.send(false)
        }else{
            res.send(true)
        }
        
    });
    
});


router.delete('/', function(req, res, next) {

    var date = req.param('date');
    var timestamp = req.param('timestamp');

    var response = "Nothing removed";

    if(typeof(date) !== 'undefined'){

        if(typeof(timestamp) !== 'undefined'){

            db.remove({ timestamp: timestamp, date: date }, { multi: false }, function (err, numRemoved) {
                
                if(err) response = false;

                response = numRemoved;
              });

        }else{

            db.remove({ date: date }, { multi: true }, function (err, numRemoved) {
                
                if(err) response = false;

                response = numRemoved;
              });

        }
    }

    res.send(response);
    
});

module.exports = router;
