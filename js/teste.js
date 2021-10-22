const key = "0df647c67bfa4cada4da707178be2d34";

let today,
  threeMonthsAgo,
  genero,
  nextYear = "";

const InitializeDate = () => {
  // Pega data de hoje
  today = new Date().toISOString().slice(0, 10);

  // Calcula três meses atrás, (Jogos Recentes)
  let arrToday = today.split(/[--]/);
  let minusThreeMonths = parseInt(arrToday[1]) - 3;

  if (parseInt(arrToday[2]) > 28) arrToday[2] = parseInt(arrToday[2]) - 3;
  if (minusThreeMonths.toString().length === 1)
    minusThreeMonths = `0${minusThreeMonths}`;

  arrToday[1] = minusThreeMonths;
  threeMonthsAgo = arrToday.join("-");

  // Calcula + Doze Meses (Proximos Jogos) 
  arrToday = today.split(/[--]/);
  if (parseInt(arrToday[2]) > 28) arrToday[2] = parseInt(arrToday[2]) - 3;
  const plusOneYear = parseInt(arrToday[0]) + 1;
  arrToday[0] = plusOneYear;
  nextYear = arrToday.join("-");
};

InitializeDate();

const fetchNewGames = async () => {
  try {
    movieList.innerHTML = `<img src="/img/loading.gif" alt="" />`;
    const response = await fetch(
      `https://api.rawg.io/api/games?key=${key}&dates=${threeMonthsAgo},${today}&ordering=-rating`
    );
    const data = await response.json();
    movieList.innerHTML = "";
    fetchGamesList(data);
  } catch (error) {
    console.error(error);
  }
};

const fetchTopGames = async () => {
  try {
    movieList.innerHTML = `<img src="/img/loading.gif" alt="" />`;
    const response = await fetch(
      `https://api.rawg.io/api/games?key=${key}&ordering=-added`
    );
    const data = await response.json();
    movieList.innerHTML = "";
    fetchGamesList(data);
  } catch (error) {
    console.error(error);
  }
};

const fetchUpcomingGames = async () => {
  try {
    movieList.innerHTML = `<img src="/img/loading.gif" alt="" />`;
    const response = await fetch(
      `https://api.rawg.io/api/games?key=${key}&dates=${today},${nextYear}&ordering=-added`
    );
    const data = await response.json();
    movieList.innerHTML = "";
    fetchGamesList(data);
  } catch (error) {
    console.error(error);
  }
};

const fetchGeneros = async (genero='') => {
  try {
    movieList.innerHTML = `<img src="/img/loading.gif" alt="" />`;
    const response = await fetch(
      `https://api.rawg.io/api/games?key=${key}&genres=${genero}`
    );
    const data = await response.json();
    movieList.innerHTML = "";
    fetchGamesList(data);
  } catch (error) {
    console.error(error);
  }
};

const fetchPlataforma = async (plataformaid='') => {
  try {
    movieList.innerHTML = `<img src="/img/loading.gif" alt="" />`;
    const response = await fetch(
      `https://api.rawg.io/api/games?key=${key}&plataform=${plataformaid}`
    );
    const data = await response.json();
    movieList.innerHTML = "";
    fetchGamesList(data);

  } catch (error) {
    console.error(error);
  }
};

const fetchTags = async (tagsid='') => {
  try {
    movieList.innerHTML = `<img src="/img/loading.gif" alt="" />`;
    const response = await fetch(
      `https://api.rawg.io/api/games?key=${key}&tags=${tagsid}`
    );
    const data = await response.json();
    movieList.innerHTML = "";
    fetchGamesList(data);
  } catch (error) {
    console.error(error);
  }
};
async function ListaGeneros() {
  const response = await fetch(`https://api.rawg.io/api/genres?key=${key}`)
  const myJson = await response.json();
  return myJson
}

async function ListaPlataformas() {
  const response = await fetch(`https://api.rawg.io/api/platforms?key=${key}`)
  const myJson = await response.json();
  return myJson
}

async function ListaTags() {
  const response = await fetch(`https://api.rawg.io/api/tags?key=${key}`)
  const myJson = await response.json();
  return myJson
}

