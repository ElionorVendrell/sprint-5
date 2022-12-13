//---> Variables
const apiUrl = "https://icanhazdadjoke.com";
const header: any = {
  headers: { Accept: "application/json" },
};

const mostrarAcudit = <HTMLElement>document.getElementById("acudit");
const mostrarWeather = <HTMLElement>document.getElementById("weather");
const showIcon = <HTMLImageElement>document.getElementById("icon");
const boton: NodeListOf<HTMLButtonElement> = document.querySelectorAll(".btn");

let currentJoke: string = "";
const reportAcudits: { joke: string; score: number; date: string }[] = [];

const d = new Date();
let date: string = d.toISOString();

//---> 1a API Jokes
const showJokes = async () => {
  boton.forEach((e) => (e.disabled = false));
  const response = await (await fetch(apiUrl, header)).json();
  currentJoke = response.joke;
  mostrarAcudit.innerHTML = currentJoke;
  console.log(`api1 ${response.joke}`);
};

//---> 2a API Jokes (Chuk Norris)
const showChuckNorrisJokes = async () => {
  boton.forEach((e) => (e.disabled = false));
  const response = await (
    await fetch("https://api.chucknorris.io/jokes/random")
  ).json();
  currentJoke = response.value;
  mostrarAcudit.innerHTML = currentJoke;
  console.log(`api2 ${response.value}`);
};

//---> Mostrar acudit alternant API
let bool: boolean = true;
const alterna = () => {
  bool ? showJokes() : showChuckNorrisJokes();
  bool = !bool;
};

//---> Puntuar acudits i mostrar per consola (puntuar només una vegada l'acudit)
function getScore(id: number) {
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

(async () => {
  const { latitude, longitude } = await (await fetch(url)).json();
  const weatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=b806aa9af1c4278561101712e94879ed&lang=ca&units=metric`;
  const json = await (await fetch(weatherApi)).json();

  const lugar = json.name;
  const temp = json.main.temp;
  const icon = json.weather[0].icon;
  const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  showIcon.src = iconUrl;

  mostrarWeather.innerHTML = `${lugar} ${Math.round(temp)} ºC`;
})();
