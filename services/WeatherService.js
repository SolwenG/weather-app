import { URL } from "../commons/constants.js";

const getWeatherByLatAndLonMetric = async (lat, lon) => {
    const url = `${URL}&lon=${lon}&lat=${lat}`;
    const resp = await fetch(url);
    if (resp.status === 200) {
        return await resp.json();
    }
    throw new Error(`Erreur réponse. Status : ${resp.status}.`)
}

export {
    getWeatherByLatAndLonMetric
};

