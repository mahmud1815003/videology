import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  alpha,
  darken,
} from "@mui/material";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { deepPurple, lime, orange } from "@mui/material/colors";
import React, { useState } from "react";
import { useLoginMutation } from "../redux/api/auth";

const Login = () => {
  const theme = useTheme();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, {data, error,isLoading, isSuccess}] = useLoginMutation();
  const handleSubmit = () => {
    login({
      email,
      password,
    })
  }
  return (
    <Box
      sx={{
        width: "100%",
        height: "93vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage:
          "url(https://jobguruserver.files.wordpress.com/2023/11/dark-background-abstract-background-network-3d-background-6016x3384-8324.png)",
        backgroundSize: "cover",
      }}
    >
      <Box
        sx={{
          width: "310px",
          borderRadius: "0.55rem",
          minHeight: "400px",
          bgcolor: "rgba(0,0,0,0.5)",
          boxShadow: 10,
          backdropFilter: blur("5px"),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", textTransform: 'uppercase' }} >
          Log In To Videology
        </Typography>
        <Box
          sx={{
            width: "80%",
            display: "flex",
            flexDirection: "column",
            gap: theme.spacing(4),
            mt: 5,
          }}
        >
          {/* Email */}
          <TextField
            required
            label="Email"
            error={error?.data?.email}
            helperText={
              error?.data?.email ? error?.data?.email?.msg : "Enter Your Email"
            }
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputLabelProps={{
              style: {
                color: theme.palette.text.primary,
                fontSize: "17px",
                borderColor: theme.palette.text.primary,
              },
            }}
          />
          <TextField
            required
            label="Password"
            type={!show ? "password" : "text"}
            error={error?.data?.password}
            helperText={
              error?.data?.password ? error?.data?.password?.msg : "Enter Your Password"
            }
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{
              style: {
                color: theme.palette.text.primary,
                fontSize: "17px",
                borderColor: theme.palette.text.primary,
              },
            }}
            InputProps={{
              endAdornment: <InputAdornment position="end"><IconButton onClick={() => setShow((prev) => !prev)}>{!show ? <VisibilityOffIcon /> : <VisibilityIcon />}</IconButton></InputAdornment>
            }}
          />
          <Button
            variant="contained"
            onClick={() => handleSubmit()}
            sx={{
              bgcolor: orange[800],
              "&:hover": { backgroundColor: darken(orange[800], 0.3) },
            }}
          >
            {isLoading ? <CircularProgress size={30} sx={{
              color: deepPurple[800],
            }} /> : "Login"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
