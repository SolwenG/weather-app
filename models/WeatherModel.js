import { SkyModel } from "./SkyModel.js";

export class WeatherModel {
    temp = "";
    tempLike = "";
    tempMin = -100;
    tempMax = 100;
    pressure = 0;
    humiditity = 0;
    skies = [];
    date = new Date();

    static toWeatherModel(el) {
        const w = new WeatherModel();
        const main = el["main"];
        if (main) { // (!!main) si rien retourne 'false'
            w.temp = main["temp"] ?? -100;
            w.tempLike = main["feels_like"] ?? -100;
            w.tempMin = main["temp_min"] ?? -100;
            w.tempMax = main["temp_max"] ?? 100;
            w.humiditity = main["humidity"] ?? 0;
            w.pressure = main["pressure"] ?? 0;
        }
        w.date = new Date(el["dt_txt"]);

        const skies = el["weather"];
        if (skies) {
            // w.skies = [];
            // for (const sky of skies) {
            //     const s = new SkyModel(sky["main"], sky["description"], sky["icon"]);
            //     w.skies.push(s);
            // }

            w.skies = skies.map(sky => new SkyModel(sky["main"], sky["description"], sky["icon"]));
        }
        return w;
    }
}