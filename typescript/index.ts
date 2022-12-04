const apiUrl = "https://icanhazdadjoke.com";
const header: any = {
  method: "GET",
  headers: {
    Accept: "application/json",
  },
};

const show = async () => {
  const response = await fetch(apiUrl, header);
  const data = await response.json();
  const joke: string = data.joke;
  console.log(joke); // no funciona
  //document.getElementById("acudit").innerHTML = joke;
  return joke;
};

/* reportAcudits{

    joke: "...",
  
    score: 1,
  
    date: ...
  
  
  } */
