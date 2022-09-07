import axios from "axios";

// const baseURL = "http://localhost:3001";

const baseURL = "http://52.79.235.129";
// const baseURL = "http://13.125.246.47:8080";
const api = axios.create({ baseURL: baseURL, withCredentials: true });
// const api = axios.create({ baseURL: process.env.REACT_APP_API_URL });
// axios.defaults.withCredentials = true;
//TODO
// api.interceptors.request.use(
//   function (config) {
//     config.headers["Content-Type"] = "application/json; charset=utf-8";
//     config.headers["Authorization"] = " token ";
//     config.headers["refreshToken"] = "token";
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );
export const apis = {
  // 1. local(db.json)
  //detail
  // post: (postId) => api.get(`/posts/${postId}`),
  // comment add
  // addComment: (postId, content) => api.post(`/comments`, postId, { content }),
  // comments get
  // getComments: () => api.get(`/comments`),
  // comment delete
  // api.delete(`comments/${commentId}`),

  // comment update
  // api.patch(`/comments/${commentId}`, { content }),

  // 2. server(backend db)
  // detail get
  post: (id) => api.get(`/api/auth/post/${id}`),
  // comment add
  addComment: (postId, content) =>
    api.post(`/api/auth/comment`, postId, { content }),
  // comments get
  getComments: (postId) => api.get(`/api/auth/comment/${postId}`),
  //TODO comment delete
  delComment: (postId, commentId) =>
    api.delete(`/api/posts/${postId}/comments/${commentId}`),
  //TODO comment update
  editComment: (postId, commentId, content) =>
    api.put(`/api/posts/${postId}/comments/${commentId}`, { content }),
  // api.patch(`/comments/${commentId}`, { content }),
};
