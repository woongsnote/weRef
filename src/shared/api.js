import axios from "axios";

const baseURL = "http://localhost:3001";

// const baseURL = "http://52.79.235.129";
// const baseURL = "http://13.125.246.47:8080/api";
const api = axios.create({ baseURL: baseURL, withCredentials: true });
// const api = axios.create({ baseURL: process.env.REACT_APP_API_URL });
// axios.defaults.withCredentials = true;

//TODO interceptor 구현
api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  if (!accessToken || !refreshToken) {
    config.headers.common["Authorization"] = null;
    config.headers.common["refresh-token"] = null;
  } else {
    config.headers.common["Authorization"] = accessToken;
    config.headers.common["refresh-token"] = refreshToken;
    return config;
  }
  console.log(config)
});

axios.interceptors.request.use(function (config) {
  // 요청이 전달되기 전에 작업 수행
  return config;
}, function (error) {
  // 요청 오류가 있는 작업 수행
  return Promise.reject(error);
});

// 응답 인터셉터 추가하기
axios.interceptors.response.use(function (response) {
  // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
  // 응답 데이터가 있는 작업 수행
  return response;
}, function (error) {
  // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
  // 응답 오류가 있는 작업 수행
  return Promise.reject(error);
});

export const localAPI = {
  // 1. local(db.json)
  //detail
  post: (postId) => api.get(`/posts/${postId}`),
  //comment add
  addComment: (postId, content) => api.post(`/comments`, postId, { content }),
  //comments get
  getComments: () => api.get(`/comments`),
  //comment delete
  deleteComment: (commentId) => api.delete(`comments/${commentId}`),
  //comment update
  editComment: (commentId, content) =>
    api.put(`/comments`, commentId, { content }),
};

export const authAPI = {};

export const postAPI = {
  // detail get
  post: (id) => api.get(`/auth/post/${id}`),
};

export const commentsAPI = {
  // 2. server(backend db)

  // comment add
  addComment: (postId, content) =>
    api.post(`/auth/comment`, postId, { content }), // // comments get
  getComments: (postId) => api.get(`/auth/comment/${postId}`),
  // //TODO comment delete
  deleteComment: (postId, commentId) =>
    api.delete(`/auth/comment/${postId}/${commentId}`),
  // //TODO comment update
  editComment: (postId, commentId, comment) =>
    api.put(`/auth/comment/edit/${postId}/${commentId}`, { comment }),
  // api.patch(`/comments/${commentId}`, { content }),
};
