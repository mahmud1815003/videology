import { Drawer, List, ListItem } from "@mui/material";
import React from "react";

const data = ["Login", "SignUp"];

const CustomDrawer = ({ state, setState }) => {
  return (
    <Drawer
      anchor={"top"}
      open={state}
      onClose={() => setState((prev) => !prev)}
    >
      {data?.map((li) => {
        return (
          <List key={li}>
            <ListItem>{li}</ListItem>
          </List>
        );
      })}
    </Drawer>
  );
};

export default CustomDrawer;
