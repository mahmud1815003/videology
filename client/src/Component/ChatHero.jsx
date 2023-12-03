import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Typography,
  darken,
} from "@mui/material";
import { orange } from "@mui/material/colors";
import React, { useCallback, useEffect, useRef, useState } from "react";
import VideoChatIcon from "@mui/icons-material/VideoChat";
import { useDispatch, useSelector } from "react-redux";
import { setIncoming, setVideoCall } from "../redux/slice/global";
import peer from "../services/peer";
import io from "socket.io-client";
import ReactPlayer from "react-player";

const socket = io.connect(import.meta.env.VITE_APP_API);

const ChatHero = () => {
  const { email, name } = useSelector((state) => state.auth);
  const { chatId, friendList, incoming } = useSelector((state) => state.global);
  const [stream, setStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [accepted, setAccepted] = useState(false);
  const [sender, setSender] = useState(false);
  const friend = friendList?.filter((fr) => fr.index == chatId);
  const dispatch = useDispatch();
  useEffect(() => {
    socket.emit("setUp", {
      email,
    });
    socket.on("newMessage", async (data) => {
      setSender(data.from);
      dispatch(setIncoming(data));
    });
    socket.on("accepted", handleCallAccepted);
    socket.on("callEnd", () => {
      window.location.reload();
    });
    socket.on("nego:needed", handleNegoNeedIncomming);
    socket.on("nego:final", handleNegoNeedFinal);
    return () => {
      socket.off("newMessage");
      socket.off("accepted");
      socket.off("nego:needed");
      socket.off("nego:final");
    };
  }, []);

  const sendStrem = useCallback((bros) => {
    console.log(bros)
    for (const track of bros.getTracks()) {
      peer.peer.addTrack(track, stream);
    }
  }, [stream]);
  const handleCallAccepted = async (data) => {
    console.log("call Accepted");
    console.log(data);
    peer.setLocalDescription(data.ans);
    setAccepted(true);
    // sendStrem();
  };

  const handleClick = async () => {
    try {
      const mystream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setStream(mystream);
      const offer = await peer.getOffer();
      socket.emit("sendMessage", {
        from: email,
        offer,
        to: friend[0].friend.email,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleIncomingCall = async (data) => {
    try {
      const mystream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setStream(mystream);
      const ans = await peer.getAnswer(incoming.offer);
      socket.emit("accepted", {
        to: incoming.from,
        ans,
        from: email,
      });
      setAccepted(true);
    } catch (error) {
      // console.log(incoming);
      console.log(error);
    }
  };

  const handleNegoNeeded = async () => {
    const offer = await peer.getOffer();
    socket.emit("nego:needed", { offer, to: sender, from: email });
  };

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = async (data) => {
    const ans = await peer.getAnswer(data.offer);
    socket.emit("nego:done", { to: sender, ans, from: email });
  };

  const handleNegoNeedFinal = async (data) => {
    await peer.setLocalDescription(data.ans);
  };

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      console.log(remoteStream);
      setRemoteStream(remoteStream[0]);
    });
  }, []);

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
            {sender ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Typography>{`${sender} is Calling You....`}</Typography>
                <Button
                  variant="contained"
                  onClick={() => handleIncomingCall()}
                  sx={{
                    bgcolor: orange[800],
                    "&:hover": { backgroundColor: darken(orange[800], 0.3) },
                    "&:disabled": { backgroundColor: darken(orange[800], 0.4) },
                  }}
                >
                  Answer Call
                </Button>
              </Box>
            ) : (
              <VideoChatIcon fontSize="inherit" />
            )}
          </Box>
          {!sender ? (
            <Button
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
            </Button>
          ) : null}
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
              mb: 2,
            }}
          >
            <Box>
              {stream && <ReactPlayer playing width="300px" url={stream} />}
              <Typography textAlign={"center"}>You</Typography>
            </Box>
            <Box>
              {accepted ? (
                <Box>
                  <ReactPlayer playing width="300px" url={stream} />
                  <Typography textAlign={"center"}>{friend[0].friend.name}</Typography>
                </Box>
              ) : (
                <Box
                  sx={{
                    width: "300px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <CircularProgress sx={{ color: orange[800] }} />
                  <Typography>Waiting for answer</Typography>
                </Box>
              )}
            </Box>
          </Box>
          <Button
            variant="contained"
            onClick={() => {
              socket.emit('callEnd', {
                to: friend[0].friend.email,
              });
            }}
            sx={{
              bgcolor: orange[800],
              "&:hover": { backgroundColor: darken(orange[800], 0.3) },
              "&:disabled": { backgroundColor: darken(orange[800], 0.4) },
            }}
          >
            End Call
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ChatHero;
