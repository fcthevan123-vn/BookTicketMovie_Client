import { io, Socket } from "socket.io-client";

const socket: Socket = io("http://localhost:3001", {
  transports: ["websocket"],
});

socket.on("connect_error", (err) => {
  console.log(err.message);
});

export default socket;
