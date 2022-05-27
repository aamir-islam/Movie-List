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
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchURL = BASE_URL + "/search/movie?" + API_KEY + "&query=";
const cardsDiv = document.querySelector(".cards");
const searchInput = document.querySelector(".form");
const searchBar = document.querySelector(".search-bar");
const main = document.querySelector(".two");
//
// const test = document.querySelector('a')!;
var temp = 0;
searchInput.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = searchBar.value;
    if (value) {
        getMovie(searchURL + value);
    }
    else {
        getMovie(API_URL);
        searchBar.value = '';
    }
});
function getMovie(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(url);
        const data = yield res.json();
        const result = data.results;
        if (result) {
            showMovie(result);
            main.style.display = "none";
        }
        if (result.length === 0) {
            main.style.display = "block";
            const divDNF = document.createElement("div");
            divDNF.classList.add("container");
            divDNF.innerHTML = `
      <h2>Sorry,there is no result for keyword you searched</h2>
      <img src="bg.png" alt="background">
      `;
            if (temp === 0) {
                main.appendChild(divDNF);
                temp = 1;
            }
        }
    });
}
getMovie(API_URL);
function showMovie(data) {
    cardsDiv.innerHTML = "";
    data.forEach((movie) => {
        const { title, poster_path } = movie;
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
        cardDiv.style.backgroundImage = `url(${poster_path
            ? IMG_URL + poster_path
            : "http://via.placeholder.com/1080x1580"})`;
        cardDiv.innerHTML = `
      <h3  id="title" >${title}</h3>
      <button class="btn" > Read More </button>
      `;
        cardsDiv.appendChild(cardDiv);
    });
}
