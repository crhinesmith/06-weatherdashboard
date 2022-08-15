var APIKey = "3eff2bf56c19c01557fecc3e5ac3eb51";
var searchbtnEl = document.getElementById('search-btn');
var previousCities = document.getElementById('previous-cities');
var fiveDay = document.getElementById('fiveDay-forecast');
var today = document.getElementById('today-forecast');
var searchHistory = [];



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
    searchbtnEl.appendChild(buttonEl)


  })

}
function handleSearchFormSubmit(event) {
  event.preventDefault();

  var city = document.querySelector('#search-input').value;

  if (!city) {
    console.error('You need a search input value!');
    return;
  }

  // what if I do have a city then what?
  getCityCurrentWeather(city);
  saveCitySearch(city);



}

//one way to store the data found in the response from the URL is to have an undeclared variable up top then declare it in the function where the response is
//one way to use the data found in the response that is done further down in the code is to have a function with parameters that youll pull from the response  
// function xx(dat1, dat2) {
// //     // do stuff
// }



var getCityCurrentWeather = function (city) {
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
      
      var h2El = document.createElement('h3')
      h2El.textContent = data.name
      today.appendChild(h2El);

      var tempEl = document.createElement('p')
      tempEl.textContent = "temp: " + data.main.temp + " F"
      today.appendChild(tempEl)

      var humEl = document.createElement('p')
      humEl.textContent = "humidity: " + data.main.humidity + " %"
      today.appendChild(humEl)

      var windEl = document.createElement('p')
      windEl.textContent = "wind: " + data.wind.speed + " MPH"
      today.appendChild(windEl)




      //need to grab the lat and long from the original queryURL then put in the lat and long on the URL firmin gave us in the slack becasue the UVI only available in that URL 

      // once I have the data
      // fetch('some uurl')
      //         // .then(function(resp) {
      //         //     return resp.json() // converting to json
      //         // }).then(function (forecastData) {
      //         //     console.log(forecastData) // json from line 43

      //             // call a function and pass data to it
      //             // xx(1, 2)
      //         })
    })


}
var getCityUVIWeather = function (cityLat, cityLong) {
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
      today.appendChild(uviEl)
      
      console.log(data.current.weather[0].icon)
      var iconEl = document.createElement('img')
      iconEl.setAttribute('src',`https://openweathermap.org/img/w/${data.current.weather[0].icon}.png`
      )
      today.appendChild(iconEl)
    })
}
// function handleAndget () {
//     handleSearchFormSubmit();
//     // needs a param called city

// }
searchbtnEl.addEventListener('click', handleSearchFormSubmit);
renderSearchHistory();
