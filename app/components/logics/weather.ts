const OPEN_WEATHER_API = process.env.NEXT_PUBLIC_WEATHER;
// const WEATHER_BIT_API = import.meta.env.VITE_WEATHERBIT_API;


export async function getLocationFromIPInfo() {
    try {
        const response = await fetch("https://ipinfo.io/json");
        const data = await response.json();
        // console.log(data)
        return data
    } catch (error) {
        console.warn("IPInfo geolocation error:", error);
    }
};


export async function getCurrentOpenWeather(lat: string, lon: string) {
    if (lat && lon) {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API}`
                // `https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=${OPEN_WEATHER_API}`
            );
            const data = await response.json();
            return data
            // console.log(data)
        } catch (error) {
            console.warn("OpenWeatherMap error:", error);
        }
    }
}
export async function getCurrentOpenWeather2() {
    var lat: number | undefined, lon: number | undefined;

    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    };

    function success(pos: any) {
        const crd = pos.coords;
        lat = crd.latitude;
        lon = crd.longitude;
    }

    function error(err: any) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);

    setTimeout(async function () {
        if (lat && lon) {
            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API}`
                );
                const data = await response.json();
                console.log(data); // Do something with the data here
            } catch (error) {
                console.warn("OpenWeatherMap error:", error);
            }
        }
    }, 5000);
}





// async function getCurrentWeatherBit(
//   currentLocation,
//   weatherData,
//   setWeatherData
// ) {
//   try {
//     const response = await fetch(
//       `https://api.weatherbit.io/v2.0/current?lat=${currentLocation.lat}&lon=${currentLocation.lon}&key=${WEATHER_BIT_API}`
//     );

//     const incoded = await response.json();
//     const data = incoded.data[0];
//     setWeatherData({
//       city: data.city_name,
//       country: data.country_code,
//       sunrise: data.sunrise,
//       sunset: data.sunset,
//       temp_min: null,
//       temp_max: null,
//       temp: data.temp,
//       visibility: null,
//       humidity: null,
//       pressure: data.pres,
//       feels_like: null,
//       weather: data.weather,
//       wind_speed: data.wind_spd,
//       uv: data.uv,
//       aqi: data.aqi,
//     });
//     return data;
//     // console.log(data)
//   } catch (error) {
//     console.warn("WeatherBit error:", error);
//   }
// }

// async function GetHourlyForecast(
//   currentLocation,
//   hourlyForecast,
//   setHourlyForecast
// ) {
//   if (currentLocation.lat && currentLocation.lon){
//     try {
//     const responsey = await fetch(
//       `https://api.weatherbit.io/v2.0/forecast/hourly?lat=${currentLocation.lat}&lon=${currentLocation.lon}&key=${WEATHER_BIT_API}`
//     );
//     const data = await responsey.json();
//     console.log(data)
//     setHourlyForecast(
//       data.data.filter(
//         (item) =>
//           new Date(item.timestamp_local).toDateString() ==
//           new Date().toDateString()
//       )
//     );
//   } catch (error) {
//     console.warn("error while trying to get hourly forecast:", error)
//   }} else {
//     console.warn("Current location not found")
//   }}


// async function GetDailyForecast(
//   currentLocation,
//   dailyForecast,
//   setDailyForecast
// ) {
//   if (currentLocation.lat && currentLocation.lon){
//   try {
//     const responsez = await fetch(
//       `https://api.weatherbit.io/v2.0/forecast/daily?lat=${currentLocation.lat}&lon=${currentLocation.lon}&key=${WEATHER_BIT_API}`
//     );
//     const data = await responsez.json();
//     console.log(data)
//     setDailyForecast(data.data.slice(0, 7));
//   } catch (error) {
//     console.warn("error while trying to get daily forecast:", error);
//   }
//   } else {
//     console.warn("Current location not found")
//   }}

// export {
//   getLocationFromIPInfo,
//   getCurrentOpenWeather,
//   getCurrentWeatherBit,
//   GetHourlyForecast,
//   GetDailyForecast,
// };