async function PrintPlataforma() {
  const response = await ListaPlataformas()
  for(var i=0;i < response.results.length;i++){
    var plataformas = response.results[i].name
    var plataformasid = response.results[i].id
    var testeplataforma = response.results[i].slug
    const newRow = document.createElement('li');
        newRow.innerHTML = 
          ` <a class="btn" onclick="fetchGeneros('${plataformasid}')" href="#">${plataformas}</a>
          ` 
    document.querySelector(".plataforma-container>#plataforma-list").appendChild(newRow);
  }
} 

async function PrintGeneros() {
  const response = await ListaGeneros()
  for(var i=0;i < response.results.length;i++){
    var genero = response.results[i].name
    var generoid = response.results[i].id
    const newRow = document.createElement('li');
        newRow.innerHTML = 
          ` <a class="btn" onclick="fetchGeneros('${generoid}')" data-name="${genero}" href="#">${genero}</a>
          ` 
    document.querySelector(".genre-container>#genre-list").appendChild(newRow);
  }
}

async function PrintTags() {
  const response = await ListaTags()
  for(var i=0;i < response.results.length;i++){
    var tags = response.results[i].name
    var tagsid = response.results[i].id
    const newRow = document.createElement('li');
        newRow.innerHTML = 
          ` <a class="btn" onclick="fetchGeneros('${tagsid}')" data-name="${tags}" href="#">${tags}</a>
          ` 
    document.querySelector(".tag-container>#tag-list").appendChild(newRow);
  }
}



// // DOM
const buttons = document.querySelectorAll(".btn");
const movieList = document.querySelector(".movie-list");
let movieItem = document.querySelectorAll(".movie-list li");

const handleUpdate = (e) => {
  if (!e.target.classList.contains("selected")) {
    // styling
    movieList.innerHTML = "";
    for (let i = 0; i < buttons.length; i++)
      buttons[i].classList.remove("selected");
    e.target.classList.add("selected");

    // fetch data
    if (e.target.dataset.name === "top-games") {
      fetchTopGames();
    } else if (e.target.dataset.name === "upcoming-games") {
      fetchUpcomingGames();
    }
      else if (e.target.dataset.name === `${genero}`) {
        fetchGeneros();
    }
      else if (e.target.dataset.name === `${tags}`) {
        fetchTags();
      }
      else if (e.target.dataset.name === `${plataforma}`) {
        fetchPlataforma();
    } else {
      fetchNewGames();
    }
  }
};

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", handleUpdate);
}

/* const fetchGamesList = (data) => {
  const e = data.results; // Cada "e" é um objeto contendo infomação de um jogo
  for (let i = 0; i < e.length; i++) {
    movieList.innerHTML += `
    <li class="fade">
      <img
        class="screenshot"
        src="${e[i].short_screenshots[0].image}"
        alt="screenshot of game"
      />
      <div class="game-name">
        <div class="name">${e[i].name}</div>
        <div>
          <span class="released">Lançamento:</span>
          <span class="date">${e[i].released}</span>
        </div>
      </div>
      <div class="score">
      ${e[i].rating}
      </div>
    </li>
    `; 
    movieItem = document.querySelectorAll(".movie-list li");
    setTimeout(function () {
      movieItem[i].classList.remove("fade");
    }, 100);
  }
};*/

const fetchGamesList = (data) => {
  const e = data.results; // Cada "e" é um objeto contendo infomação de um jogo
  for (let i = 0; i < e.length; i++) {
    movieList.innerHTML += `
    <li class="fade">
      <img
        class="screenshot"
        src="${e[i].short_screenshots[0].image}"
        alt="screenshot of game"
      />
      <div class="game-name">
        <div class="name">${e[i].name}</div>
        <div>
          <span class="released">Lançamento:</span>
          <span class="date">${e[i].released}</span>
        </div>
      </div>
      <div class="score">
      ${e[i].rating}
      </div>
    </li>
    `;
    movieItem = document.querySelectorAll(".movie-list li");
    setTimeout(function () {
      movieItem[i].classList.remove("fade");
    }, 100);
  }
};

fetchNewGames();
