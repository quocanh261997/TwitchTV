$(document).ready(function() {
    //List of my favorite channels
    var channels = [
        "faker",
        "theglacierr",
        "solorenektononly",
        "lol_peanut",
        "freecodecamp",
        "sing_sing"
    ]
    var api = "https://wind-bow.glitch.me/twitch-api/";
    for (var i = 0; i < channels.length; i++) {
        //Get the basic information
        var channel = channels[i];
        $.ajax({
            async: false,
            url: api + "channels/" + channel,
            success: function(data) {
                channels[i] = {
                    logo: data.logo,
                    name: data["display_name"],
                    game: data.game,
                    url: data.url
                }
            }
        });

        //Check if a channel is live or not
        $.ajax({
            async: false,
            url: api + "streams/" + channel,
            success: function(data) {
              if (data.stream == null){
                $(".offline").append("<br/><div class='row'><div class='col-md-2'><img class = 'resize' src = '" + channels[i].logo + "'></div><div class='col-md-6'><a style = 'text-decoration: none;' href = ' " + channels[i].url + " '><h4 style='color:white;'>" + channels[i].name + "</h4></a></div><div class='col-md-3'><span style = 'color: white' class='fa fa-times'></span></div></div><br/>");
              }
              else {
                var image = data.stream.preview.medium;
                var viewers = data.stream.viewers;
                $(".online").append("<br/><div class='row'><div class='col-md-1'><img class = 'resize' src = '" + channels[i].logo + "'></div><div class='col-md-3'><a style = 'text-decoration: none;' href = ' " + channels[i].url + " '><h4 style='color:white;'>" + channels[i].name + "</h4></a></div><div class='col-md-2'><span style = 'color: white;' class='fa fa-check'></span></div><div class='col-md-1'>Viewers: "+viewers+ "</div><div class='col-md-5'><img src="+image+"></div></div><br/>");
              }
            }
        });
    }
    function reset() {
        $("#display").html("");
    }

    $("span").on("click",function(e){
      e.preventDefault();
      var source = $(this).text();
      if (source==="All"){
        $("#display").css("background-color","#6441a5");
        $(".online").show("slow");
        $(".offline").show("slow");
      }
      else if (source==="Online"){
        $("#display").css("background-color","#5cb85c");
        $(".offline").hide();
        $(".online").show("slow");
      }
      else{
        $("#display").css("background-color","#d9534f");
        $(".online").hide();
        $(".offline").show("slow");
      }
    });

    $("a").on("click",function(e){
      e.preventDefault();
      if ($(this).text()=="More details") $()
    })

});
