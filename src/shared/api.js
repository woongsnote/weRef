import axios from "axios";

// const baseURL = process.env.REACT_APP_API_URL;
const baseURL = "http://13.125.246.47/api";

export const instance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

/** DESC: 계정 API */
export const authAPI = {
  login: (email, password) =>
    instance.post("/member/login", { email, password }),

  join: (email, nickname, password) =>
    instance.post("/member/signup", { email, nickname, password }),
};

/** DESC:  게시글 API */
export const postAPI = {
  // 게시글 전체 조회
  posts: () => instance.get(`/posts`),
  // 게시글 상세 조회
  post: (postId) => instance.get(`/post/${postId}`),
  //게시글 추가
  addPost: (content) => instance.post(`/auth/post`, content),
  //게시글 편집
  editPost: (postId, content) => instance.put(`/auth/post/${postId}`, content),
  //게시글 삭제
  deletePost: (postId) => instance.delete(`/auth/post/${postId}`),
};

/** DESC: 댓글 API */
export const commentsAPI = {
  /** DESC: 댓글 추가*/
  addComment: (postId, comment) =>
    instance.post(
      `/auth/comment/${postId}`,
      { comment },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: window.localStorage.accessToken,
          "Refresh-Token": window.localStorage.refreshToken,
        },
      }
    ), //
  /** DESC: 댓글 가져오기 */
  getComments: (postId) => instance.get(`/comment/${postId}`),
  //TODO
  /** DESC: 댓글 삭제 */
  deleteComment: (commentId) =>
    instance.delete(`/auth/comment/delete/${commentId}`),
  //TODO
  /** DESC: 댓글 편집 */
  editComment: (postId, commentId, comment) =>
    instance.put(`/auth/comment/edit/${postId}/${commentId}`, { comment }),
};
