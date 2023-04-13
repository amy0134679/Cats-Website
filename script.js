import {TMDB_API_KEY} from "./key.js";

    const getMovieInfo = async (movieId) => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}`);
        const movie = response.data;
        document.getElementById('movieTitle').textContent = movie.title;  
        // document.getElementById('movieYear').textContent = `Year of Release: ${movie.release_date}`;
        // document.getElementById('ogLang').textContent = `Original Title: ${movie.original_language}`;
        // document.getElementById('ogCountry').textContent = `Origin Country: ${movie.original_language}`;
        // document.getElementById('runtime').textContent = `Duration: ${movie.runtime}`;
        // document.getElementById('ogCountry').textContent = `Origin Country: ${movie.original_language}`;
        // document.getElementById('runtime').textContent = `Duration: ${movie.runtime}`;
        document.getElementById('moviePoster').src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        document.getElementById('movieOverview').textContent = movie.overview;
      } catch (error) {
        console.error(error);
      }
    }

    document.getElementById('getInfo').addEventListener('click', () => {
      const movieId = document.getElementById('moviePicker').value;
      getMovieInfo(movieId);
    });
