import { Box, IconButton, Avatar, Typography, alpha, Badge } from "@mui/material";
import { orange, grey } from "@mui/material/colors";
import React from "react";
import { useSelector } from "react-redux";

const MainChatHeader = () => {
    const {chatId, friendList} = useSelector(state => state.global);
    const {friend} = friendList?.filter((fr) => chatId == fr.index)[0];
  return (
      <Box
        sx={{
          px: 1,
          py: 0.5,
          display: "flex",
          gap: 0.5,
          alignItems: "center",
          borderBottom: 0.5,
          borderColor: alpha(grey[500], 0.3),
        }}
      >
        <IconButton>
          <Badge
            variant="dot"
            overlap="circular"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            sx={{
              "& .MuiBadge-badge": {
                color: "lightgreen",
                backgroundColor: "green",
              },
            }}
          >
            <Avatar
              alt={`${friend.name}`}
              sx={{ bgcolor: orange[800] }}
              src="broken.jpg"
            />
          </Badge>
        </IconButton>
        <Box>
          <Typography fontSize={"15px"} sx={{ fontWeight: "bold" }}>
            {friend.name}
          </Typography>
          <Typography
            fontSize={"12px"}
            sx={{ color: grey[500] }}
          >
            {friend.email}
          </Typography>
        </Box>
      </Box>
  );
};

export default MainChatHeader;
