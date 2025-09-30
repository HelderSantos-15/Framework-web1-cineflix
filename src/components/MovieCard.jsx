import { Card, CardMedia, CardContent, Typography, IconButton, Box } from "@mui/material";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";

export default function MovieCard({ movie }) {
  const [isFavorito, setIsFavorito] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const storedFavoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    setIsFavorito(storedFavoritos.some(fav => fav.id === movie.id));
  }, [movie.id]);

  const toggleFavorito = (e) => {
    e.stopPropagation(); // impede de ativar o Link
    const storedFavoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    const updatedFavoritos = isFavorito
      ? storedFavoritos.filter(fav => fav.id !== movie.id)
      : [...storedFavoritos, movie];

    localStorage.setItem("favoritos", JSON.stringify(updatedFavoritos));
    setIsFavorito(!isFavorito);
  };

  return (
    <Card
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        width: 200,
        height: 380,
        bgcolor: "#1e1e1e",
        color: "#fff",
        borderRadius: 3,
        overflow: "hidden",
        m: 1,
        position: "relative",
        cursor: "pointer",
        transform: hovered ? "scale(1.1)" : "scale(1)",
        transition: "transform 0.3s, box-shadow 0.3s",
        boxShadow: hovered ? "0 12px 24px rgba(0,0,0,0.6)" : "0 2px 6px rgba(0,0,0,0.3)",
      }}
      onClick={() => window.location.href = `/movie/${movie.id}`} // todo o card clicável
    >
      <CardMedia
        component="img"
        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        sx={{ height: 280, objectFit: "cover" }}
      />

      {hovered && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: 280,
            bgcolor: "rgba(0,0,0,0.7)",
            color: "#fff",
            p: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold" noWrap>
            {movie.title}
          </Typography>
          <Typography variant="body2" sx={{ mt: 0.5 }}>
            Nota: {movie.vote_average} ⭐
          </Typography>
          <Typography variant="body2" sx={{ mt: 0.5 }} noWrap>
            {movie.overview}
          </Typography>
        </Box>
      )}

      <Box sx={{ position: "absolute", top: 5, right: 5, zIndex: 10 }}>
        <IconButton
          onClick={toggleFavorito}
          sx={{
            color: isFavorito ? "#FFD700" : "#aaa",
            transition: "color 0.3s, transform 0.2s",
            "&:hover": {
              color: isFavorito ? "#FFC107" : "#fff",
              transform: "scale(1.2)",
              textShadow: isFavorito ? "0 0 8px #FFD700" : "none",
            },
          }}
        >
          <StarIcon />
        </IconButton>
      </Box>

      <CardContent sx={{ p: 1 }}>
        <Typography variant="subtitle1" fontWeight="bold" noWrap>
          {movie.title}
        </Typography>
      </CardContent>
    </Card>
  );
}
