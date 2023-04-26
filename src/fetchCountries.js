export function fetchCountries(name) {
//    return fetch("https://restcountries.com/v3.1/all?fields=name,capital,population,flags,languages").then(resp => resp.json()).then(data => console.log(data)).catch(err => console.log(err))
return fetch("https://restcountries.com/v3.1/name/?fields=name,capital,population,flags,languages").then(    
    (resp) => {
        if (!resp.ok) {
            throw new Error(resp.statusText);
        }
        return resp.json();
    }
  );
}

 
// fetchCountries()
// .then((data) => {
//     countrysList.insertAdjacentHTML("beforeend", createMarkup(data))
// })
// .catch((err) => console.log(err))


