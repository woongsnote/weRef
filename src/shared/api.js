import axios from "axios";

// const baseURL = "http://localhost:3001";
// const baseURL = "http://52.79.235.129/api";
const baseURL = "http://13.125.246.47:8080/api";
const api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});
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
  console.log(config);
});

/** DESC: 응답 인터셉터  */
axios.interceptors.response.use(
  function (response) {
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 데이터가 있는 작업 수행
    return response;
  },
  function (error) {
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 오류가 있는 작업 수행
    return Promise.reject(error);
  }
);

/** DESC: 로컬 테스트 API */
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

/** DESC: 계정 API */
export const authAPI = {
  login: (email, password) => api.post("/member/login", { email, password }),

  join: (email, nickname, password) =>
    api.post("/member/signup", { email, nickname, password }),
};

/** DESC:  게시글 API */
export const postAPI = {
  // 게시글 전체 조회
  posts: () => api.get(`/post`),
  // 게시글 상세 조회
  post: (id) => api.get(`/auth/post/${id}`),
  //게시글 추가
  addPost: () => api.post(),
  //게시글 편집
  editPost: () => api.put(),
  //게시글 삭제
  deletePost: () => api.delete(),
};

/** DESC: 댓글 API */
export const commentsAPI = {
  /** DESC: 댓글 추가*/
  addComment: (postId, content) =>
    api.post(`/auth/comment`, postId, { content }), //
  /** DESC: 댓글 가져오기 */
  getComments: (postId) => api.get(`/auth/comment/${postId}`),
  //TODO
  /** DESC: 댓글 삭제 */
  deleteComment: (postId, commentId) =>
    api.delete(`/auth/comment/${postId}/${commentId}`),
  //TODO
  /** DESC: 댓글 편집 */
  editComment: (postId, commentId, comment) =>
    api.put(`/auth/comment/edit/${postId}/${commentId}`, { comment }),
};
