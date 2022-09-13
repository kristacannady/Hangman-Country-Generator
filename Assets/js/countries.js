let searchBtn = document.getElementById("search-btn");
let countryInp = document.getElementById("country-inp");

async function search(countryName) {
    let countryCard = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
    var capitalUrl = 'https://countriesnow.space/api/v0.1/countries/capital';

    try {
        var countryData = await fetch(countryCard);
        var data = await countryData.json();

        var capitalDataRes = await fetch(capitalUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                country: countryName
            })
        });

        var capitalData = await capitalDataRes.json();

        result.innerHTML = `
    <img src="${data[0].flags.svg}" class="flag-img">
    <h2>${data[0].name.common}</h2>
    <div class="wrapper">
        <div class="data-wrapper">
            <h4>Capital:</h4>
            <span>${capitalData.data.capital}</span>
        </div>
    <div class="wrapper">
        <div class="data-wrapper">
            <h4>Currency:</h4>
            <span>${data[0].currencies[Object.keys(data[0].currencies)].name
            } - ${Object.keys(data[0].currencies)[0]}</span>
        </div>
    </div>
     <div class="wrapper">
        <div class="data-wrapper">
            <h4>Common Language:</h4>
            <span>${Object.values(data[0].languages)
                .toString()
                .split(",")
                .join(", ")}</span>
        </div>
    </div>
    `;


    } catch (err) {
        console.log(err);
    }
}

searchBtn.addEventListener("click", () => {
    let countryName = countryInp.value;
    search(countryName);
});

function lookForLocalStorage() {
    var answer = localStorage.getItem('answer');

    if (!answer) return;

    search(answer);

    localStorage.removeItem('answer');

}

lookForLocalStorage();