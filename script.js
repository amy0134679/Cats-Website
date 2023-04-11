import { TMDB_API_KEY } from "./key.js";

const cartContents = new Set();

const getTMDBData = async (url) => {
  return (await axios.get(url)).data;
}

const createMovieTile = (id, poster, title, date, description) => {
  const tile = document.createElement("div");
  const details = document.createElement("div");
  const img = document.createElement("img");
  const h1 = document.createElement("h1");
  const h3 = document.createElement("h3");
  const h4 = document.createElement("h4");
  const buyButton = document.createElement("button");
  const trailerButton = document.createElement("button");

  tile.classList.add("tile");
  img.src = `https://image.tmdb.org/t/p/w500/${poster}`;
  h1.innerText = title;
  h3.innerText = date;
  h4.innerText = description;
  buyButton.innerText = "Buy";
  trailerButton.innerText = "Trailer";

  buyButton.addEventListener('click', () => {
    cartContents.add(id);
    const cart = document.getElementById("cart");
    cart.innerHTML = `Your cart contains ${cartContents.size} movies`;
  })

  const movies = document.getElementById("movies");

  details.append(h1);
  details.append(h3);
  details.append(h4);

  tile.append(img);
  tile.append(details);
  tile.append(buyButton);
  tile.append(trailerButton);

  return tile;
}

const movieID = ["568160", "4935", "378064", "530079", "12477", "10494", "504253", "92321", "198375", "372058"];

movieID.forEach(async (id) => {
  try {
    const movieData = await getTMDBData(`https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US`);
    
    // Use fetched movie data to create movie tile
    const tile = createMovieTile(movieData.id, movieData.poster_path, movieData.title, movieData.release_date, movieData.overview);
    movies.appendChild(tile);

  } catch (error) {
    console.error('Error fetching TMDB data:', error);
  }
});