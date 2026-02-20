import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  TextField,
  Button,
  Stack,
  InputAdornment,
  IconButton,
  Paper,
  Typography
} from "@mui/material";
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
  Login as LoginIcon
} from "@mui/icons-material";

// Schéma de validation Yup
const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("L'email est obligatoire")
    .email("Format d'email invalide"),
  password: yup
    .string()
    .required("Le mot de passe est obligatoire")
    .min(6, "Le mot de passe doit contenir au moins 6 caractères")
});

const LoginForm = ({
  handleSubmitForm,
  credentials,
  setCredentials,
  loading
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: credentials.email || "",
      password: credentials.password || ""
    }
  });

  // Fonction de soumission
  const onSubmit = (data) => {
    setCredentials(data);
    handleSubmitForm(data);
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: '100%',
        maxWidth: 450,
        mx: 'auto',
        p: { xs: 3, sm: 4 },
        borderRadius: 3,
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        boxShadow: '0 8px 40px rgba(0, 0, 0, 0.50)',
      }}
    >
      <Stack spacing={3} alignItems="center" mb={3}>
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #5C0000, #8B0000)',
            border: '2px solid rgba(218, 165, 32, 0.40)',
            boxShadow: '0 0 20px rgba(218, 165, 32, 0.20)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <LockIcon sx={{ fontSize: 32, color: 'white' }} />
        </Box>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 700,
            color: 'text.primary',
            fontFamily: '"Dancing Script", cursive',
          }}
        >
          Connexion
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
        >
          Connectez-vous pour accéder à l'espace administrateur
        </Typography>
      </Stack>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Stack spacing={3}>
          {/* Email */}
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                placeholder="admin@example.com"
                type="email"
                error={!!errors.email}
                helperText={errors.email?.message}
                required
                fullWidth
                autoComplete="email"
                autoFocus
                disabled={loading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="primary" />
                    </InputAdornment>
                  )
                }}
              />
            )}
          />

          {/* Password */}
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Mot de passe"
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
                error={!!errors.password}
                helperText={errors.password?.message}
                required
                fullWidth
                autoComplete="current-password"
                disabled={loading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePassword}
                        edge="end"
                        disabled={loading}
                        aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            )}
          />

          {/* Bouton de soumission */}
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading || !isValid}
            fullWidth
            endIcon={<LoginIcon />}
            sx={{
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 600,
              borderRadius: 3,
              textTransform: 'none',
              '&:hover': {
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.2s'
            }}
          >
            {loading ? "Connexion en cours..." : "Se connecter"}
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default LoginForm;
