
var bla = $("input").val();
var inp =  document.getElementById("input");

$(document).ready(function() {
    $("#video").click(function(){
        
       if(inp.value != '' && inp.value != null){
       
        
        $.ajax({
            url: inp.value,
            dataType: 'json',  
            headers: {
              'Access-Control-Allow-Origin': '*',
              "Content-Type": "application/json",
              "Accept": "*/*",
              "Authorization": `Basic ${btoa("2560ba8d-e8ab-4f19-9fd7-d4d8b7cceb9b:ufsKzGtI2hzM4bHoXiWsJo3lRsdZ6dNMVpIRDPIsmfvD0SjIRGyL5zRv09rh8eJ05lVxf3/oMQj")}`
            },
            method: 'GET', 
            success: function(comingData){
                var comingData = JSON.parse(JSON.stringify(comingData))
                if(comingData.data.status == 'active'){
                    
                    $(this).prop('disabled',true);
                    var player = window.player = videojs('yo');
                    var url = 'https://stream.mux.com/'+comingData.data.playback_ids[0].id+'.m3u8'
                    player.src({
                        src: url,
                        type: 'application/x-mpegURL'
                    })  
                }
                else{
                    $("#error").html('stream is not started yet')
                }
            },
            error : function(error) {
                
                $("#error").html('Invalid Url')
                
                
            }
        })
    }
    })


})