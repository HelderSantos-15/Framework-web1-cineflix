import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <AppBar position="static" sx={{ bgcolor: "#1976d2" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5">🎬 CineFlix</Typography>
        <div>
         <Button
            component={Link}
            to="/"
            sx={{ color: "#fff" }}
            onClick={() => {
              window.location.href = "/"; // força ir para Home de verdade
            }}
          >
            Home
          </Button>

          <Button component={Link} to="/favoritos" sx={{ color: "#fff" }}>
            Favoritos
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
