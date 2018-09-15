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
    db.find({date: date}).sort({ timestamp: 1 }).exec(function (err, docs) {

        //console.log(docs)

        if(docs.length == 0){
            var htmlString =

            '    <div class="form-group">'+
            '        <label class="text-muted font-italic" for="text">¿Cómo empieza?</label>'+
            '        <textarea class="form-control" id="text" maxlength="2000" rows="10"></textarea>'+
            '    </div>'+
            '    <button id="enviar" class="btn btn-secondary font-italic">enviar</button>';

            res.send(htmlString);
        }else{
            format(docs);
        }
        
    });



    function format(docs){

        var htmlString = "";

        for(var index in docs){

            htmlString += 
                '<div class="card">' +
                '    <div class="card-body">' +
                '        <p class="card-text text-dark text-justify">' + docs[index].body + '</p>' +
                '    </div>' +
                '</div>' +
                '<br/>';
        }

        htmlString +=
    
            '    <div class="form-group">'+
            '        <label class="text-muted font-italic" for="text">¿Cómo sigue?</label>'+
            '        <textarea class="form-control outer" id="text" maxlength="2000" rows="10"></textarea>'+
            '    </div>'+
            '    <button id="enviar" class="btn btn-secondary font-italic">enviar</button>';

        //console.log(htmlString)
        res.send(htmlString)
    }

});


router.post('/', function(req, res, next) {

    
    var text = req.param('text');
    var date = req.param('date');
    var timestamp = req.param('timestamp');


    db.insert({
        date: date,
        body: text,
        active: true,
        timestamp: timestamp
    }),function(err){
   
        if(err){
            res.send(true);
        }else{
            res.send(false);
        }
    };

    
});


module.exports = router;
