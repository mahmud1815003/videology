import { Box, Button, TextField, Typography, darken, useTheme, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useVerificationMutation } from "../redux/api/auth";
import { deepPurple, orange } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import { login, logout } from "../redux/slice/auth";

const verification = () => {
  const theme = useTheme();
  const [code, setCode] = useState("");
  const dispatch = useDispatch();
  const [verification, { data, error, isLoading, isSuccess }] =
    useVerificationMutation();
  const handleSubmit = () => {
    verification({code});
  };
  useEffect(() =>  {
    if(isSuccess){
      dispatch(login(data));
    }
  }, [isSuccess]);
  return (
    <Box width={"100%"} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mt: 10}}>
        <Typography sx={{
            mb: 2,
            fontSize: {
                md: '30px',
                xs: '25px'
            }
        }}>Confirm Your Email Address</Typography>
      <Box sx={{ display: "flex", flexDirection: "column", width: '280px', gap: 2 }}>
        <TextField
          required
          label="Verification Code"
          error={error?.data?.code}
          helperText={
            error?.data?.code
              ? error?.data?.code?.msg
              : "Enter Your Verification Code"
          }
          value={code}
          onChange={(e) => setCode(e.target.value)}
          InputLabelProps={{
            style: {
              color: theme.palette.text.primary,
              fontSize: "17px",
              borderColor: theme.palette.text.primary,
            },
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
          {isLoading ? (
            <CircularProgress
              size={30}
              sx={{
                color: deepPurple[800],
              }}
            />
          ) : (
            "Verifiy"
          )}
        </Button>
        <Button
          variant="contained"
          onClick={() => dispatch(logout())}
          sx={{
            bgcolor: orange[800],
            "&:hover": { backgroundColor: darken(orange[800], 0.3) },
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default verification;
