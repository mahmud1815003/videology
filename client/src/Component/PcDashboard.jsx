import {
  Typography,
  Box,
  alpha,
  Avatar,
  Badge,
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
} from "@mui/material";
import { grey, orange } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slice/auth";
import ChatListPc from "./ChatListPc";
import MainChatHeader from "./MainChatHeader";
import ChatHero from "./ChatHero";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FindFriend from "./FindFriend";
import UnChatHero from "./UnChatHero";
import { socket } from "../utils/Socket";

const PcDashboard = () => {
  const { name, token } = useSelector((state) => state.auth);
  const [connected, setConnected] = useState(false);
  const { chatId, friendEmails, videoCall, friendList } = useSelector((state) => state.global);
  const { email } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [find, setFind] = useState(false);
  const [menuData, setMenuData] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenu = (e, menuData) => {
    setMenuData(menuData);
    setAnchorEl(null);
  };
  useEffect(() => {
    if (menuData == "logout") {
      dispatch(logout());
    }
  }, [menuData]);

  useEffect(() => {
    if(videoCall){
      socket.emit('call', {
        email,
        friend: friendList.filter((fri) => fri.index == chatId)
      })
    }
  }, [videoCall])

  return (
    <Box
      sx={{
        maxWidth: "1200px",
        backgroundColor: (theme) => theme.palette.primary.contrastText,
        mx: "auto",
        mt: "20px",
        borderRadius: "0.55rem",
        display: "flex",
        flexDirection: "row",
        boxShadow: 20,
      }}
    >
      <Box
        width={320}
        sx={{
          borderRight: 0.5,
          borderColor: alpha(grey[500], 0.3),
          height: "100%",
        }}
      >
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
          <IconButton onClick={handleClick}>
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
                  backgroundColor: 'green',
                },
              }}
            >
              <Avatar
                alt={`${name}`}
                sx={{ bgcolor: orange[800] }}
                src="broken.jpg"
              />
            </Badge>
          </IconButton>
          <Box flexGrow={1}>
            <Typography fontSize={"15px"} sx={{ fontWeight: "bold" }}>
              {name}
            </Typography>
            <Typography fontSize={"12px"} sx={{ color: grey[500] }}>
              {email}
            </Typography>
          </Box>
          <Box justifyContent={"end"}>
            <Tooltip title="Add Friend">
              <IconButton sx={{ fontSize: 30 }} onClick={() => setFind(true)}>
                <AddCircleOutlineIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          sx={{
            px: 2,
          }}
        >
          {/* <MenuItem sx={{ minWidth: "100px" }} onClick={handleClose}>
            Profile
          </MenuItem> */}
          <MenuItem
            sx={{ minWidth: "200px" }}
            onClick={(e) => {
              handleMenu(e, "logout");
              window.location.reload();
            }}
          >
            Logout
          </MenuItem>
        </Menu>
        <Box>
          <ChatListPc />
        </Box>
      </Box>
      <Box width={"80%"} height={"90vh"}>
        {chatId != undefined ? <MainChatHeader /> : null}
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {chatId != undefined ? <ChatHero /> : <UnChatHero />}
          {find && <FindFriend open={find} setOpen={setFind} />}
        </Box>
      </Box>
    </Box>
  );
};

export default PcDashboard;
