const key = "0df647c67bfa4cada4da707178be2d34";

let today,
  threeMonthsAgo,
  genero,
  nextYear = "";

let page = 1;

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

function goToPage(element, newPage){
  const parentElement = element.parentElement
  const links = parentElement.getElementsByClassName('active')
  for(let link of links){
      link.classList.remove('active')
  }
  element.classList.add('active')
  page = newPage
  console.log(page)
/*   const reposta = handleUpdate(e)
  resposta(page) */
  fetchNewGames(page)
}

const fetchNewGames = async (page = '1') => {
  try {
    movieList.innerHTML = `<img src="/img/loading.gif" alt="" />`;
    const response = await fetch(
      `https://api.rawg.io/api/games?key=${key}&dates=${threeMonthsAgo},${today}&ordering=-rating&page=${page}`
    );
    const data = await response.json();
    movieList.innerHTML = "";
    console.log(page);
    fetchGamesList(data);
  } catch (error) {
    console.error(error);
  }
};

const fetchTopGames = async (page = '1') => {
  try {
    movieList.innerHTML = `<img src="/img/loading.gif" alt="" />`;
    const response = await fetch(
      `https://api.rawg.io/api/games?key=${key}&ordering=-added&page=${page}`
    );
    const data = await response.json();
    movieList.innerHTML = "";
    fetchGamesList(data);
  } catch (error) {
    console.error(error);
  }
};

const fetchUpcomingGames = async (page = '1') => {
  try {
    movieList.innerHTML = `<img src="/img/loading.gif" alt="" />`;
    const response = await fetch(
      `https://api.rawg.io/api/games?key=${key}&dates=${today},${nextYear}&ordering=-added&page=${page}`
    );
    const data = await response.json();
    movieList.innerHTML = "";
    fetchGamesList(data);
  } catch (error) {
    console.error(error);
  }
};

const fetchGeneros = async (genero='',page = '1') => {
  try {
    movieList.innerHTML = `<img src="/img/loading.gif" alt="" />`;
    const response = await fetch(
      `https://api.rawg.io/api/games?key=${key}&genres=${genero}&page=${page}`
    );
    const data = await response.json();
    movieList.innerHTML = "";
    fetchGamesList(data);
  } catch (error) {
    console.error(error);
  }
};

const fetchPlataforma = async (plataformaid='',page = '1') => {
  try {
    movieList.innerHTML = `<img src="/img/loading.gif" alt="" />`;
    const response = await fetch(
      `https://api.rawg.io/api/games?key=${key}&platforms=${plataformaid}&page=${page}`
    );
    const data = await response.json();
    movieList.innerHTML = "";
    fetchGamesList(data);

  } catch (error) {
    console.error(error);
  }
};

const fetchTags = async (tagsid='',page = '1') => {
  try {
    movieList.innerHTML = `<img src="/img/loading.gif" alt="" />`;
    const response = await fetch(
      `https://api.rawg.io/api/games?key=${key}&tags=${tagsid}&page=${page}`
    );
    const data = await response.json();
    movieList.innerHTML = "";
    fetchGamesList(data);
  } catch (error) {
    console.error(error);
  }
};
async function ListaGeneros(page = '1') {
  const response = await fetch(`https://api.rawg.io/api/genres?key=${key}&page=${page}`)
  const myJson = await response.json();
  return myJson
}

async function ListaPlataformas(page = '1') {
  const response = await fetch(`https://api.rawg.io/api/platforms?key=${key}&page=${page}`)
  const myJson = await response.json();
  return myJson
}

async function ListaTags(page = '1') {
  const response = await fetch(`https://api.rawg.io/api/tags?key=${key}&page=${page}`)
  const myJson = await response.json();
  return myJson
}
async function ListaStores(page = '1') {
  const response = await fetch(`https://api.rawg.io/api/stores?key=${key}&page=${page}`)
  const myJson = await response.json();
  return myJson
}
async function PrintPlataforma() {
  const response = await ListaPlataformas()
  for(var i=0;i < response.results.length;i++){
    var plataformas = response.results[i].name
    var plataformasid = response.results[i].id
    const newRow = document.createElement('li');
        newRow.innerHTML = 
          ` <a class="btn" onclick="fetchPlataforma('${plataformasid}')" data-name="${plataformas}" href="#">${plataformas}</a>
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
    var tagsid = response.results[i].slug
    const newRow = document.createElement('li');
        newRow.innerHTML = 
          ` <a class="btn" onclick="fetchTags('${tagsid}')" data-name="${tags}" href="#">${tags}</a>
          ` 
    document.querySelector(".tag-container>#tag-list").appendChild(newRow);
  }
}

// // DOM
const buttons = document.querySelectorAll(".btn");
const movieList = document.querySelector(".movie-list");
let movieItem = document.querySelectorAll(".movie-list li");

const handleUpdate = (e) => {
  console.log(e)
  if (!e.target.classList.contains("selected")) {
    // styling
    movieList.innerHTML = "";
    for (let i = 0; i < buttons.length; i++)
      buttons[i].classList.remove("selected");
    e.target.classList.add("selected");

    // fetch data
    if (e.target.dataset.name === "top-games") {
      fetchTopGames();
    }else if (e.target.dataset.name === "upcoming-games") {
      fetchUpcomingGames();
    }
    else if (e.target.dataset.name === "new-games") {
      fetchNewGames();
    }
    else if (e.target.dataset.name === `${genero}`) {
      fetchGeneros();
    }
    else if (e.target.dataset.name === `${tags}`) {
      fetchTags();
    }
    else if (e.target.dataset.name === `${plataforma}`) {
      fetchPlataforma();
    } 
    else {
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
    <li>
    <div class="card">
    <div class="card__image-holder">
      <img class="card__image" src="${e[i].short_screenshots[0].image}" alt="screenshot" />
    </div>
    <div class="card-title">
      <a href="#" class="toggle-info btn">
        <span class="left"></span>
        <span class="right"></span>
      </a>
      <h3>
          <small>${e[i].name}</small>
      </h3>
    </div>
    <div class="card-flap flap1">
      <div class="card-description">
      <span class="released">Lançamento: ${e[i].released}</span> <br>
      <span class="released">Nota: ${e[i].rating}</span>
      <div class="score"></div>
      </div>
      <div class="card-flap flap2">
        <div class="card-actions">
          <a href="#" class="btn">Ler Mais</a>
        </div>
      </div>
    </div>
  </div>
</li>
    `;
    movieItem = document.querySelectorAll(".movie-list li");
    setTimeout(function () {
      movieItem[i].classList.remove("fade");
    }, 100);
  }
    $(document).ready(function () {
    var zindex = 10;
  
    $("div.card").click(function (e) {
      e.preventDefault();
  
      var isShowing = false;
  
      if ($(this).hasClass("show")) {
        isShowing = true;
      }
  
      if ($("div.cards").hasClass("showing")) {
        // a card is already in view
        $("div.card.show").removeClass("show");
  
        if (isShowing) {
          // this card was showing - reset the grid
          $("div.cards").removeClass("showing");
        } else {
          // this card isn't showing - get in with it
          $(this).css({ zIndex: zindex }).addClass("show");
        }
  
        zindex++;
      } else {
        // no cards in view
        $("div.cards").addClass("showing");
        $(this).css({ zIndex: zindex }).addClass("show");
  
        zindex++;
      }
    });
  });  

};

fetchNewGames();
