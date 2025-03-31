const jwt = require("jsonwebtoken");

const token = jwt.sign(
  { userId: "65123456789abcdef12345678" }, // Replace with actual user ID
  "myverysecuresecretkey", // Replace with process.env.JWT_SECRET
  { expiresIn: "1h" }
);

console.log("Generated Token:", token);
