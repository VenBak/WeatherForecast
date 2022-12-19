// Sets the input as a string
var input = "";

// Gets all the cities from the local storage and creates a button for them
for (let i = 1; i < localStorage.length; i++) {
    var get = localStorage.getItem("citysearch"+i);
    var getparent = document.querySelector("#searchhistory");
    var getcreatebutton = document.createElement("button");
    getparent.append(getcreatebutton);
    getcreatebutton.innerHTML = get;
    getcreatebutton.setAttribute("class", "btn btn-primary citysearch"+i)
}
// Gets today's date with a specified format
var today = dayjs().format('(DD/MM/YYYY)')
// Gets todays date of the month
var date = dayjs().date()

// Variable used for forecast date
var month = dayjs().format('/MM/YYYY)')

// Event listener for search button
const element = document.getElementById("searchbtn");
element.addEventListener("click", searchHistory);

// Runs function which primarily renders attributes, and dayjs
function searchHistory() {
    index = localStorage.getItem("index");

    // Adds 1 to an index to store the input in the local storage 
    index++;
    localStorage.setItem("index", index)
    var input = document.getElementById("searchinput").value;
    localStorage.setItem("citysearch" + index, input);
    
    // Adds a Button under the text input for whatever they typed in and saves it in local storage
    var parent = document.querySelector("#searchhistory");
    var element = document.createElement("button");
    parent.append(element);
    element.innerHTML = input;
    element.setAttribute("class", "btn btn-primary citysearch"+index);
    element.addEventListener("click", function(){
        render(input)
    })

    // Gets the current day of the year and displays it next to city search result
    document.querySelector("#date").innerHTML = today;

    // Adds a title for the forecasted numbers
    document.querySelector("#forecasttitle").innerHTML = "5-Day Forecast:"

    // Adds attribute which adds color to results that are searched
    document.querySelector("#result").removeAttribute("class", "render1");
    document.querySelector("#result").setAttribute("class", "render1");
    document.querySelector("#forecasttitle").removeAttribute("class", "render");
    document.querySelector("#forecasttitle").setAttribute("class", "render");
    document.querySelector("#todayresult").removeAttribute("class", "render");
    document.querySelector("#todayresult").setAttribute("class", "render");

    // Pastes all the days for the forecast
    document.getElementById("day-t-1").textContent = '(' + (date + 1) + month;
    document.getElementById("day-t-2").textContent = '(' + (date + 2) + month;
    document.getElementById("day-t-3").textContent = '(' + (date + 3) + month;
    document.getElementById("day-t-4").textContent = '(' + (date + 4) + month;

    // Calls the function which renders the numbers
    render(input);
};


function render(input) {  

    var apikey = "a53b85c0c9cce34b65599127147440f8";

    // First gets the lat and long
    fetch("http://api.openweathermap.org/geo/1.0/direct?q="+ input +"&limit=1&appid=" + apikey)
    .then(function (response) {
        return response.json();
        // Sets variable name for lat and lon and pastes in name of the city
    }).then(function (latlondata) {
        var lat = latlondata[0].lat;
        var lon = latlondata[0].lon;
        document.querySelector("#citytitle").innerHTML = latlondata[0].name
        
        var url = "https://api.openweathermap.org/data/2.5/forecast?lat="+ lat +"&lon="+ lon +"&appid=" + apikey + "&units=metric";
                
        fetch(url)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            // Gets the temp, wind speed and humidity fro the api and pastes it
            document.querySelector("#citytemp").innerHTML = "Temp: " + data.list[0].main.temp + " °C"
            document.querySelector("#citywind").innerHTML = "Wind: " + data.list[0].wind.speed + " meters/sec"
            document.querySelector("#humidity").innerHTML = "Humidity: " + data.list[0].main.humidity + " %"
                    
            // Adds icon based on weather conditions for today's weather
            var todayicon = document.querySelector("#cityimg");

            if (data.list[0].weather[0].main == "Snow") {
                todayicon.setAttribute("src", "./assets/images/snow.webp");
            } else if (data.list[0].weather[0].main == "Rain") {
                todayicon.setAttribute("src", "./assets/images/rain.webp");
            }  else if (data.list[0].weather[0].main == "Clouds") {
                todayicon.setAttribute("src", "./assets/images/cloudy.webp");
            }   else if (data.list[0].weather[0].main == "Clear") {
                todayicon.setAttribute("src", "./assets/images/sun.webp");
            }   else if (data.list[0].weather[0].main == "Thunderstorm") {
                todayicon.setAttribute("src", "./assets/images/thunderstorm.webp");
            }   else if (data.list[0].weather[0].main == "Drizzle") {
                todayicon.setAttribute("src", "./assets/images/drizzle.webp");
            }   else if (data.list[0].weather[0].main == ("Mist" || "Smoke" || "Haze" || "Dust" || "Fog" || "Sand" || "Ash" || "Squall" || "Tornado")) {
                todayicon.setAttribute("src", "./assets/images/wind.webp");
            }
                
            // Adds the text content for all of the forecasted weather

            for (let i = 1; i < 5; i++) {
                document.querySelector("#temp-t-"+i).innerHTML = "Temp: " + data.list[i].main.temp + " °C"
                document.querySelector("#wind-t-"+i).innerHTML = "Wind: " + data.list[i].wind.speed + " meters/sec"
                document.querySelector("#humidity-t-"+i).innerHTML = "Humidity: " + data.list[i].main.humidity + " %"
                
                // Adds icon based on weather conditions for forecast
                if (data.list[i].weather[0].main == "Snow") {
                    document.querySelector("#img-t-"+i).setAttribute("src", "./assets/images/snow.webp");
                } else if (data.list[i].weather[0].main == "Rain") {
                    document.querySelector("#img-t-"+i).setAttribute("src", "./assets/images/rain.webp");
                }  else if (data.list[i].weather[0].main == "Clouds") { 
                    document.querySelector("#img-t-"+i).setAttribute("src", "./assets/images/cloudy.webp");
                }   else if (data.list[i].weather[0].main == "Clear") {
                document.querySelector("#img-t-"+i).setAttribute("src", "./assets/images/sun.webp");
                }   else if (data.list[i].weather[0].main == "Thunderstorm") {
                    document.querySelector("#img-t-"+i).setAttribute("src", "./assets/images/thunderstorm.webp");
                }   else if (data.list[i].weather[0].main == "Drizzle") {
                    document.querySelector("#img-t-"+i).setAttribute("src", "./assets/images/drizzle.webp");
                }   else if (data.list[i].weather[0].main == ("Mist" || "Smoke" || "Haze" || "Dust" || "Fog" || "Sand" || "Ash" || "Squall" || "Tornado")) {
                    document.querySelector("#img-t-"+i).setAttribute("src", "./assets/images/wind.webp");
                }
            }

        });
    });

};


// Event listener for history of buttons
for (let i = 1; i < 10; i++) {

    var historybutton = document.querySelector(".citysearch"+i)
    historybutton.addEventListener("click", historyClick)
    function historyClick() {
        // Adds attribute which adds color to results that are searched
        document.querySelector("#result").removeAttribute("class", "render1");
        document.querySelector("#result").setAttribute("class", "render1");
        document.querySelector("#forecasttitle").removeAttribute("class", "render");
        document.querySelector("#forecasttitle").setAttribute("class", "render");
        document.querySelector("#todayresult").removeAttribute("class", "render");
        document.querySelector("#todayresult").setAttribute("class", "render");
        
        input = localStorage.getItem("citysearch"+i) 
        render(input)
    }
}
