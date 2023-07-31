"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API_KEY = "api_key=336ff2d06750b1a068e736a78e81d04f";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = `${BASE_URL}/discover/movie?sort_by=popularity.desc&${API_KEY}`;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchURL = `${BASE_URL}/search/movie?${API_KEY}&query=`;
const cardsDiv = document.querySelector(".cards");
const searchInput = document.querySelector(".form");
const searchBar = document.querySelector(".search-bar");
const main = document.querySelector(".two");
let resultNotFound = 0;
const fetchMoviesList = (() => {
    let timerId;
    return (query) => __awaiter(void 0, void 0, void 0, function* () {
        const url = searchURL + query;
        // Clear the previous timer, if any, before setting a new one
        clearTimeout(timerId);
        // Set a new timer to make the API call after 500 milliseconds (adjust as needed)
        timerId = setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            yield getMovieList(url);
        }), 500); // Set the debounce delay for the API call, e.g., 500 milliseconds
    });
})();
// Event listener for the search bar
searchBar.addEventListener("input", (e) => {
    const value = searchBar.value;
    if (value) {
        fetchMoviesList(value)
            .then(() => {
            // Handle success or other logic here
        })
            .catch((error) => {
            console.error("Error fetching data:", error);
        });
    }
    else {
        getMovieList(API_URL)
            .then(() => {
            // Handle success or other logic here
            searchBar.value = "";
        })
            .catch((error) => {
            console.error("Error fetching data:", error);
        });
    }
});
const getMovieList = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch(url);
        const ApiResponse = yield res.json();
        const { results, total_results } = ApiResponse;
        if (total_results) {
            showMovieList(results);
            main.style.display = "none";
        }
        else {
            main.style.display = "block";
            if (resultNotFound === 0) {
                const divDNF = document.createElement("div");
                divDNF.classList.add("container");
                divDNF.innerHTML = `
          <h2>Sorry, there is no result for the keyword you searched</h2>
          <img src="./img/bg.png" alt="background">
        `;
                main.appendChild(divDNF);
                resultNotFound = 1;
            }
        }
    }
    catch (error) {
        console.error("Error fetching data:", error);
    }
});
getMovieList(API_URL);
const showMovieList = (MoviesData) => {
    cardsDiv.innerHTML = "";
    MoviesData.forEach((movie) => {
        const { title, poster_path } = movie;
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
        cardDiv.style.backgroundImage = `url(${poster_path
            ? IMG_URL + poster_path
            : "http://via.placeholder.com/1080x1580"})`;
        cardDiv.innerHTML = `
      <h3 id="title">${title}</h3>
      <button class="btn">Read More</button>
    `;
        cardsDiv.appendChild(cardDiv);
    });
};
