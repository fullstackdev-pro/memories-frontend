import axios from "axios";

const API = axios.create({ baseURL: "https://memories-backend-rn8c.onrender.com" });
// const API = axios.create({ baseURL: "http://localhost:5000" });

let token = window.localStorage.getItem("memories_token");

API.interceptors.request.use((req) => {
  if (token) {
    req.headers.authorization = `Bearer ${token}`;
  }

  return req;
});

export const fetchPost = async (id) => await API.get(`/posts/${id}`)
export const fetchPosts = async (page) => await API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${searchQuery.tags}`
  );
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (id, value) => API.post(`/posts/${id}/commentPost`, {value});
export const signIn = (formData) => API.post("/users/signIn", formData);
export const signUp = (formData) => API.post("/users/signUp", formData);
