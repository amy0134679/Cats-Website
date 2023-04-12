import { TMDB_API_KEY } from "./key.js";

const cartContents = new Set();

const getTMDBData = async (url) => {
  return (await axios.get(url)).data;
};

const createMovieTile = (id, poster, title, date, description) => {
  const tile = document.createElement("div");
  const details = document.createElement("div");
  const img = document.createElement("img");
  const h1 = document.createElement("h1");
  const h3 = document.createElement("h3");
  const h4 = document.createElement("h4");
  const trailerButton = document.createElement("button");

  tile.classList.add("tile");
  img.src = `https://image.tmdb.org/t/p/w500/${poster}`;
  h1.innerText = title;
  h3.innerText = date;
  h4.innerText = description;
  trailerButton.innerText = "Trailer";

  const movies = document.getElementById("movies");

  details.append(h1);
  details.append(h3);
  details.append(h4);

  tile.append(img);
  tile.append(details);
  tile.append(trailerButton);

  return tile;
};

// const movieID = ["568160", "4935", "378064", "530079", "12477", "10494", "504253", "92321", "198375", "372058"];

// movieID.forEach(async (id) => {
//     const movieData = await getTMDBData(`https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US`);

//     const tile = createMovieTile(movieData.id, movieData.poster_path, movieData.title, movieData.release_date, movieData.overview);
//     movies.appendChild(tile);

// });

// Add event listener to the button



async function bFunction() {
  const selectedValue = document.getElementById("moviePicker").value;
  console.log(selectedValue);
  let selectedInfo = await getTMDBData(
    `https://api.themoviedb.org/3/movie/${selectedValue}?api_key=${TMDB_API_KEY}&language=en-US&adult=false`);
  console.log();
  return selectedInfo;
}

function showInfo(movie) {
  console.log(`ID: ${movie.id} + poster path: ${movie.poster_path}`);
  const tile = createMovieTile(
    movie.id,
    movie.poster_path,
    movie.title,
    movie.release_date,
    movie.overview
  );
  movies.appendChild(tile);
}

document.getElementById("getInfo").addEventListener("click", function () {
  // const selectedValue = document.getElementById("moviePicker").value;
  // console.log("Selected movie:", selectedValue);

  // let selectedInfo = await getTMDBData(
  //   `https://api.themoviedb.org/3/movie/${aFunction()}?api_key=${TMDB_API_KEY}&append_to_response=videos`  );
  const movies = document.getElementById("movies");
  let ab = bFunction();
  showInfo(ab);
});
