/* eslint-disable */

// interface Options {
//   Title?: string | undefined;
//   page?: number | undefined;
// }

const getMovies = ($axios: any, options: any) =>
  $axios.get("https://jsonmock.hackerrank.com/api/movies/search/", {
    params: options,
    validateStatus(status: number) {
      return status >= 200 && status < 300;
    }
  });

export const MoviesAPI = {
  getMovies
};
