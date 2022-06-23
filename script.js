async function getWeatherData(cityInput, stateInput) {
    getLatLon(cityInput, stateInput);
    const res = await fetch();
}

const getLatLon = async (cityInput, stateInput, countryCode) => {
    try {
        const res = await fetch(
            `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput},${stateInput},${countryCode}&limit=5&appid=b6845236a7811f015dd9b763581a389a`
        );
        const data = await res.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
};

getLatLon("columbia", "SC", "USA");
