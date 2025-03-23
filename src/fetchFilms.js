import axios from "axios";

// const url =
//   "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNTY0MGUzYzlmYjFjOTNmY2VhODA1ZDUyMWIyNDgyNSIsIm5iZiI6MTc0MjczMTg4OS45NTgwMDAyLCJzdWIiOiI2N2RmZmE3MWMyZDgxOWRmNjljNzI2ZGMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.TWa8MyeNbgWdi93v1QnDEzdCRnC8XUn8EEG0xebvXvM",
  },
};

export const fetchTrendingFilms = async () => {
  const response = await axios.get(
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
    options
  );

  console.log(response.data.results);
  return response.data.results;
};

export const fetchFilmById = async (filmId) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${filmId}`,
    options
  );

  console.log(response.data);
  return response.data;
};

export const fetchFilmCast = async (filmId) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${filmId}/credits`,
    options
  );

  console.log(response.data);
  return response.data;
};

export const fetchFilmReviews = async (filmId) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${filmId}/reviews`,
    options
  );

  console.log(response.data);
  return response.data;
};

export const fetchFilmByName = async (query) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&query=${query}`,
    options
  );

  console.log(response.data);
  return response.data;
};
