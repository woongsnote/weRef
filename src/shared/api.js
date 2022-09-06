import axios from "axios";

// const baseURL = "http://localhost:3001";

// const baseURL = "http://52.79.235.129";
const baseURL = "http://13.125.246.47:8080";
const api = axios.create({ baseURL: baseURL });
// const api = axios.create({ baseURL: process.env.REACT_APP_API_URL });
// axios.defaults.withCredentials = true;

export const apis = {
  //posts
  //posts: () => api.get(`/posts`),
  //detail
  // post: (postId) => api.get(`/posts/${postId}`),
  post: (id) => api.get(`/api/auth/post/${id}`),
  //comment
  addComment: (postId, content) => api.post(`/comments`, postId, { content }),
  // getComments: (id) => api.get(`/api/posts/${id}/comments`),
  getComments: (postId) => api.get(`/api/auth/comment/${postId}`),
  // getComments: () => api.get(`/comments`),

  delComment: (commentId) => api.delete(`comments/${commentId}`),
  // api.delete(`/api/posts/${postId}/comments/${commentId}`),
  editComment: (commentId, content) =>
    // api.put(`/api/posts/${postId}/comments/${commentId}`, { content }),
    api.patch(`/comments/${commentId}`, { content }),
};
