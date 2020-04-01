$(document).ready(function () {
    var userInput = $("#city-search").val();
    var apiKey = "08b0dd9f10a03bff1d46baba879a4a39"


    $("#getWeather").on("click", function () {
        event.preventDefault();
        var cities = [];
        
        var userInput = $("#city-search").val();
        displayWeather(userInput);
        displayForecast(userInput)
        window.localStorage.setItem('cities', JSON.stringify(userInput));
        
        localStorage.setItem('cityNames', JSON.stringify(userInput));
        cities.push(userInput)
        var storedCity = JSON.parse(localStorage.getItem("cities"))

        $(userInput).prepend(cities);
        $("#past-cities").text(storedCity)
        
    });








    function displayWeather(city) {

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + apiKey

        $.ajax({
            url: queryURL,
            method: "GET",
            dataType: "json"
        }).then(function (response) {
            console.log(response)
            var city = response.name
            $("#cityName").text(city)

            var temp = Math.floor((response.main.temp - 273.15) * 1.80 + 32)

            $("#curTemp").text("Temp: " + temp + " F")

            var humidity = response.main.humidity
            $("#curHum").text("Humidity: " + humidity)

            var wind = response.wind.speed
            $("#curWind").text("Wind Speed: " + wind + " MPH")

            var lon = response.coord.lon;
            var lat = response.coord.lat;

            $.ajax({

                url: "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon,
                method: "GET",
                dataType: "json"

            }).then(function (response1) {

                var uv = response1.value
                $("#curUv").text("UV Index: " + uv)

            })
        });
    }

    function displayForecast(city) {
        queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey
        $.ajax({
            url: queryURL,
            method: "GET",
            dataType: "json"
        }).then(function (response2) {
            console.log(response2);

            var temp = Math.floor((response2.list[0].main.temp - 273.15) * 1.80 + 32)

            $("#futureTemp1").text("Temp: " + temp + " F")

            var humidity = response2.list[0].main.humidity
            $("#futureHum1").text("Humidity: " + humidity)

            var temp = Math.floor((response2.list[1].main.temp - 273.15) * 1.80 + 32)

            $("#futureTemp2").text("Temp: " + temp + " F")

            var humidity = response2.list[1].main.humidity
            $("#futureHum2").text("Humidity: " + humidity)

            var temp = Math.floor((response2.list[2].main.temp - 273.15) * 1.80 + 32)

            $("#futureTemp3").text("Temp: " + temp + " F")

            var humidity = response2.list[2].main.humidity
            $("#futureHum3").text("Humidity: " + humidity)

            var temp = Math.floor((response2.list[3].main.temp - 273.15) * 1.80 + 32)

            $("#futureTemp4").text("Temp: " + temp + " F")

            var humidity = response2.list[3].main.humidity
            $("#futureHum4").text("Humidity: " + humidity)

            var temp = Math.floor((response2.list[4].main.temp - 273.15) * 1.80 + 32)

            $("#futureTemp5").text("Temp: " + temp + " F")

            var humidity = response2.list[4].main.humidity
            $("#futureHum5").text("Humidity: " + humidity)


        })

    }



});