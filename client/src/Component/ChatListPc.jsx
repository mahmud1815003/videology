import React, { useEffect } from "react";
import {
  Avatar,
  Box,
  Card,
  Divider,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import SingleChat from "./SingleChat";
import { useAllFriendsQuery } from "../redux/api/auth";
import { useDispatch, useSelector } from "react-redux";
import { setEmail } from "../redux/slice/auth";

const ChatListPc = () => {
  const {data, isError, isLoading, isSuccess} = useAllFriendsQuery();
  const token = useSelector(state => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if(isSuccess){
      dispatch(setEmail(data.email));
    }
  }, [isSuccess]);
  return (
    <Card sx={{ height: '90vh', overflow: 'auto', bgcolor: (theme) => theme.palette.primary.contrastText }}>
      {(data?.friends && data?.friends?.length > 0) ? <List>
        {data?.friends?.map((friend, index) => {
          return <SingleChat fr={friend} index={index} />
        })}
      </List> : <Typography textAlign={'center'} sx={{pt: 2}}>No Friends</Typography>}
    </Card>
  );
};

export default ChatListPc;
