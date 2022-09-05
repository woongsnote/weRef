import axios from "axios";

const baseURL = "http://localhost:3001/";

// const baseURL = "http://52.79.235.129";
const api = axios.create({ baseURL: baseURL });
// const api = axios.create({ baseURL: process.env.REACT_APP_API_URL });

export const apis = {
  posts: () => api.get(`/posts`),
  //detail
  getDetail: (postId) => api.get(`/posts/${postId}`),
  // getDetail: (postId) => api.get(`/api/post/${postId}`),
  //comment
  addComment: (id, content) =>
    api.post(`/api/posts/${id}/comments`, { content }),
  getComments: (id) => api.get(`/api/posts/${id}/comments`),
  delComment: (postId, commentId) =>
    api.delete(`/api/posts/${postId}/comments/${commentId}`),
  editComment: (postId, commentId, content) =>
    api.put(`/api/posts/${postId}/comments/${commentId}`, { content }),
};
