$(function(){

    $('.datepicker').datepicker({
        autoclose: true,
        language: 'es-ES',
        format: 'dd/mm/yyyy'
    })
    .on('changeDate', function(e){

        $.ajax({
            url: 'getDay?date=' + $('.datepicker').val(),
            method: 'GET'
        })
        .done(function(data){
    
            $('.history').empty().append(data);
    
            $('#enviar').click(function(){

                var data2send = {
                    text: $("#text").val(),
                    date: $('.datepicker').val(),
                    timestamp: $.now()
                };
        
                $.ajax({
                    url: 'getDay',
                    type: 'POST',
                    data: data2send,
                    dataType: 'json',
                    success: function(res){
                        console.log(res)
                    }
                })

                $('.datepicker').datepicker().trigger('changeDate');
        
            });
    
        });


    })

});

