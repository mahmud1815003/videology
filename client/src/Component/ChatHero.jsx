import { Avatar, Box, Button, Typography, darken } from "@mui/material";
import { orange } from "@mui/material/colors";
import React, { useEffect, useRef, useState } from "react";
import VideoChatIcon from "@mui/icons-material/VideoChat";
import { useDispatch, useSelector } from "react-redux";
import { setVideoCall } from "../redux/slice/global";
import peer from '../services/peer';
import io from "socket.io-client";
import ReactPlayer from "react-player";

const socket = io.connect(import.meta.env.VITE_APP_API);

const ChatHero = () => {
  const { email } = useSelector((state) => state.auth);
  const { chatId, friendList } = useSelector((state) => state.global);
  const [stream, setStream] = useState();
  const [sender, setSender] = useState(false);
  const friend = friendList?.filter((fr) => fr.index == chatId);
  const dispatch = useDispatch();
  useEffect(() => {
    socket.emit("setUp", {
      email,
    });
    socket.on("newMessage", (data) => {
      console.log(data);
      setSender(data.from);
    });
    return () => {
      socket.off("newMessage");
    };
  }, []);
  const handleClick = async () => {
    try{
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      }); 
      setStream(stream);
      const offer = await peer.getOffer();
      socket.emit("sendMessage", {
        from: email,
        offer,
        to: friend[0].friend.email,
      });
    }catch(error){
      console.log(error);
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
      }}
    >
      {!stream ? (
        <>
          <Box sx={{ fontSize: "80px" }}>
            {sender ? <Box>
              <Typography>{`${sender} is Calling You....`}</Typography>
              <Button variant="contained" color="primary">Answer Call</Button>
            </Box> :<VideoChatIcon fontSize="inherit" />}
          </Box>
          {!sender ? <Button
            sx={{
              bgcolor: orange[800],
              "&:hover": { backgroundColor: darken(orange[800], 0.3) },
              "&:disabled": { backgroundColor: darken(orange[800], 0.4) },
            }}
            // disabled
            variant="contained"
            onClick={() => handleClick()}
          >
            Start a Video Call
          </Button> : null}
        </>
      ) : (
        <Box>
          <Box>
            {stream && (
              <ReactPlayer
                playing
                height="100px"
                width="200px"
                url={stream}
              />
            )}
          </Box>
          <Box>
            <ReactPlayer
              playing
              height="100px"
              width="200px"
              url={stream}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ChatHero;
