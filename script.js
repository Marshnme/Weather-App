const getLatLon = async (cityInput, stateInput, countryCode) => {
    try {
        const res = await fetch(
            `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput},${stateInput},${countryCode}&limit=1&appid=b6845236a7811f015dd9b763581a389a`
        );
        const data = await res.json();
        // console.log(data);
        return [data[0].lat, data[0].lon];
    } catch (error) {
        console.log(error);
    }
};

async function getWeatherData(cityInput, stateInput, countryCode) {
    try {
        const [lat, lon] = await getLatLon(cityInput, stateInput, countryCode);

        const todayInfoRes = fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=b6845236a7811f015dd9b763581a389a`
        );
        const forecastRes = fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=b6845236a7811f015dd9b763581a389a`
        );

        const res = await Promise.all([todayInfoRes, forecastRes]);

        const todayInfo = await res[0].json();
        const forecastInfo = await res[1].json();

        console.log(todayInfo, forecastInfo);
        return [todayInfo.value, forecastInfo.value];
    } catch (error) {
        console.log(error);
    }
}

// getWeatherData("columbia", "SC", "USA");
