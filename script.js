const APIkey = 'api_key=ab8559030a49bc9f9bceed8f63483db2'
const BASE_URL = 'https://api.themoviedb.org/3'
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + APIkey
const image_url = 'https://image.tmdb.org/t/p/w500'
const search_url = BASE_URL + '/search/movie?' + APIkey
const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')
    // const axios =require('axios')
getMovies(API_URL)


async function getMovies(url) {
    try {
        const response = await axios.get(url)
        showMovies(response.data.results)
    } catch (err) {
        console.log("ERROR 404")
    }
}

function getColor(rating) {
    if (rating < 5) {
        return 'red'
    } else if (rating < 7) {
        return 'orange'
    } else {
        return 'green'
    }
}

function showMovies(results) {
    main.innerHTML = ''

    for (let result of results) {
        const { title, poster_path, vote_average, overview } = result
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')
        movieEl.innerHTML = `
        <img src="${image_url+poster_path}" alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
            <h3>overview</h3>${overview}</div>`

        main.appendChild(movieEl)
    }
}
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const searchTerm = search.value
    if (searchTerm) {
        getMovies(search_url + '&query=' + searchTerm)
    } else {
        getMovies(API_URL)
    }
})