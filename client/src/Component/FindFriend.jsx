import {
  Modal,
  Box,
  Typography,
  TextField,
  CircularProgress,
  useTheme,
  Button,
  darken
} from "@mui/material";
import { orange, deepPurple } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { useAddFriendMutation } from "../redux/api/auth";

const FindFriend = ({ open, setOpen }) => {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [addFriend, {data, isSuccess, isLoading, isError, error}] = useAddFriendMutation();
  const handleSubmit = () => {
    addFriend({email});
  }
  useEffect(() => {
    if(isSuccess){
        setOpen(false);
    }
  }, [isSuccess]);
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        bgcolor: (theme) => theme.palette.primary.contrastText
      }}
    >
      <Box
        width={"100%"}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mt: 10,
        }}
      >
        <Typography
          sx={{
            mb: 2,
            fontSize: {
              md: "30px",
              xs: "25px",
            },
          }}
        >
          Enter Your Friends Email Address
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "280px",
            gap: 2,
          }}
        >
          <TextField
            required
            label="Enter Email Address"
            error={error?.data?.email}
            helperText={
              error?.data?.email
                ? error?.data?.email?.msg
                : "Enter Your Friends Email Address"
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
              "Add Friend"
            )}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default FindFriend;
