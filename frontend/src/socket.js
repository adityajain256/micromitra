import { io } from "socket.io-client";

export const socket = io("http://10.65.66.125:5001", {
  autoConnect: true,
});
