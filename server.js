const express = require("express")
const http = require("http")
const app = express()
const cors = require('cors')
const server = http.createServer(app)
const io = require("socket.io")(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: [ "GET", "POST" ]
	}
})
const userSocketMap = {};

// app.use(cors());
// app.use(express.json());

io.on("connection", (socket) => {
	const socketid=socket.id
	socket.emit("me", socketid)
	console.log('Socket id:',socket.id)

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	})

	 // Register user with socket ID
	 socket.on("register", (data) => {
		const { sender } = data;
		userSocketMap[sender] = socket.id;
		console.log(`User registered: ${sender} with socket ID: ${socket.id}`);
	  });
	
	  // Handle request for target user's socket ID
	  socket.on("requestSocketId", (data) => {
		const { targetUserId } = data;
		const socketId = userSocketMap[targetUserId];
		if (socketId) {
		  socket.emit("receiveSocketId", { socketId });
		} else {
		  socket.emit("receiveSocketId", { socketId: null });
		}
	  });

	  

	socket.on("callUser", (data) => {
		io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
	})

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	})
})

server.listen(5000, () => console.log("server is running on port 5000"))