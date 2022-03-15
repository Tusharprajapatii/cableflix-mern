export const apikey = `${process.env.REACT_APP_APIKEY}`;

export const requests = {
  // fetchNetflixOriginals: `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&language=en-US`,
  fetchNetflixOriginals: `https://api.themoviedb.org/3/movie/upcoming?api_key=${apikey}&language=en-US&page=1`,
  fetchvideo: `https://api.themoviedb.org/3/movie/videos?api_key=${apikey}&language=en-US`,
  fetchToprated: `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&language=en-US&page=1`,
  fetchAction: `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&with_genres=28`,
  fetchcomedy: `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&with_genres=35`,
  fetchhorror: `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&with_genres=27`,
  fetchromance: `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&with_genres=10749`,
};
