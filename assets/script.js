var APIKey = "3eff2bf56c19c01557fecc3e5ac3eb51";
var searchbtnEl = document.getElementById('search-btn');
var previousCities = document.getElementById('previous-cities');
var fiveDay = document.getElementById('fiveDay-forecast');
var today = document.getElementById('today-forecast');
var searchHistory = [];
var forecastContainerEl = document.getElementById('forecast-container');



function saveCitySearch (city){
  // var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || []
  searchHistory.push(city)
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
}

function renderSearchHistory (){
  var cityRows = JSON.parse(localStorage.getItem('searchHistory')) || []
  cityRows.forEach(function(city){
    var buttonEl = document.createElement('button')
    buttonEl.textContent = city
    //button EL.addevent listener ('click', new function that uses city as input)
    //button that calls the function with the city that is listed on the button
    //create an empty UL then append the search buttons to the UL
    previousCities.append(buttonEl)


  })

}
function handleSearchFormSubmit(event) {
  event.preventDefault();

  var city = document.querySelector('#search-input').value;

  if (!city) {
    console.error('You need a search input value!');
    return;
  }

  getCityCurrentWeather(city);
  saveCitySearch(city);
}




var getCityCurrentWeather = function (city) {
  while (today.firstChild){
    today.removeChild(today.firstChild);
  };

  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";
  
  fetch(queryURL)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      console.log(data)
      console.log("temp: " + data.main.temp + " F")
      console.log("humidity: " + data.main.humidity + " %")
      console.log("wind: " + data.wind.speed + " MPH")
      console.log(data.coord.lon)
      console.log(data.coord.lat)

      var cityLat = data.coord.lat
      var cityLong = data.coord.lon

      console.log(cityLat);
      console.log(cityLong);
      getCityUVIWeather(cityLat, cityLong);

      var h1El = document.createElement('h1');
      h1El.textContent = "Current Forecast"

      const currentDate = moment();
      var h2El = document.createElement('h2');
      h2El.textContent = data.name + " " + currentDate.format('MM-DD')

      var tempEl = document.createElement('p')
      tempEl.textContent = "Temp: " + data.main.temp + " F"

      var humEl = document.createElement('p')
      humEl.textContent = "Humidity: " + data.main.humidity + " %"

      var windEl = document.createElement('p')
      windEl.textContent = "Wind: " + data.wind.speed + " MPH"

      today.append(h1El, h2El, tempEl, humEl, windEl)
    })
}

