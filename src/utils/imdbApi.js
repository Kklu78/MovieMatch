import tokenService from "./tokenService";

const BASE_URL = "/api/imdb/";

export function APISearch(id) {
    return fetch(`${BASE_URL}/${id}/search`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + tokenService.getToken(),
      },
    }).then((res) => {
      if (res.ok) return res.json();
      throw new Error("Login to search for a query");
    });
  }

export function MovieSearch(id) {
    return fetch(`${BASE_URL}/${id}/movie`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + tokenService.getToken(),
        },
      }).then((res) => {
        if (res.ok) return res.json();
        throw new Error("Login to search for a movie");
      });
}

export function CastSearch(id) {
    return fetch(`${BASE_URL}/${id}/cast`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + tokenService.getToken(),
        },
      }).then((res) => {
        if (res.ok) return res.json();
        throw new Error("Login to search for the cast");
      });
}

export function getPoster(id) {
    return fetch(`${BASE_URL}/${id}/poster`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + tokenService.getToken(),
        },
      }).then((res) => {
        if (res.ok) return res.json();
        throw new Error("Login to search for the cast");
      });
}