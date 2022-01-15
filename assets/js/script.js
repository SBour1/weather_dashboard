var weatherKey = '2e819f4a06b55a326d33b3931a5f59d9'
var picEl = $('#weatherPic')
var tempEl = $('#temp')
var windEl = $('#wind')
var humidityEl = $('#humidity')
var uvEl = $('#uv')
var nameEl = $('.city-name')
var search = $('#searchBtn')
var forecastEl = $('.forecast')
var historyEl =  $('#history')

function weatherCall(city) {
    var city = $('#user-input').val()
    localStorage.setItem(city, city)
    fetch('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + weatherKey + '&units=imperial')
        .then(data => data.json())
        .then(function (response) {
            tempEl.html("Temperature: " + Math.trunc(response.main.temp) + '&#176');
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
            fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + weatherKey)
                .then(uv => uv.json())
                .then(function (response) {
                    uvEl.html("UV: " + response.daily[0].uvi)
                    if (response.daily[0].uvi > 5) {
                        uvEl.attr("style", "background-color: red; display: inline")
                    } else if (response.daily[0].uvi <= 2) {
                        uvEl.attr("style", "background-color: green; display: inline")
                    } else {
                        uvEl.attr("style", "background-color: yellow; display: inline")
                    }
                })
            fetch('http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + weatherKey + '&units=imperial')
                .then(fiveDay => fiveDay.json())
                .then(response => {
                    for (let i = 0; i < forecastEl.length; i++) {
                        var forecastIndex = i * 8 + 4
                        var forecastDate = new Date(response.list[forecastIndex].dt * 1000)
                        var forecastDay = forecastDate.getDate();
                        var forecastMonth = forecastDate.getMonth() + 1;
                        var forecastYear = forecastDate.getFullYear();
                        $('#' + i).append('<h4>').html(forecastMonth + "/" + forecastDay + "/" + forecastYear)
                        $('#' + i).append('<img src="https://openweathermap.org/img/wn/' + response.list[forecastIndex].weather[0].icon + '@2x.png"/>');
                        $('#' + i).append('<p> Temp: ' + response.list[forecastIndex].main.temp + '&#176</p>')
                        $('#' + i).append('<p> Humidity: ' + response.list[forecastIndex].main.humidity + '%</p>')
                        $('#' + i).append('<p> Wind: ' + response.list[forecastIndex].wind.speed + " MPH</p>")
                    }
                })
        })
            historyEl.html("")
            for (let i = 0; i < localStorage.length; i++) {
                var historyItem = $("<button>" + localStorage.getItem(localStorage.key(i)) + "</button>");
                historyItem.attr("class", "form-control d-block bg-white");
                historyItem.click(weatherCall)
                historyEl.append(historyItem);
            }
        }

search.click(weatherCall) 
