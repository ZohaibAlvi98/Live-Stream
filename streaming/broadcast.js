window.onload = function(e){ 


$(document).ready(function() {
    $("#button").click(function(){
       

$.ajax({
    url: 'https://api.mux.com/video/v1/live-streams',
    dataType: 'json',  
    headers: {
      'Access-Control-Allow-Origin': '*',
      "Content-Type": "application/json",
      "Accept": "*/*",
      "Authorization": `Basic ${btoa("15df9e19-1dfa-4a02-9e81-c822e4124889:TRPUR4FCq6VhvSJbzG2Rexmuln+02UWNVOXqwXtlyVYlNG/wifjg15nNjHfF3eVx7EE7t+2Nrc+")}`
    },
    method: 'POST', 
    data: JSON.stringify({ "playback_policy": "public", "new_asset_settings": { "playback_policy": "public" } }),
    success: function(data){
        var data = JSON.parse(JSON.stringify(data));
     
       console.log(data.data.stream_key)
       console.log(data.data.playback_ids[0].id)
       console.log(data.data.id)

       $("body").append("<br> <input type='button' id='field' value = 'POST' />");
       $("#field").click(function(){

        $.ajax({
            url: 'https://api.mux.com/video/v1/live-streams/'+data.data.id,
            dataType: 'json',  
            headers: {
              'Access-Control-Allow-Origin': '*',
              "Content-Type": "application/json",
              "Accept": "*/*",
              "Authorization": `Basic ${btoa("15df9e19-1dfa-4a02-9e81-c822e4124889:TRPUR4FCq6VhvSJbzG2Rexmuln+02UWNVOXqwXtlyVYlNG/wifjg15nNjHfF3eVx7EE7t+2Nrc+")}`
            },
            method: 'GET', 
            success: function(comingData){
                var comingData = JSON.parse(JSON.stringify(comingData))
                if(comingData.data.status == 'active'){
                    
                    $(this).prop('disabled',true);
                    var player = window.player = videojs('yo');
                    var url = 'https://stream.mux.com/'+data.data.playback_ids[0].id+'.m3u8'
                    player.src({
                        src: url,
                        type: 'application/x-mpegURL'
                    })  
                }
            }
        })

       })
       $("#video").html('Stream Key: '+data.data.stream_key +'<br><br> URL: '+'rtmp://global-live.mux.com:5222/app <br><br> Add this to your OBS studio and then hit post button Your stream will start')
            
        
        // $("video").html('<source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.webm" type="application/x-mpegURL"></source>' );
       
        // $("video")[0].load();
        // $("video").html('<source src="https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8" type="application/x-mpegURL"></source>' );
       
        
        // var player = window.player = videojs('yo');
        // var url = 'https://stream.mux.com/'+data.data.playback_ids[0].id+'.m3u8'
        // player.src({
        //     src: url,
        //     type: 'application/x-mpegURL'
        // }) 
       
    
        


      },
    error : function(error) {
        console.log('here')
        console.log(error);
        
        
    }
    });
  
    }); 

});

}