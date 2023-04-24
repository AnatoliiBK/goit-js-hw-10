import './css/styles.css';
import { fetchCountries } from "../src/fetchCountries"
import debounce from "lodash.debounce";

const DEBOUNCE_DELAY = 300;
const inputR = document.querySelector("#search-box");
const countrysList = document.querySelector(".country-list");
const countryInfo =document.querySelector(".country-info");

countrysList.style.listStyle = "none";
inputR.style.marginLeft = "40px";

function createMarkup (arr) {
    return arr.map(({ flags, name, capital, languages, population }) => `<li>
            
    <img src="${flags.svg}" alt="${flags.alt}" width="200">
    <h2>${name.official}</h2>
    <p>${capital}</p>
    <p>${Object.values(languages)}</p>
    <p>${population}</p>
    </li>` ).join("");
}

// fetchCountries()
// .then((data) => {
//     countrysList.insertAdjacentHTML("beforeend", createMarkup(data))
// })
// .catch((err) => console.log(err))

inputR.addEventListener("input", debounce(onInputR, DEBOUNCE_DELAY));

function onInputR(event) {
    event.preventDefault();
    const inputValue = event.target.value.trim();
    fetchCountries(inputValue)
        .then((data) => {
            countrysList.insertAdjacentHTML("beforeend", createMarkup(data))
        })
        .catch((err) => console.log(err));

    if (inputValue === "") {
        countrysList.innerHTML = "";
        removeEventListener("input", debounce(onInputR, DEBOUNCE_DELAY))
    } 
}

















// const BASE_URL = "https://restcountries.com/#api-endpoints-v3-name"






// const BASE_URL = "https://restcountries.com/#api-endpoints-v3-name"
// const ENDPOIT = "/character"
// const options = {
//     method: "GET",

// }

// fetch(`${BASE_URL}${ENDPOIT}`, options).then(resp => console.log(resp))