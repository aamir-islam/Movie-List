interface Movie {
  poster_path: string;
  title: string;
}
interface ApiResponse {
  results: Movie[];
  total_results: number;
}

const API_KEY = "api_key=336ff2d06750b1a068e736a78e81d04f";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = `${BASE_URL}/discover/movie?sort_by=popularity.desc&${API_KEY}`;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchURL = `${BASE_URL}/search/movie?${API_KEY}&query=`;

const cardsDiv = document.querySelector(".cards")! as HTMLDivElement;
const searchInput = document.querySelector(".form")! as HTMLFormElement;
const searchBar = document.querySelector(".search-bar")! as HTMLInputElement;
const main = document.querySelector(".dataNoteFound")! as HTMLDivElement;

const fetchMoviesList = (() => {
  let timerId: ReturnType<typeof setTimeout>;

  return async (query: string): Promise<void> => {
    const url = searchURL + query;

    // Clear the previous timer, if any, before setting a new one
    clearTimeout(timerId);

    // Set a new timer to make the API call after 500 milliseconds (adjust as needed)
    timerId = setTimeout(async () => {
      await getMovieList(url);
    }, 500); // Set the debounce delay for the API call, e.g., 500 milliseconds
  };
})();

// Event listener for the search bar
searchBar.addEventListener("input", (e: Event) => {
  const value = searchBar.value;
  if (value) {
    fetchMoviesList(value)
      .then(() => {
        // Handle success or other logic here
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  } else {
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

const getMovieList = async (url: string): Promise<void> => {
  try {
    const res = await fetch(url);
    const ApiResponse: ApiResponse = await res.json();
    const { results, total_results } = ApiResponse;

    if (total_results) {
      showMovieList(results);
      cardsDiv.style.display = "flex";
      main.style.display = "none";
    } else {
      main.style.display = "block";
      cardsDiv.style.display = "none";
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

getMovieList(API_URL);

const showMovieList = (MoviesData: Movie[]): void => {
  cardsDiv.innerHTML = "";
  MoviesData.forEach((movie) => {
    const { title, poster_path } = movie;
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.style.backgroundImage = `url(${
      poster_path
        ? IMG_URL + poster_path
        : "http://via.placeholder.com/1080x1580"
    })`;
    cardDiv.innerHTML = `
      <h3 id="title">${title}</h3>
      <button class="btn">Read More</button>
    `;
    cardsDiv.appendChild(cardDiv);
  });
};