var getCityUVIWeather = function (cityLat, cityLong) {
  while (fiveDay.firstChild){
    fiveDay.removeChild(fiveDay.firstChild);
  };
  var queryCoordURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLong + "&units=imperial&exclude=minutely,hourly&appid=" + APIKey;

  fetch(queryCoordURL)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      console.log(data)
      console.log("UVI: " + data.current.uvi)

      var uviEl = document.createElement('p')
      uviEl.textContent = "UVI: " + data.current.uvi
      if (data.current.uvi < 5){
        uviEl.classList.add('bg-success')
      } else if (data.current.uvi < 7){
        uviEl.classList.add('bg-warning')
      } else {
        uviEl.classList.add('bg-danger')
      }
      today.appendChild(uviEl)
      
      console.log(data.current.weather[0].icon)
      var iconEl = document.createElement('img')
      iconEl.setAttribute('src',`https://openweathermap.org/img/w/${data.current.weather[0].icon}.png`
      )
      today.appendChild(iconEl)

      var forecast1Card = document.createElement('div')
      forecast1Card.classList.add('card', 'bg-dark', 'text-light','mb-3','p-3')

      var forecast1Body = document.createElement('div');
      forecast1Body.classList.add('card-body');
      forecast1Card.append(forecast1Body);

      const date1 = moment().add(1, 'days');
      var date1El = document.createElement('h3');
      date1El.textContent = date1.format('MM-DD')
      
      var temp1El = document.createElement('p')
      temp1El.textContent = "Temp: " + data.daily[0].temp.day + " F"
      var hum1El = document.createElement('p')
      hum1El.textContent = "Humidity: " + data.daily[0].humidity + " %"
      var wind1El = document.createElement('p')
      wind1El.textContent = "Wind: " + data.daily[0].wind_speed + " MPH"
      var icon1El = document.createElement('img')
      icon1El.setAttribute('src',`https://openweathermap.org/img/w/${data.daily[0].weather[0].icon}.png`
      )
      
      forecast1Card.append(date1El, temp1El, hum1El, wind1El, icon1El);

      var forecast2Card = document.createElement('div')
      forecast2Card.classList.add('card', 'bg-dark', 'text-light','mb-3','p-3')

      var forecast2Body = document.createElement('div');
      forecast2Body.classList.add('card-body');
      forecast2Card.append(forecast2Body);

      const date2 = moment().add(2, 'days');
      var date2El = document.createElement('h3');
      date2El.textContent = date2.format('MM-DD')
      
      var temp2El = document.createElement('p')
      temp2El.textContent = "Temp: " + data.daily[1].temp.day + " F"
      var hum2El = document.createElement('p')
      hum2El.textContent = "Humidity: " + data.daily[1].humidity + " %"
      var wind2El = document.createElement('p')
      wind2El.textContent = "Wind: " + data.daily[1].wind_speed + " MPH"
      var icon2El = document.createElement('img')
      icon2El.setAttribute('src',`https://openweathermap.org/img/w/${data.daily[1].weather[0].icon}.png`
      )
      
      forecast2Card.append(date2El, temp2El, hum2El, wind2El, icon2El);

      var forecast3Card = document.createElement('div')
      forecast3Card.classList.add('card', 'bg-dark', 'text-light','mb-3','p-3')

      var forecast3Body = document.createElement('div');
      forecast3Body.classList.add('card-body');
      forecast3Card.append(forecast3Body);

      const date3 = moment().add(3, 'days');
      var date3El = document.createElement('h3');
      date3El.textContent = date3.format('MM-DD')
      
      var temp3El = document.createElement('p')
      temp3El.textContent = "Temp: " + data.daily[2].temp.day + " F"
      var hum3El = document.createElement('p')
      hum3El.textContent = "Humidity: " + data.daily[2].humidity + " %"
      var wind3El = document.createElement('p')
      wind3El.textContent = "Wind: " + data.daily[2].wind_speed + " MPH"
      var icon3El = document.createElement('img')
      icon3El.setAttribute('src',`https://openweathermap.org/img/w/${data.daily[2].weather[0].icon}.png`
      )
      
      forecast3Card.append(date3El, temp3El, hum3El, wind3El, icon3El);

      var forecast4Card = document.createElement('div')
      forecast4Card.classList.add('card', 'bg-dark', 'text-light','mb-3','p-3')

      var forecast4Body = document.createElement('div');
      forecast4Body.classList.add('card-body');
      forecast4Card.append(forecast4Body);

      const date4 = moment().add(4, 'days');
      var date4El = document.createElement('h3');
      date4El.textContent = date4.format('MM-DD')
      
      var temp4El = document.createElement('p')
      temp4El.textContent = "Temp: " + data.daily[3].temp.day + " F"
      var hum4El = document.createElement('p')
      hum4El.textContent = "Humidity: " + data.daily[3].humidity + " %"
      var wind4El = document.createElement('p')
      wind4El.textContent = "Wind: " + data.daily[3].wind_speed + " MPH"
      var icon4El = document.createElement('img')
      icon4El.setAttribute('src',`https://openweathermap.org/img/w/${data.daily[3].weather[0].icon}.png`
      )
      
      forecast4Card.append(date4El, temp4El, hum4El, wind4El, icon4El);

      var forecast5Card = document.createElement('div')
      forecast5Card.classList.add('card', 'bg-dark', 'text-light','mb-3','p-3')

      var forecast5Body = document.createElement('div');
      forecast5Body.classList.add('card-body');
      forecast5Card.append(forecast4Body);

      const date5 = moment().add(5, 'days');
      var date5El = document.createElement('h3');
      date5El.textContent = date5.format('MM-DD')
      
      var temp5El = document.createElement('p')
      temp5El.textContent = "Temp: " + data.daily[4].temp.day + " F"
      var hum5El = document.createElement('p')
      hum5El.textContent = "Humidity: " + data.daily[4].humidity + " %"
      var wind5El = document.createElement('p')
      wind5El.textContent = "Wind: " + data.daily[4].wind_speed + " MPH"
      var icon5El = document.createElement('img')
      icon5El.setAttribute('src',`https://openweathermap.org/img/w/${data.daily[4].weather[0].icon}.png`
      )
      
      forecast5Card.append(date5El, temp5El, hum5El, wind5El, icon5El);

      fiveDay.append(forecast1Card, forecast2Card, forecast3Card, forecast4Card, forecast5Card);
    })
}

searchbtnEl.addEventListener('click', handleSearchFormSubmit);
renderSearchHistory();
