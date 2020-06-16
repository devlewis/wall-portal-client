import config from "./config";

const ApiService = {
  getAll() {
    return fetch(`${config.API_ENDPOINT}`, {
      method: "GET",
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  getReviews() {
    return fetch();
  },
};

export default ApiService;
