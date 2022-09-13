const moviesList = $('.js-movies-list');
const moviesCardTemplate = $('#template-element').content;

const searchInput = $('.js-search-input');
const searchSelect = $('.js-search-select');
const searchBtn = $('.js-search-btn');
const elFailTxt = $('.js-fail-txt');

let arr = [];

// render function
function mainFunc() {
    // creating elements for movies list
    let createMovieElement = function (arr) {
        let movieElement = moviesCardTemplate.cloneNode(true);
        movieElement.querySelector('.js-movie-img').src = arr.flags.png;
        movieElement.querySelector('.js-movie-img').alt = arr.name.official;
        movieElement.querySelector('.js-modal-movie-img').src = arr.flags.png;
        movieElement.querySelector('.js-modal-movie-img').alt = arr.name.official;
        movieElement.querySelector('.js-country-title').textContent = arr.name.common;
        movieElement.querySelector('.js-modal-title').textContent = arr.name.official;
        movieElement.querySelector('.js-country-capital').textContent = arr.capital;
        movieElement.querySelector('.js-country-population').textContent = arr.population;
        movieElement.querySelector('.js-country-landlocked').textContent = arr.landlocked;
        movieElement.querySelector('.js-country-region').textContent = arr.region;
        movieElement.querySelector('.js-country-map-link').href = arr.maps.googleMaps;
        movieElement.querySelector('.js-country-independent').textContent = arr.independent;
        movieElement.querySelector('.js-country-status').textContent = arr.status;
        movieElement.querySelector('.js-country-borders').textContent = arr.borders;
        movieElement.querySelector('.js-country-car-sign').textContent = arr.car.signs;
        movieElement.querySelector('.js-country-car-rule').textContent = arr.car.side;
        movieElement.querySelector('.js-country-timezones').textContent = arr.timezones.join(', ');
        movieElement.querySelector('.js-country-start-week').textContent = arr.startOfWeek;

        movieElement.querySelector('.js-modal').id = `exampleModal${arr.area}`;
        movieElement.querySelector('.js-modal-title').id = `exampleModal${arr.area}`;
        movieElement.querySelector('.js-modal-btn').setAttribute('data-bs-target', `#exampleModal${arr.area}`);
    
        return movieElement;
    }

    // render function
    let renderMovies = function (arr) {
        moviesList.innerHTML = null;
        let fragment = document.createDocumentFragment();
    
        arr.forEach(movie => {
            fragment.appendChild(createMovieElement(movie));
        });
        
        moviesList.appendChild(fragment);
    }
    
    renderMovies(arr);
}

// api request
function searchMovies(event) {
    let urlApi = `https://restcountries.com/v3.1/name/${event}`;

    setTimeout(() => {
        moviesList.innerHTML = null;
        mainFunc();
    }, 1000);
    
    fetch(urlApi)
    .then(response => response.json())
    .catch(err => alert(err))
    .then(data => {
        if (data.status === 404) {
            arr = [];
            elFailTxt.classList.remove('d-none');
            return;
        } else {
            elFailTxt.classList.add('d-none');
            arr = data;
            mainFunc();
        }
    })
}

searchInput.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        searchBtn.click();
    }
});

// Search input
searchBtn.onclick = function () {
    let value = searchInput.value.toLowerCase().trim();
    moviesList.innerHTML = null;
    // searchInput.value = null;
    // searchInput.unfocus();

    
    searchMovies(value)
}
// Search input end

const request = fetch('https://restcountries.com/v3.1/name/china').
  then(res => res.json()).
  then(data => console.log(data));