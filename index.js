const API_URl = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=f807dcfcc42e16bc9b4f4ecb4ae326b6&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=f807dcfcc42e16bc9b4f4ecb4ae326b6&query="';

const form = document.querySelector('#form');
const search = document.querySelector('#search');
const main = document.querySelector('#main');
const moreMovies = document.querySelector('.moreMovies');

getMovies(API_URl)

async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();

    showMovies(data.results);
    moreMovies.classList.remove('hideBtn');
    document.querySelector('.homeBtn').classList.remove('show-btn');
}

function showMovies(movies) {
    main.innerHTML = '';
    
    movies.forEach(movie => {
        const {title, poster_path, vote_average, overview, backdrop_path} = movie;    

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        
        <img src="${IMG_PATH + poster_path}" alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}"> <i class="fas fa-star"></i> ${vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
            <p>${overview}</p>
        </div>
        `;
        main.appendChild(movieEl);
    });
}

function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green'
    } else if(vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)
        search.value = '';
    } else {
        window.location.reload;
    }
});

let currPage = 2;

async function fetchMoreMovies() {
    main.innerHTML = '';
    currPage++;
    if(currPage > 5) {
        currPage = 1;
    }
    const nextUrl = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=f807dcfcc42e16bc9b4f4ecb4ae326b6&page=${currPage}`;
    const response = await fetch(nextUrl);
    const info = await response.json();

    showMovies(info.results)
}

async function fetchBack() {
    main.innerHTML = '';
    currPage--;
    if(currPage <= 1) {
        currPage = 1;
    }
    const prevUrl = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=f807dcfcc42e16bc9b4f4ecb4ae326b6&page=${currPage}`;
    const response = await fetch(prevUrl);
    const info = await response.json();

    showMovies(info.results)
}   
