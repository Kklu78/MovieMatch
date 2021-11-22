import tokenService from "./tokenService";

const BASE_URL = "/api/movies/";

export function getMovies() {
  return fetch(`${BASE_URL}movies/`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + tokenService.getToken(),
    },
  }).then((res) => {
    if (res.ok) return res.json();
    throw new Error("Login to add a movie");
  });
}

export function addMovieTolist(id) {
    return fetch(`${BASE_URL}movies/${id}/add`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + tokenService.getToken(),
      },
    }).then((res) => {
      if (res.ok) return res.json();
      throw new Error("Login to add a movie");
    });
  }
  
  export function removeMovieFromlist(id) {
    return fetch(`${BASE_URL}movies/${id}/remove`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + tokenService.getToken(),
      },
    }).then((res) => {
      if (res.ok) return res.json();
      throw new Error("Login to remove a movie");
    });
  }