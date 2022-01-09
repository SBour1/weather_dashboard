var weatherKey = '2e819f4a06b55a326d33b3931a5f59d9'

function weatherCall(city){
    city = $('#user-input').val()
    searchHistoryBtn = $('<button class="newSearch">' + localStorage.getItem(city, city) + '</button>')
    confirmBtn = document.querySelector('.newSearch')
    fetch ('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + weatherKey)
    .then(data=>data.json())
    .then(weatherData=>{
        console.log(weatherData)
        fetch ('http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + weatherKey)
        .then(fiveDay=>fiveDay.json())
        .then(forecastData=>{
            console.log(forecastData)
        })
    })
    localStorage.setItem(city, city)
    if (confirmBtn){
        confirmBtn.remove();
    } else {      
        for (let i = 0; i < localStorage.length; i++) {
            $('.input-group').after($('<button class="newSearch">' + localStorage.getItem(localStorage[i]) + '</button>'))
        }
    }
    $('.newSearch').click(function (){
        console.log("city")
        weatherCall($('.newSearch').text())
    })
}

$('#searchBtn').click(weatherCall) 
