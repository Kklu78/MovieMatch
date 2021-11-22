import tokenService from "./tokenService";

const BASE_URL = "/api/friends/";

export function getAllFriends() {
    return fetch(`${BASE_URL}all`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + tokenService.getToken(),
      },
    }).then((res) => {
      if (res.ok) return res.json();
      throw new Error("Login to see your friends");
    });
  }

export function getFriends(friendId) {
    return fetch(`${BASE_URL}${friendId}/status`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + tokenService.getToken(),
      },
    }).then((res) => {
      if (res.ok) return res.json();
      throw new Error("Login to see your friends");
    });
  }

  export function friendRequest(friendId) {
    return fetch(`${BASE_URL}/${friendId}/request`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + tokenService.getToken(),
      },
    }).then((res) => {
      if (res.ok) return res.json();
      throw new Error("Login to add a friend");
    });
  }

  export function acceptRequest(friendId) {
    return fetch(`${BASE_URL}/${friendId}/accept`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + tokenService.getToken(),
      },
    }).then((res) => {
      if (res.ok) return res.json();
      throw new Error("Login to accept a friend request");
    });
  }

  export function rejectRequest(friendId) {
    return fetch(`${BASE_URL}/${friendId}/reject`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + tokenService.getToken(),
      },
    }).then((res) => {
      if (res.ok) return res.json();
      throw new Error("Login to reject a friend request");
    });
  }