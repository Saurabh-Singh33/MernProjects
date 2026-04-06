const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const app = express();
app.use(express.json());


const SECRET_KEY = "abcde12345";
const user = [];

// REGISTER ROUTE
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (user.find((u) => u.username === username)) {
    return res.status(409).json({ message: "User already exists" });
  }
  

  const hashedPassword = await bcrypt.hash(password, 10);
  user.push({ username, password: hashedPassword });

  res.status(201).json({ message: "User registered successfully" });
});


// LOGIN ROUTE (Generates Token)
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const existingUser = user.find((u) => u.username === username);
  if (!existingUser) {
    return res.status(404).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, existingUser.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { username: existingUser.username },
    SECRET_KEY,
    { expiresIn: "1h" }
  );

  res.json({
    message: "Login successful",
    token: token,
  });
});


// JWT MIDDLEWARE (Outside routes)
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  jwt.verify(token, SECRET_KEY, (err, decodedUser) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = decodedUser;
    next();
  });
}


//  PROTECTED ROUTE
app.get("/profile", authenticateToken, (req, res) => {
  res.json({
    message: "Welcome to protected route",
    user: req.user,
  });
});


app.listen(3001, () =>
  console.log("Server running on http://localhost:3001")
);