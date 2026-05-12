import axios from "axios";

const api =
  axios.create({

    baseURL:
      "http://localhost:5000/api",

    withCredentials: true,
  });

//////////////////////////////////////////////////////
// REQUEST INTERCEPTOR
//////////////////////////////////////////////////////
api.interceptors.request.use(
  (config) => {

    //////////////////////////////////////////////////////
    // TOKEN
    //////////////////////////////////////////////////////
    const token =
      localStorage.getItem(
        "token"
      );

    //////////////////////////////////////////////////////
    // SKIP AUTH ROUTES
    //////////////////////////////////////////////////////
    const isAuthRoute =
      config.url.includes(
        "/auth/login"
      ) ||

      config.url.includes(
        "/auth/register"
      );

    //////////////////////////////////////////////////////
    // ATTACH TOKEN
    //////////////////////////////////////////////////////
    if (
      token &&
      !isAuthRoute
    ) {

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) =>
    Promise.reject(error)
);

//////////////////////////////////////////////////////
// RESPONSE INTERCEPTOR
//////////////////////////////////////////////////////
api.interceptors.response.use(

  (response) =>
    response,

  (error) => {

    //////////////////////////////////////////////////////
    // UNAUTHORIZED
    //////////////////////////////////////////////////////
    if (
      error.response?.status ===
      401
    ) {

      console.error(
        "❌ Unauthorized Request"
      );

      localStorage.clear();

      window.location.href =
        "/login";
    }

    return Promise.reject(
      error
    );
  }
);

export default api;