const { io } = require("socket.io-client");

// Replace with your actual JWT token
const token =
  "eyJpZCI6MSwiaWF0IjoxNzU1NzU4ODU1fQ.R2xlIXGm9JmORYRVVEhYjxSGGvJAS4TZSt1P06Z1DY4";

const socket = io("http://localhost:4000", {
  path: "/socket.io",
  auth: { token },
});

socket.on("connect", () => {
  console.log("Connected:", socket.id);

  // List messages
  socket.emit("LIST_MESSAGES", { conversationId: "abc123" }, (res) => {
    console.log("LIST_MESSAGES response:", res);
  });

  // Send a message
  socket.emit(
    "SEND_MESSAGE",
    {
      conversationId: "abc123",
      toUserId: "user2",
      content: "Hello!",
    },
    (res) => {
      console.log("SEND_MESSAGE response:", res);
    }
  );
});

socket.on("NEW_MESSAGE", (payload) => {
  console.log("Received NEW_MESSAGE:", payload);
});

socket.on("disconnect", (reason) => {
  console.log("Disconnected:", reason);
});
