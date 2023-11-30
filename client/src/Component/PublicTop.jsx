import React, {useState} from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import { green, orange, red } from "@mui/material/colors";
import { darken, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomDrawer from "./Drawer";

const pages = ["Login", "Signup"];

function PublicTop() {
  const navigate = useNavigate();
  const [state, setState] = useState(false);
  const theme = useTheme();
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ justifyContent: "space-between", bgcolor: "transparent" }}>
        <Typography component={'div'} onClick={() => navigate('/')} sx={{ fontFamily: "Bungee Spice", fontSize: '2.5rem', [theme.breakpoints.down('sm')]: {
          fontSize: '1.5rem'
        } }}>
          Videology
        </Typography>
        <Box sx={{ display: { sm: "flex", xs: "none", gap: 10 }, }}>
          {pages.map((page) => (
            <Button
              key={page}
              variant="contained"
              onClick={() => navigate(`/${page}`)}
              sx={{
                bgcolor: orange["800"],
                "&:hover": {
                  backgroundColor: darken(orange["800"], 0.3),
                },
              }}
            >
              {page}
            </Button>
          ))}
        </Box>
        <IconButton onClick={() => setState((prev) => !prev)} sx={{ display: { sm: "none", xs: "block" } }}>
          <MenuIcon fontSize="20px" />
        </IconButton>
        <CustomDrawer state={state} setState={setState} />
      </Toolbar>
    </AppBar>
  );
}
export default PublicTop;
