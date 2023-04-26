import './css/styles.css';
import { fetchCountries } from "../src/fetchCountries"
import debounce from "lodash.debounce";
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const inputR = document.querySelector("#search-box");
const countrysList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");


countrysList.style.listStyle = "none";
inputR.style.marginLeft = "40px";

function createCountryCard(arr) {
    return arr.map(({ flags, name, capital, languages, population }) => `<li>
            
    <img src="${flags.svg}" alt="${flags.alt}" width="200">
    <h2>${name.official}</h2>
    <p class="fs">Capital: <span class="ss">${capital}</span></p>
    <p class="fs">Population: <span class="ss">${population}</span></p>
    <p class="fs">Languages: <span class="ss">${Object.values(languages)}</span></p>

    </li>` ).join("");
}

function createCountrysList(arr) {
    return arr.map(({ flags, name }) => `<li>
            
    <img src="${flags.svg}" alt="${flags.alt}" width="200">
    <h2>${name.official}</h2>
    
    </li>` ).join("");
}

inputR.addEventListener("input", debounce(onInputR, DEBOUNCE_DELAY));

function onInputR(event) {
    event.preventDefault();
    const inputValue = event.target.value.toLowerCase().trim();
    if (inputValue === "") {
        countrysList.innerHTML = "";
        return
    } else {
        // if (countryName.includes("inputValue"))
        fetchCountries(inputValue)
        .then((data) => {
            
            if (data.length > 10) {
                countrysList.innerHTML = "";
                Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
            }    
            
            if (data.length === 1) {
                countrysList.innerHTML = "";
                countrysList.insertAdjacentHTML("beforeend", createCountryCard(data))    
            }

            if (data.length >=2  && data.length <= 10) {
                countrysList.innerHTML = "";
                countrysList.insertAdjacentHTML("beforeend", createCountrysList(data))     
            } 
                       
        })
        .catch((err) => 
        Notiflix.Notify.failure("Oops, there is no country with that name"));

    }
     
}

















// const BASE_URL = "https://restcountries.com/#api-endpoints-v3-name"






// const BASE_URL = "https://restcountries.com/#api-endpoints-v3-name"
// const ENDPOIT = "/character"
// const options = {
//     method: "GET",

// }

// fetch(`${BASE_URL}${ENDPOIT}`, options).then(resp => console.log(resp))