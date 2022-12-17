// Gets all the cities from the local storage
for (let i = 1; i <= localStorage.length; i++) {
    var get = localStorage.getItem("citysearch"+i);
    var getparent = document.querySelector("#searchhistory");
    var getcreatebutton = document.createElement("button");
    getparent.append(getcreatebutton);
    getcreatebutton.innerHTML = get;
    console.log(get);
}

// Gets the current day of the year and displays it next to city search result
document.querySelector("#date").innerHTML = dayjs().format('(DD/MM/YYYY)');

// Event listener for search button
const element = document.getElementById("searchbtn");
element.addEventListener("click", searchHistory);

var index = 0
function searchHistory() {
    // Adds 1 to an index to store the input in the local storage 
    index++;
    var input = document.getElementById("searchinput").value;
    localStorage.setItem("citysearch" + index, input);
    
    // Adds a Button under the text input for whatever they typed in and saves it in local storage
    var parent = document.querySelector("#searchhistory");
    var element = document.createElement("button");
    parent.append(element);
    element.innerHTML = input;

    // Missing: Add attribute to button
    console.log("click");
    console.log(input);
    console.log(index);

    var apikey = "a53b85c0c9cce34b65599127147440f8";

    // First gets the lat and long
    fetch("http://api.openweathermap.org/geo/1.0/direct?q="+ input +"&limit=1&appid=" + apikey)
    .then(function (response) {
        console.log(response);
        return response.json();
    })
    .then(function (data){
        console.log(data)
        var lat = data[0].lat;
        var lon = data[0].lon;
        document.querySelector("#citytitle").innerHTML = data[0].name
        var url = "https://api.openweathermap.org/data/2.5/forecast?lat="+ lat +"&lon="+ lon +"&appid=" + apikey + "&units=metric";
    
        fetch(url)
        .then(function (response) {
        console.log(response);
        return response.json();
            })
        .then(function (data){
        console.log(data)
        document.querySelector("#citytemp").innerHTML = data.list[0].main.temp + " °C"
        document.querySelector("#citywind").innerHTML = data.list[0].wind.speed + " meters/sec"
        document.querySelector("#humidity").innerHTML = data.list[0].main.humidity + " %"
    });
    });



}