import { useEffect, useState } from "react";
import { getPopularMovies, searchMovies } from "../services/api";
import MovieCard from "../components/MovieCard";
import { TextField, CircularProgress, Box, Pagination } from "@mui/material";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const fetchMovies = async () => {
        setLoading(true);
        try {
          let data;
          if (search.trim()) {
            data = await searchMovies(search, page);
          } else {
            data = await getPopularMovies(page);
          }
          setMovies(data.results);
          setTotalPages(data.total_pages > 500 ? 500 : data.total_pages);
        } catch (err) {
          alert("Erro ao carregar filmes!");
        } finally {
          setLoading(false);
        }
      };
      fetchMovies();
    }, 600);

    return () => clearTimeout(delayDebounce);
  }, [page, search]);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={{ padding: 2, backgroundColor: "#121212", minHeight: "100vh" }}>
      {/* Barra de busca */}
      <TextField
        label="Buscar Filme"
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        sx={{
          marginBottom: 3,
          bgcolor: "#1e1e1e",
          borderRadius: 1,
          input: { color: "#fff" },
          label: { color: "#aaa" },
        }}
      />

      {/* Lista de filmes centralizada */}
      {movies.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {movies.map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </Box>
      ) : (
        <Box sx={{ color: "#ccc", textAlign: "center", width: "100%", mt: 5 }}>
          Nenhum filme encontrado 😢
        </Box>
      )}

      {/* Paginação */}
      {movies.length > 0 && (
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, value) => setPage(value)}
          sx={{
            marginTop: 3,
            display: "flex",
            justifyContent: "center",
            "& .MuiPaginationItem-root": { color: "#fff" },
          }}
        />
      )}
    </Box>
  );
}
