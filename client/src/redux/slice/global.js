import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatId: undefined,
  friendList: [],
  friendEmails: [],
  videoCall: false,
  incoming: undefined,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setVideoCall: (state, action) => {
      state.videoCall = state.videoCall == true ? false : true;
    },
    setChatId: (state, action) => {
      state.chatId = action.payload;
    },
    insertFriend: (state, action) => {
      if (state.friendEmails.indexOf(action.payload.email) == -1) {
        state.friendList.push({
          friend: action.payload.data,
          index: action.payload.index,
        });
        state.friendEmails.push(action.payload.data.email);
      }
    },
    setIncoming: (state, action) => {
       state.incoming = action.payload;
    }
  },
});

export default globalSlice;
export const { setChatId, insertFriend, setVideoCall, setIncoming } = globalSlice.actions;
