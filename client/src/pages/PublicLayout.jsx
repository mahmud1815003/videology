import React from "react";
import { Box, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import PublicTop from "../Component/PublicTop";

const PublicLayout = () => {
  return (
    <Box width={'100%'} height={'100%'}>
      <Box flexGrow={1}>
        <PublicTop />
      </Box>
      {<Outlet />}
    </Box>
  );
};

export default PublicLayout;
