//variables
const urlBase = "https://api.punkapi.com/v2/beers?page="
const beersDiv = document.querySelector(".beers")
const filterAbv = document.querySelector("#filterABV")
const filterIbu = document.querySelector("#filterIBU")
const pageNum = document.querySelector("#pageNumber")
const PrevPage = document.querySelector("#prevPage")
const nextPage = document.querySelector("#nextPage")
let optionsABV = '', optionsIBU = '', page = 1;

//filters
filterAbv.addEventListener("change", e => {
    const value = e.target.value

    switch (value) {
        case "all":
            optionsABV = "";
            break
        case "weak":
            optionsABV = "&abv_lt=4.6"
            break
        case "medium":
            optionsABV = "&abv_gt=4.5&abv_lt=7.6"
            break
        case "strong":
            optionsABV = "&abv_gt=7.5"
            break
    }

    page = 1;
    getBeer()
})

filterIbu.addEventListener("change", e => {
    const value = e.target.value

    switch (value) {
        case "all":
            optionsIBU = "";
            break
        case "weak":
            optionsIBU = "&ibu_lt=35"
            break
        case "medium":
            optionsIBU = "&ibu_gt=34&ibu_lt=75"
            break
        case "strong":
            optionsIBU = "&ibu_gt=74"
            break
    }

    page = 1
    getBeer()
})

//getting Beers from the api
async function getBeer() {
    //url
    const url = urlBase + page + optionsABV + optionsIBU;

    //fetch
    const beerJson = await fetch(url)
    const beers = await beerJson.json()
    let beersHtml = ""
    const genericBottle = 'https://cdn.pixabay.com/photo/2014/12/22/00/04/bottle-576717_960_720.png'
    //pagination
    pageNum.innerText = page

    if (page === 1) {
        PrevPage.disabled = true
    } else {
        PrevPage.disabled = false
    }

    if (beers.length < 25) {
        nextPage.disabled = true
    } else {
        nextPage.disabled = false
    }


    //render beer data
    beers.forEach((beer) => {
        beersHtml += `
            <div class="beer-wrapper card">
                <div class="beer">
                    <img class="beer__img" src="${beer.image_url ? beer.image_url : genericBottle}">
                    <h3>${beer.name}</h3>
                    <span class="beer__info">
                        <span>ABV: ${beer.abv} %</span>
                        <span>IBU: ${beer.ibu}</span>
                    </span>
                </div>  
                <div class="beer__content">
                    <div class="beer__name">
                        ${beer.name}
                    </div>
                    <div class="beer__tagline">
                            ${beer.tagline}
                    </div>
                    <div class="beer__description">
                            ${beer.description}
                    </div>
                    <div class="beer__food-pairing">
                            Pair with: ${beer.food_pairing.join(", ")}
                    </div>
                </div>  
            </div>
        `
    })
    beersDiv.innerHTML = beersHtml
}


//pagination
PrevPage.addEventListener('click', () => {
    page--
    getBeer()
})

nextPage.addEventListener('click', () => {
    page++
    getBeer()
})

//init get
getBeer()