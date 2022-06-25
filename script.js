const getLatLon = async (cityInput, stateInput, countryCode) => {
    try {
        const res = await fetch(
            `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput},${stateInput},${countryCode}&limit=1&appid=b6845236a7811f015dd9b763581a389a`,
            { mode: "cors" }
        );
        const data = await res.json();
        return [data[0].lat, data[0].lon];
    } catch (error) {
        console.log(error);
    }
};
const search = document.getElementById("search");
const getWeatherData = async (e) => {
    e.preventDefault();

    const [cityInput, stateInput, countryCode] = [...search.value.split(",")];
    try {
        const [lat, lon] = await getLatLon(cityInput, stateInput, countryCode);
        const todayInfoRes = fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=b6845236a7811f015dd9b763581a389a`,
            { mode: "cors" }
        );
        const forecastRes = fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=b6845236a7811f015dd9b763581a389a`,
            { mode: "cors" }
        );

        const res = await Promise.all([todayInfoRes, forecastRes]);

        const todayInfo = await res[0].json();
        const forecastInfo = await res[1].json();

        console.log(todayInfo, forecastInfo);
        const dataValues = [todayInfo, forecastInfo];
        displayWeatherData(dataValues);
    } catch (error) {
        console.log(error);
    }
};

const form = document.querySelector("form");
const weatherMessage = document.querySelector(".weather-message");
const todayDetails = document.querySelector(".today-details");
function displayWeatherData(data) {
    console.log(data);
    const [todaysInfo, forecast] = [...data];
    console.log(todaysInfo, forecast);

    weatherMessage.innerHTML = `
		<img src=http://openweathermap.org/img/wn/${
            todaysInfo.weather[0].icon
        }@2x.png></img>
		<h2>${capitalizeFirstLetter(
            todaysInfo.weather[0].description
        )} in ${capitalizeFirstLetter(search.value.split(",")[0])}!</h2>`;

    todayDetails.innerHTML = `
		<h2>Today's Details</h2>
		<p>Feels like: <span>${todaysInfo.main.feels_like}&#8457</span></p> 
		<p>Temperature: <span>${todaysInfo.main.temp}&#8457</span></p> 
		<p>Min Temp: <span>${todaysInfo.main.temp_min}&#8457</span></p> 
		<p>Max Temp: <span>${todaysInfo.main.temp_max}&#8457</span></p> 
		<p>Humidity: <span>${todaysInfo.main.humidity}%</span></p>
	`;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

form.addEventListener("submit", getWeatherData);
