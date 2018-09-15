$(function(){

    $(".textarea").hide();

    $('.datepicker').datepicker({
        autoclose: true,
        language: 'es-ES',
        format: 'dd/mm/yyyy'
    })
    .on('changeDate', function(e){

        $('.history').empty();
        refresh();
        $(".textarea").show();
 

    });

    
    $('#enviar').click(function(){

        if($("#text").val().trim() !== ''){
            
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

                    if(res){
                        
                        refresh();
                        $("#text").val("");
                    }
                }
            });


        }
    });

    var processID = window.setInterval(refresh, 10000);

});


function refresh(){

    console.log("1")

    if($(".datepicker").val() !== ""){

        console.log("2")

        $.ajax({
            url: 'getDay?date=' + $('.datepicker').val(),
            method: 'GET'
        })
        .done(function(data){

            console.log(data)

            if(data){

                $(".textlabel").text("¿Cómo sigue?");

                var htmlString = "";
        
                for(var index in data){
        
                    htmlString += 
                        '<div class="card">' +
                        '    <div class="card-body">' +
                        '        <p class="card-text text-dark text-justify">' + data[index].body + '</p>' +
                        '    </div>' +
                        '</div>' +
                        '<br/>';
                }

                $('.history').empty().append(htmlString);
                $(".textarea").show();
            
            }else{


                $(".textlabel").text("¿Cómo empieza?");
            }

        });
    }

}
