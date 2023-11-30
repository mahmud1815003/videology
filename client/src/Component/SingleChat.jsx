import React, { useEffect } from "react";
import {
  Avatar,
  Box,
  ListItemButton,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useAddFriendMutation, useSingleFriendMutation } from "../redux/api/auth";
import { grey } from "@mui/material/colors";
import { insertFriend, setChatId } from "../redux/slice/global";

const SingleChat = ({fr, index}) => {
    const {email} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const friendEmail = fr['friend1'] == email ? fr['friend2'] : fr['friend1'];
    const [singleFriend,{data : friendData, isLoading, isSuccess, error}] = useSingleFriendMutation();
    useEffect(() => {
      if(friendEmail != email){
        singleFriend({
          email: friendEmail,
        })
      }
    }, [friendEmail]);
    useEffect(() => {
      if(isSuccess){
        dispatch(insertFriend({
          data: friendData,
          index,
        }));
      }
    }, [isSuccess]);
  return (
    <ListItemButton onClick={() => dispatch(setChatId(index))}>
      {friendData && <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          borderBottom: 1,
          width: "100%",
          pb: 2,
        }}
      >
        <Avatar alt={`${friendData.name}`} src="broken.png" variant="circular" />
        <Box>
          <Typography>{friendData.name}</Typography>
          <Typography sx={{ fontSize: "10px", color: grey[500] }}>{friendData?.email}</Typography>
        </Box>
      </Box>}
    </ListItemButton>
  );
};

export default SingleChat;
