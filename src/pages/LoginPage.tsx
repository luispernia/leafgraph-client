import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Link,
  CircularProgress,
  InputAdornment,
  IconButton,
  Alert,
  Container,
  Avatar,
  FormControlLabel,
  Checkbox,
  Snackbar
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Info as InfoIcon
} from '@mui/icons-material';
import { Spa as LeafIcon } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import LeafGraphLogo from '../components/LeafGraphLogo';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [showSecurityTip, setShowSecurityTip] = useState(false);
  const { login, loading, error, clearError, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the redirect path from location state or default to home
  const from = location.state?.from || '/';

  // If user is already authenticated, redirect to requested page
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;
    
    try {
      await login(username, password);
      // Login successful - useEffect will handle redirect
      setLoginAttempts(0);
    } catch (err) {
      // Increment login attempts counter
      setLoginAttempts(prev => prev + 1);
      
      // Show security tip after 2 failed attempts
      if (loginAttempts >= 2) {
        setShowSecurityTip(true);
      }
      
      console.error('Login failed:', err);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const handleSecurityTipClose = () => {
    setShowSecurityTip(false);
  };

  // Clear error when inputs change
  useEffect(() => {
    if (error) {
      clearError();
    }
  }, [username, password]);

  return (
    <Box 
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'auto',
        background: (theme) => theme.palette.mode === 'dark' 
          ? `linear-gradient(145deg, ${theme.palette.background.default}, #102010)`
          : `linear-gradient(145deg, #f8fff8, ${theme.palette.background.default})`,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(128, 200, 128, 0.1) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(128, 200, 128, 0.05) 2%, transparent 0%)',
          backgroundSize: '100px 100px',
          opacity: 0.5,
          zIndex: 0
        }
      }}
    >
      <Container maxWidth="sm" sx={{ my: 4, position: 'relative', zIndex: 1 }}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
            borderRadius: 2,
            boxShadow: (theme) => `0 8px 32px rgba(0, 0, 0, ${theme.palette.mode === 'dark' ? 0.3 : 0.1})`,
            background: (theme) => theme.palette.mode === 'dark' 
              ? 'rgba(40, 60, 40, 0.8)' 
              : 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            border: (theme) => `1px solid ${theme.palette.mode === 'dark' ? 'rgba(90, 150, 90, 0.2)' : 'rgba(200, 230, 200, 0.5)'}`
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: 3
            }}
          >
            <Avatar 
              sx={{ 
                m: 1, 
                bgcolor: 'primary.main',
                width: 56,
                height: 56,
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
              }}
            >
              <LeafIcon sx={{ fontSize: 32, color: 'white' }} />
            </Avatar>
            <Box sx={{ my: 2 }}>
              <LeafGraphLogo sx={{ fontSize: 42 }} />
            </Box>
            <Typography 
              component="h2" 
              variant="h6" 
              sx={{ 
                color: 'text.secondary',
                fontWeight: 500,
                mb: 1
              }}
            >
              Sign in to your account
            </Typography>
          </Box>
          
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={rememberMe} 
                    onChange={(e) => setRememberMe(e.target.checked)} 
                    color="primary" 
                  />
                }
                label={
                  <Typography variant="body2">Remember me</Typography>
                }
              />
              <Link href="#" variant="body2" sx={{ fontSize: '0.875rem' }}>
                Forgot password?
              </Link>
            </Box>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ 
                mt: 3, 
                mb: 2, 
                py: 1.5, 
                borderRadius: 2,
                fontWeight: 600,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                '&:hover': {
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                  transform: 'translateY(-1px)'
                },
                transition: 'all 0.2s ease-in-out'
              }}
              disabled={loading || !username || !password}
            >
              {loading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>
            
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{' '}
                <Link href="#" variant="body2" sx={{ fontWeight: 600 }}>
                  Request access
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 4 }}>
          © {new Date().getFullYear()} LeafGraph. All rights reserved.
        </Typography>
      </Container>
      
      <Snackbar
        open={showSecurityTip}
        autoHideDuration={8000}
        onClose={handleSecurityTipClose}
        message={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <InfoIcon fontSize="small" />
            <span>For security reasons, please make sure to use the correct credentials.</span>
          </Box>
        }
      />
    </Box>
  );
};

export default LoginPage; 