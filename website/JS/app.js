console.log("Client Side JS File is Loaded In! (INDEX.HTML)");

document.getElementById("generate").addEventListener("click", () => {
  console.log("Generate Clicked");
  const cityInput = document.getElementById("city-input");
  const feelingInput = document.getElementById("feeling-input");

  const data = getWeatherData(cityInput.value);
  data.then((data) => {
    try {
      let d = new Date();
      let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
      let temp = Math.ceil(data.main.temp);
      let content = feelingInput.value;
      let location = data.name + "," + data.sys.country;
      postData("/add", {temp: temp, date: newDate, userInput: content, loc: location});
    } catch(error){
      alert("Please Enter a Valid Location and Feeling.");
      console.log("error0", error)
      clearInputs();
    }

  }).then(() => {
    updateUI();
  });
})

// Clear Form Fuction 
const clearInputs = () => {
  document.getElementById("city-input").value = "";
  document.getElementById("feeling-input").value = "";
}

// Grab Weather Data from API 
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const apiKey = '&appid=54cc6b3b7e7083ef65173952e476ef6c';

async function getWeatherData(city){
  const queryURL = baseURL + city + apiKey;
  const res = await fetch(queryURL)
  try {
    const data = await res.json();
    return data;
  }  catch(error) {
    console.log("error1", error);
    // appropriately handle the error
  }
} 

// Client Side Post Request
const postData = async ( url = '', data = {})=>{
  console.log(data);
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
   // Body data type must match "Content-Type" header        
    body: JSON.stringify(data), 
  });

    try {
      const newData = await response.json();
      console.log(newData);
      return newData;
    }catch(error) {
    console.log("error2", error);
    }
}

// TEST POST CALL
/*
postData('/add', {
  temp:42,
  date: "Sept 7 1990",
  userInput: "BLAH BLAH"
});
*/

// UPDATE UI
const updateUI = async () => {
  console.log("UPDATE UI");
  clearInputs();
  const request = await fetch('/all');
  try {
    // Grabs all the Data from Server projectData variable
    const allData = await request.json();
    document.getElementById("historical-data").innerHTML = "<tr><th>Location</th><th>Temperature</th><th>Date</th><th>How Feeling</th></tr>";
    for (let i=0; i<allData.length; i++) {
      document.getElementById("historical-data").innerHTML += `<tr><td><strong>${allData[i].loc}</strong></td><td>${allData[i].temp}</td> <td>${allData[i].date}</td><td>${allData[i].userInput}</td></tr>`
    } 
  }
  catch (error) {
    console.log("error3", error);
  }
};

// Call updateUI so initial load of page will have all old weather Entries
updateUI();