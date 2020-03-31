$(document).ready(function () {

    var apiKey = "08b0dd9f10a03bff1d46baba879a4a39"
    
    
    $("#getWeather").on("click", function() {
        var userInput = $("#city-search").val();
        displayWeather(userInput);
        window.localStorage.setItem('citySearch', JSON.stringify(userInput));
      });

    var cities = [];

    

    function displayWeather(city) {

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + apiKey
        
        $.ajax({
            url: queryURL,
            method: "GET",
            dataType: "json"
        }).then(function (response) {
            console.log(response);

            var city= response.name
            $("#cityName").text(city)

            var temp = Math.floor((response.main.temp - 273.15) * 1.80 + 32)

            $("#curTemp").text("Temp: "+temp+ " F")

            var humidity= response.main.humidity
            $("#curHum").text("Humidity: "+humidity)

            var wind= response.wind.speed
            $("#curWind").text("Wind Speed: "+wind + " MPH")

            
            
            var lon= response.coord.lon;
            var lat= response.coord.lat;

            $.ajax({

                // http://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}
                url:"http://api.openweathermap.org/data/2.5/uvi?appid="+ apiKey+ "&lat="+ lat + "&lon="+ lon,
                method: "GET",
                dataType:"json"
                
            }).then(function(response1){
                console.log(response1)

                var uv= response1.value
                $("#curUv").text("UV Index: "+ uv)
                
            })
        });
        
    }

    



});