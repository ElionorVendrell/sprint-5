"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//---> Variables
const apiUrl = "https://icanhazdadjoke.com";
const header = {
    headers: { Accept: "application/json" },
};
const mostrarAcudit = document.getElementById("acudit");
const mostrarWeather = document.getElementById("weather");
const showIcon = document.getElementById("icon");
const boton = document.querySelectorAll(".btn");
let currentJoke = "";
const reportAcudits = [];
const d = new Date();
let date = d.toISOString();
//---> 1a API Jokes
const showJokes = () => __awaiter(void 0, void 0, void 0, function* () {
    boton.forEach((e) => (e.disabled = false));
    const response = yield (yield fetch(apiUrl, header)).json();
    currentJoke = response.joke;
    mostrarAcudit.innerHTML = currentJoke;
    console.log(`api1 ${response.joke}`);
});
//---> 2a API Jokes (Chuk Norris)
const showChuckNorrisJokes = () => __awaiter(void 0, void 0, void 0, function* () {
    boton.forEach((e) => (e.disabled = false));
    const response = yield (yield fetch("https://api.chucknorris.io/jokes/random")).json();
    currentJoke = response.value;
    mostrarAcudit.innerHTML = currentJoke;
    console.log(`api2 ${response.value}`);
});
//---> Mostrar acudit alternant API
let bool = true;
const alterna = () => {
    bool ? showJokes() : showChuckNorrisJokes();
    bool = !bool;
};
//---> Puntuar acudits i mostrar per consola (puntuar només una vegada l'acudit)
function getScore(id) {
    reportAcudits.push({
        joke: currentJoke,
        score: id,
        date: date,
    });
    boton.forEach((e) => (e.disabled = true));
    console.log(reportAcudits);
}
//---> Mostrar el temps
const url = "https://ipapi.co/json/";
(() => __awaiter(void 0, void 0, void 0, function* () {
    const { latitude, longitude } = yield (yield fetch(url)).json();
    const weatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=b806aa9af1c4278561101712e94879ed&lang=ca&units=metric`;
    const json = yield (yield fetch(weatherApi)).json();
    const lugar = json.name;
    const temp = json.main.temp;
    const icon = json.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    showIcon.src = iconUrl;
    mostrarWeather.innerHTML = `${lugar} ${Math.round(temp)} ºC`;
}))();
