const API_KEY = "54cc6b3b7e7083ef65173952e476ef6c";
const weatherPic = document.querySelector(".weather-pic");
const glow = document.querySelector(".weather-flex-box");
let currentGlow = glow.classList[1];
const weatherData = [document.querySelector("#temp"), document.querySelector("#feels-like")];
const locationData = document.querySelector(".weather-location");
const clearPage = document.querySelector("#clear-btn");

function makeQueryUrl(city) {
  return `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
}

function updateUI(temp, feelsLike, loc) {
  setWeatherPic(temp);
  setGlow(temp);
  setWeatherDesc(temp, feelsLike);
  setLocation(loc);
  glow.style.removeProperty('display');
  clearPage.style.removeProperty('display');
}

/* Helper Functions for Updating UI */
function setGlow(temp) {
  console.log(currentGlow);
  glow.classList.toggle(currentGlow);

  if (temp < 0) {
    currentGlow = "cool-box";
  } else if (temp < 15) {
    currentGlow = "cloudy-box";
  } else {
    currentGlow = "warm-box";
  }
  console.log(currentGlow);
  glow.classList.toggle(currentGlow);
}

function setWeatherPic(temp){
  if (temp > 0) {
    weatherPic.innerHTML = `<img src="style/images/HOT.png">`;
  } else {
    weatherPic.innerHTML = `<img src="style/images/COLD.png">`;
  }
}

function setWeatherDesc(temp, feelsLike) {
  weatherData[0].innerHTML = temp;
  weatherData[1].innerHTML = feelsLike;
}

function setLocation(loc) {
  locationData.innerHTML = loc;
}


async function getWeatherData(API_REQUEST) {
  const res = await fetch(API_REQUEST);
  try {
    console.log("Grabbing Data");
    const data = await res.json();
    console.log(data)
    const temp = Math.ceil(data.main.temp);
    console.log(`Temp: ${temp}`);
    const feelsLike = Math.ceil(data.main.feels_like);
    console.log(`Feels Like: ${feelsLike}`);
    const location = data.name + ", " + data.sys.country
    console.log(`Location: ${location}`)
    updateUI(temp, feelsLike, location);
    return data;
  } 
  catch (error){
    console.log("error", error);
  }
}

const weather_input = document.getElementById("input-location");
weather_input.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    console.log(`Grabbing Weather Data for ${weather_input.value}`);
    getWeatherData(makeQueryUrl(weather_input.value));
    postData('/addWeather', {location: weather_input.value});
  }
})

/* clear page */
function clearData() {
  glow.style.display = "none"
  clearPage.style.display = "none";
}

clearPage.addEventListener("click", () => {
  clearData();
});

/* Function to POST data */
const postData = async ( url = '', data = {})=>{
  console.log(data)
    const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try {
      const newData = await response.json();
      // console.log(newData);
      return newData
    }catch(error) {
    console.log("error", error);
    // appropriately handle the error
    }
}
