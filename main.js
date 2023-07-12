import { LAT, LON } from "./commons/constants.js";
import { WeatherModel } from "./models/WeatherModel.js";
import { getWeatherByLatAndLonMetric } from "./services/WeatherService.js";

let ville = "";

const setHtml = (weathers) => {
    let html = `<header><h1>Château-Thierry</h1><hr></header><section id="weathers">`;
    for (const w of weathers) {
        html += `<article>
                <div>${w.date}</div>
                <div>
                    <div>${w.skies[0].description}</div>
                    <div class="meteo__general">
                        <img src="https://openweathermap.org/img/wn/${w.skies[0].icon}@2x.png" alt="">
                        <p>Température : <span>${w.temp}</span>°C</p>
                    </div>
                </div>
                <div class="meteo__temp">
                    <p>Température min : <span>${w.tempMin}</span>°C</p>
                    <p>Ressentie : <span>${w.tempLike}</span>°C</p>
                    <p>Température max : <span>${w.tempMax}</span>°C</p>
                </div>
                <div class="meteo__press-humi">
                    <p>Pression : <span>${w.pressure}</span> hPa</p>
                    <p>Humidité : <span>${w.humidity}</span>%</p>
                </div>
            </article>`
    }
    html += `</section>`;
    return html;
}

navigator.geolocation.getCurrentPosition(position => {
    console.log(position.coords.latitude, position.coords.longitude);


    getWeatherByLatAndLonMetric(LAT, LON)
        .then(data => {
            ville = data["city"]["name"];

            const list = data["list"];
            const weathers = list.map(el => WeatherModel.toWeatherModel(el));

            document.getElementById('app').innerHTML = setHtml(weathers);
        })
});
