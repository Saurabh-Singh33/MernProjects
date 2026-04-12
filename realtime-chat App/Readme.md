💬 Real-Time Chat Application (Socket.IO)

A modern real-time chat application that enables instant messaging using Node.js, Express, and Socket.IO.
Users can join chat rooms and communicate instantly with multiple users.

🚀 Features
🔴 Real-time messaging using WebSockets
👥 Multiple users can join the chat simultaneously
🏠 Join custom chat rooms
📢 User join/leave notifications
⏱️ Live message timestamps
🎨 Modern responsive UI
⚡ Fast and lightweight backend
🛠️ Tech Stack

Frontend

HTML
CSS
JavaScript

Backend

Node.js
Express.js
Socket.IO
📂 Project Structure
Realtime-Chat-App
│
├── public
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── server.js
├── package.json
└── README.md
⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/your-username/realtime-chat-app.git
cd realtime-chat-app
2️⃣ Install Dependencies
npm install
3️⃣ Run the Server
node server.js

OR (if using nodemon)

npm run dev
4️⃣ Open in Browser
http://localhost:3000
🔌 How Socket.IO Works in This Project
User opens the app → client connects to Socket.IO server
Server creates a WebSocket connection
When a user sends a message:
Message is emitted to server
Server broadcasts to all connected clients
All users receive the message instantly ⚡
📡 Socket Events Used
Event	Description
connection	Triggered when user connects
joinRoom	User joins a chat room
message	Send message to room
disconnect	Triggered when user leaves
🧠 Future Improvements
Private messaging (1-to-1 chat)
Typing indicator ✍️
Online/offline status 🟢
File & image sharing 📎
Emoji support 😀
Authentication & user profiles 🔐
Database integration (MongoDB)
🤝 Contributing

Pull requests are welcome!
For major changes, please open an issue first to discuss what you would like to change.

📜 License

This project is licensed under the MIT License.

⭐ Support

If you like this project, give it a ⭐ on GitHub!