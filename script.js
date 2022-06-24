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
const getWeatherData = async (e) => {
    e.preventDefault();
    const search = document.getElementById("search");
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

// getWeatherData("columbia", "SC", "USA");

const form = document.querySelector("form");
const weatherMessage = document.querySelector(".weather-message");
function displayWeatherData(data) {
    console.log(data);
    const [todaysInfo, forecast] = [...data];
    console.log(todaysInfo, forecast);
    weatherMessage.innerHTML = `
	<img src=http://openweathermap.org/img/wn/${todaysInfo.weather[0].icon}@2x.png></img>
	<h2>It's ${todaysInfo.weather[0].description}'s today! </h2>`;
}

form.addEventListener("submit", getWeatherData);
