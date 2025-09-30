// src/services/api.js
import axios from "axios";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: apiKey,
    language: "pt-BR",
  },
});

export const getPopularMovies = async (page = 1) => {
  const response = await api.get("/movie/popular", { params: { page } });
  return response.data;
};

export const searchMovies = async (query, page = 1) => {
  const response = await api.get("/search/movie", {
    params: { query, page },
  });
  return response.data;
};

export const getMovieDetails = async (id) => {
  const res = await api.get(`/movie/${id}`);
  return res.data;
};

// NOVO: busca trailer do filme
export const getMovieTrailer = async (id) => {
  const res = await api.get(`/movie/${id}/videos`);
  return res.data;
};

export default api;
