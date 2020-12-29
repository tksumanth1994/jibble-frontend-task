/* eslint-disable */

// interface Options {
//   Title?: string | undefined;
//   page?: number | undefined;
// }

const getMovies = ($axios, options) =>
  $axios.get("https://jsonmock.hackerrank.com/api/movies/search/", {
    params: options,
    validateStatus(status) {
      return status >= 200 && status < 300;
    }
  });

export const MoviesAPI = {
  getMovies
};
