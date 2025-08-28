const { io } = require("socket.io-client");

// Replace with your actual JWT token
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzU1NzU4ODU1fQ.R2xlIXGm9JmORYRVVEhYjxSGGvJAS4TZSt1P06Z1DY4";

const socket = io("http://localhost:4000", {
  path: "/socket.io",
  auth: { token },
});

socket.on("connect", () => {
  console.log("Connected:", socket.id);

  // List conversation messages
  socket.emit(
    "LIST_MESSAGES",
    { conversationId: "68b002eaaf68103a2fd91c30" },
    (res) => {
      console.log("LIST_CONVERSATION_MESSAGES response:", res);
    }
  );

  // Send a message to a conversation
  socket.emit(
    "SEND_MESSAGE",
    {
      conversationId: "abc123",
      toUserId: "user2",
      content: "Hello from socket client!",
    },
    (res) => {
      console.log("SEND_CONVERSATION_MESSAGE response:", res);
    }
  );
});

// Listen for new incoming messages in a conversation
socket.on("NEW_CONVERSATION_MESSAGE", (payload) => {
  console.log("Received NEW_CONVERSATION_MESSAGE:", payload);
});

socket.on("disconnect", (reason) => {
  console.log("Disconnected:", reason);
});
