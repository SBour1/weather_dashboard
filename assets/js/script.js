var weatherKey = '2e819f4a06b55a326d33b3931a5f59d9'
var picEl = $('#weatherPic')
var tempEl = $('#temp')
var windEl = $('#wind')
var humidityEl = $('#humidity')
var uvEl = $('#uv')
var nameEl = $('.city-name')
var search = $('#searchBtn')
var forecastEl = $('.forecast')

function weatherCall(city) {
    var city = $('#user-input').val()
    // searchHistoryBtn = $('<button class="newSearch">' + localStorage.getItem(city, city) + '</button>')
    // confirmBtn = document.querySelector('.newSearch')
    fetch('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + weatherKey)
        .then(data => data.json())
        .then(function (response) {
            console.log(response)
            var farTemp = ((response.main.temp - 273.15) * 1.8) + 32
            tempEl.html("Temperature: " + Math.trunc(farTemp) + '&#176');
            humidityEl.html("Humidity: " + response.main.humidity + "%");
            windEl.html("Wind Speed: " + response.wind.speed + " MPH");
            var currentDate = new Date(response.dt * 1000);
            var day = currentDate.getDate();
            var month = currentDate.getMonth() + 1;
            var year = currentDate.getFullYear();
            nameEl.html(response.name + " (" + month + "/" + day + "/" + year + ") ")
            var weatherPic = response.weather[0].icon;
            picEl.attr("src", "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
            picEl.attr("alt", response.weather[0].description);
            var lat = response.coord.lat
            var lon = response.coord.lon
            console.log(lat, lon)
            // fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon= ' + lon + '&appid=' + weatherKey)
            //     .then(uv => uv.json())
            //     .then(function (response) {
            //         console.log(response)
            //     })
            fetch('http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + weatherKey)
                .then(fiveDay => fiveDay.json())
                .then(response => {
                    console.log(response)
                    for (let i = 0; i < forecastEl.length; i++) {
                        var forecastIndex = i * 8 + 4
                        var forecastDate = new Date(response.list[forecastIndex].dt * 1000)
                        var forecastDay = forecastDate.getDate();
                        var forecastMonth = forecastDate.getMonth() + 1;
                        var forecastYear = forecastDate.getFullYear();
                        $('.forecast').append('<h4>').html(forecastMonth + "/" + forecastDay + "/" + forecastYear)
                        var forecastPic = $('.forecast').append('<img>');
                        forecastPic.attr("src", "https://openweathermap.org/img/wn/" + response.list[forecastIndex].weather[0].icon + "@2x.png");
                        forecastPic.attr("alt", response.list[forecastIndex].weather[0].description);
                        var forecastTempEl = forecastPic.append('<p>')
                        var forecastTemp = ((response.list[forecastIndex].main.temp - 273.15) * 1.8) + 32
                        var forecastHumidity = forecastTempEl.append('<p>')
                        forecastTempEl.html('Temp: ' + Math.trunc(forecastTemp) + '&#176')
                        console.log(response.list[forecastIndex].main.humidity)
                        forecastHumidity.html('Humidity: ' + response.list[forecastIndex].main.humidity + '%')
                    }
                })
        })


    //     localStorage.setItem(city, city)
    //     if (confirmBtn){
    //         confirmBtn.remove();
    //     } else {      
    //         for (let i = 0; i < localStorage.length; i++) {
    //             $('.input-group').after($('<button class="newSearch">' + localStorage.getItem(localStorage[i]) + '</button>'))
    //         }
    //     }
    //     $('.newSearch').click(function (){
    //         console.log("city")
    //         weatherCall($('.newSearch').text())
    //     })
}

search.click(weatherCall) 
