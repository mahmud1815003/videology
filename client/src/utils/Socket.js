import { io } from "socket.io-client";

export const socket = io(import.meta.env.VITE_APP_API, {
  autoConnect: true,
  auth: {
    token: JSON.parse(localStorage?.getItem('auth'))?.token
  },
});
