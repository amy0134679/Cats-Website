import { TMDB_API_KEY } from "./key.js";

const getMovieInfo = async (movieId) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&append_to_response=videos`
  );
  const movie = response.data;
  document.getElementById("movieTitle").textContent = movie.title;
  document.getElementById(
    "movieYear"
  ).textContent = `Year of Release: ${movie.release_date}`;
  document.getElementById(
    "ogTitle"
  ).textContent = `Original Title: ${movie.original_title}`;
  document.getElementById(
    "ogLang"
  ).textContent = `Original Title: ${movie.original_language}`;
  document.getElementById(
    "ogCountry"
  ).textContent = `Origin Country: ${movie.origin_country}`;
  document.getElementById("runtime").textContent = `Duration: ${movie.runtime}`;
  document.getElementById("budget").textContent = `Budget: ${movie.budget}`;
  document.getElementById(
    "rating"
  ).textContent = `Average Rating: ${movie.vote_average}`;
  document.getElementById("movieOverview").textContent = movie.overview;
  document.getElementById(
    "moviePoster"
  ).src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  // const trailers = response.data.videos.results.filter((trailer) => trailer.type === "Trailer");
  const trailer = movie.videos.results.filter((trailer) => {
    return trailer.type === "Trailer";
  });
  document.getElementById(
    "movieTrailer"
  ).src = `https://www.youtube.com/embed/${trailer.at(0).key}`;
};

document.getElementById("getInfo").addEventListener("click", () => {
  const movieId = document.getElementById("moviePicker").value;
  getMovieInfo(movieId);
});
