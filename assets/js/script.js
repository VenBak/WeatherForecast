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

// Gets the current day of the year and displays it next to city search result
document.querySelector("#date").innerHTML = dayjs().format('(DD/MM/YYYY)');


const element = document.getElementById("searchbtn");
element.addEventListener("click", ok);

var index = 0

function ok() { 
    index++;
    var input = document.getElementById("searchinput").value;
    localStorage.setItem("citysearch" + index, input);
    
    var parent = document.querySelector("#searchhistory");
    var element = document.createElement("button")
    parent.append(element);
    element.innerHTML = input
    element.classList.add('button', 'btn-primary');




    console.log("click");
    console.log(input);
    console.log(index)

}