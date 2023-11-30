import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import { Box, IconButton, Typography } from "@mui/material";
import React from "react";

const UnChatHero = () => {
  return (
    <Box
      maxWidth
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box
        component={"img"}
        src="https://jobguruserver.files.wordpress.com/2023/11/halloween-video-call-pana.png"
        width={"40%"}
      />
      <Box maxWidth textAlign={'center'}>
        <Typography fontSize={'40px'} fontFamily={'Merriweather'}>Videology - A simple way of Video calling</Typography>
        <Box fontFamily={'Merriweather'} sx={{ display: "flex", gap: 1, alignItems: 'center', width: '100%', justifyContent: 'center' }}>
          <Typography>Add your friend using</Typography>
          <IconButton>
            <AddCircleOutline fontSize="inherit" />
          </IconButton>
          <Typography>Button from Top</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default UnChatHero;
