import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true,
});

function errorHandler(error) {
  if (error.response) {
    console.log(error.response.data.message);
    throw error.response.data;
  }
  throw error;
}

export default {
  service,

  signup(userInfo) {
    return service
      .post("/api/auth/signup", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  signin(userInfo) {
    return service
      .post("/api/auth/signin", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  logout() {
    return service.get("/api/auth/logout").catch(errorHandler);
  },

  isLoggedIn() {
    return service
      .get("/api/auth/isLoggedIn")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getAll(endPoint) {
    return service
      .get(endPoint)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  createOne(endPoint, data) {
    return service
      .post(endPoint, data)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getOne(endPoint) {
    return service.get(endPoint);
  },

  getMe(endPoint) {
    return service.get(endPoint).then(res => res.data);
  },

  updateOne(endPoint, data) {
    return service
      .patch(endPoint, data)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  deleteone(endPoint, data) {
    return service
      .delete(endPoint, data)
      .then((res) => res.data)
      .catch(errorHandler);
  },
};
