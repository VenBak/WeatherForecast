// var apikey = "a53b85c0c9cce34b65599127147440f8"
// var url = "http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=" + apikey

// fetch(url)
// .then(function (response) {
//     console.log(response);
//     return response.json();
// })
// .then(function (data){
//     console.log(data)
// });




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
    // input.innerHTML = inputs.join('<br/>');
    if (input != " ") {
        inputs.push(input) 
    }
    // Missing: Add attribute to button
    console.log("click");
    console.log(input);
    console.log(index);
}