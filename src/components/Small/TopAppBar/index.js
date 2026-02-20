import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import {
  MenuBook as MenuBookIcon,
  Logout as LogoutIcon,
  Login as LoginIcon,
} from "@mui/icons-material";
import { logout } from "../../../utils";
import { useApp } from "../../../context/AppContext";
import { useConfig } from "../../../context/ConfigContext";

const TopAppBar = () => {
  const { user, setUser, setMessage } = useApp();
  const { loading } = useConfig();

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "background.default",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        mb: 1,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: { xs: 1, sm: 2 } }}>
        {/* Logo - Left side */}
        <Box
          component={RouterLink}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            "&:focus": {
              outline: "2px solid",
              outlineColor: "primary.main",
              outlineOffset: 2,
              borderRadius: 1,
            },
          }}
          aria-label="Retour à l'accueil"
        >
          <Box
            component="img"
            src="./images/1755small.png"
            alt="Logo Restaurant Le 1755"
            sx={{
              height: { xs: 60, sm: 70 },
              width: "auto",
              cursor: "pointer",
              transition: "transform 0.2s",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          />
        </Box>

        {/* Actions - Right side */}
        <Box sx={{ display: "flex", gap: 1 }}>
          {/* Login/Logout Button */}
          {!user ? (
            <Tooltip title="Se connecter" arrow>
              <IconButton
                component={RouterLink}
                to="/login"
                color="inherit"
                disabled={loading}
                aria-label="Se connecter"
                sx={{
                  color: "text.secondary",
                  "&:hover": {
                    color: "primary.light",
                    backgroundColor: "action.hover",
                  },
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  <LoginIcon sx={{ fontSize: { xs: 28, sm: 32 } }} />
                )}
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Se déconnecter" arrow>
              <IconButton
                color="error"
                disabled={loading}
                onClick={() => logout(setUser, setMessage)}
                aria-label="Se déconnecter"
                sx={{
                  "&:hover": {
                    backgroundColor: "error.dark",
                    color: "error.contrastText",
                  },
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  <LogoutIcon sx={{ fontSize: { xs: 28, sm: 32 } }} />
                )}
              </IconButton>
            </Tooltip>
          )}

          {/* Bookings Button - Admin only */}
          {user === "isAdmin" && (
            <Tooltip title="Voir les réservations" arrow>
              <IconButton
                component={RouterLink}
                to="/bookings"
                color="primary"
                disabled={loading}
                aria-label="Voir les réservations"
                sx={{
                  "&:hover": {
                    backgroundColor: "primary.main",
                    color: "primary.contrastText",
                  },
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  <MenuBookIcon sx={{ fontSize: { xs: 28, sm: 32 } }} />
                )}
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopAppBar;
