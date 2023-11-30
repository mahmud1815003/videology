import { Box, CircularProgress, Skeleton, Typography } from "@mui/material";
import { deepPurple, orange } from "@mui/material/colors";
import React from "react";

const Loading = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'column',
        gap: (theme) => theme.spacing(4)
      }}
    >
        <CircularProgress size={40} sx={{color: orange[500]}} />
        <Typography>Wait a bit dear...it won't hurt</Typography>
    </Box>
  );
};

export default Loading;
