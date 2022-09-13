const countryList = $('.js-country-list');
const elCountryCardTemplate = $('#template-element').content;

const elSearchInput = $('.js-search-input');
const elSearchBtn = $('.js-search-btn');
const elFailTxt = $('.js-fail-txt');

let arr = [];

// render function
function mainFunc() {
    // creating elements for country list
    let createCountryElement = function (arr) {
        let countryElement = elCountryCardTemplate.cloneNode(true);
        countryElement.querySelector('.js-country-img').src = arr.flags.png;
        countryElement.querySelector('.js-country-img').alt = arr.name.official;
        countryElement.querySelector('.js-modal-country-img').src = arr.flags.png;
        countryElement.querySelector('.js-modal-country-img').alt = arr.name.official;
        countryElement.querySelector('.js-country-title').textContent = arr.name.common;
        countryElement.querySelector('.js-modal-title').textContent = arr.name.official;
        countryElement.querySelector('.js-country-capital').textContent = arr.capital;
        countryElement.querySelector('.js-country-population').textContent = arr.population;
        countryElement.querySelector('.js-country-landlocked').textContent = arr.landlocked;
        countryElement.querySelector('.js-country-region').textContent = arr.region;
        countryElement.querySelector('.js-country-map-link').href = arr.maps.googleMaps;
        countryElement.querySelector('.js-country-independent').textContent = arr.independent;
        countryElement.querySelector('.js-country-status').textContent = arr.status;
        if (arr.borders === undefined) {
            countryElement.querySelector('.js-country-borders').textContent = 'No borders';
        } else {
            countryElement.querySelector('.js-country-borders').textContent = arr.borders.join(', ');
        }
        countryElement.querySelector('.js-country-car-sign').textContent = arr.car.signs;
        countryElement.querySelector('.js-country-car-rule').textContent = arr.car.side;
        countryElement.querySelector('.js-country-timezones').textContent = arr.timezones.join(', ');
        countryElement.querySelector('.js-country-start-week').textContent = arr.startOfWeek;

        countryElement.querySelector('.js-modal').id = `exampleModal${arr.area}`;
        countryElement.querySelector('.js-modal-title').id = `exampleModal${arr.area}`;
        countryElement.querySelector('.js-modal-btn').setAttribute('data-bs-target', `#exampleModal${arr.area}`);
    
        return countryElement;
    }

    // render function
    let renderCountries = function (arr) {
        countryList.innerHTML = null;
        let fragment = document.createDocumentFragment();
    
        arr.forEach(country => {
            fragment.appendChild(createCountryElement(country));
        });
        
        countryList.appendChild(fragment);
    }
    
    renderCountries(arr);
}

// api request
function searchMovies(event) {
    let urlApi = `https://restcountries.com/v3.1/name/${event}`;

    setTimeout(() => {
        countryList.innerHTML = null;
        mainFunc();
    }, 1000);
    
    fetch(urlApi)
    .then(response => response.json())
    .catch(err => console.log(err))
    .then(data => {
        if (data.status === 404) {
            arr = [];
            elFailTxt.classList.remove('d-none');
            return;
        } else {
            elSearchInput.blur();
            elFailTxt.classList.add('d-none');
            arr = data;
            mainFunc();
        }
    })
}
// Search input enter
elSearchInput.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        elSearchBtn.click();
    }
});

// Search btn click
elSearchBtn.onclick = function () {
    let value = elSearchInput.value.toLowerCase().trim();
    if (value === '') {
        elSearchInput.value = null;
        return;
    } else {
    countryList.innerHTML = null;
    elSearchInput.value = null;
    // elSearchInput.blur();

    searchMovies(value)
    }
}