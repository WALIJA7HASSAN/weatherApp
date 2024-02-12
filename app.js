// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// with values
// https://api.openweathermap.org/data/2.5/weather?units=metric&q=islamabad&appid=baa15ac75026e8c0c7d2b8fed1275c5b
const Url="https://api.openweathermap.org/data/2.5/weather?units=metric";
const apiKey="baa15ac75026e8c0c7d2b8fed1275c5b";
// combo of url and key(for security of api)

// function to get the element
function getElement(selection){
    const element=document.querySelector(selection);
    if(element){
        return element;
    }
    else{
        throw Error('element doesnot exist');
    }
}

const searchInput=getElement('.search-input');
const searchBtn=getElement('.search-btn');
const weatherImg=getElement('.weather-img');
const Domtemp=getElement('.temp');
const city=getElement('.city');
const weatherdesc=getElement('.weather-desc');
const wind=getElement('.wind');
const DomHumidity=getElement('.humidity');
// const card=getElement('.card');
const LocBtn=getElement('.loc-btn');

const checkWeather=async(loc)=>{
    try {
        const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${loc}&appid=baa15ac75026e8c0c7d2b8fed1275c5b`)
        const data=await response.json();
        const {weather: [{ description, main }],
    main: { temp, humidity },
    wind: { speed },
    name
  }=data
weatherdesc.textContent=description;
city.textContent=name;
DomHumidity.textContent=humidity;
wind.textContent=speed;
Domtemp.textContent=Math.round(temp)+'°c';

// Add the appropriate class based on the weather condition
switch (main) {
    case 'Clear':
        weatherImg.src='./images/sun.png';
        break;
    case 'Clouds':
        weatherImg.src='./images/cloudy.png';
        break;
    case 'Rain':
    case 'Drizzle':
        weatherImg.src='./images/rain.png';
        break;
    case 'Snow':
        weatherImg.src='./images/snow.png';
        break;
    case 'Thunderstorm':
        weatherImg.src='./images/storm.png';
        break;
    default:
        // Use a default icon or handle other weather conditions
        weatherImg.src='./images/sun(1).png';
        break;
}
// if(main.toLowerCase().includes('cloud')){
//     card.classList.remove('bg-yellow-400');
//     card.classList.add('bg-blue-600');
//     }
//     else{
//         card.classList.add('bg-yellow-400');
//         card.classList.remove('bg-blue-600');
//     }
    } catch (error) {
        console.error("Error fetching data",error);
    }
    
}

searchBtn.addEventListener('click',()=>{
    checkWeather(searchInput.value);
})

LocBtn.addEventListener('click',()=>{
    const geoApi="da6fe7bffc4742fa973debda203f00b8";
// using api to get city location
if("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition(function(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    // Use latitude and longitude to fetch city name from a geocoding service
    // This example uses OpenCage Geocoding API
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${geoApi}`)
        .then(response => response.json())
        .then(data => {
            const geocity = data.results[0].components.city;
            console.log("City:", geocity);
            checkWeather(geocity);
        })
        .catch(error => console.error("Error fetching city:", error));
    })
}
else{
    console.log("Geolocation is not supported by this browser.");
}
})