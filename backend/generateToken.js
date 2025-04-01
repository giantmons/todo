const jwt = require("jsonwebtoken");

const token = jwt.sign(
  { userId: "67ea805ffbcb34964325212e" }, // Replace with actual user ID
  "myverysecuresecretkey", // Replace with process.env.JWT_SECRET
  { expiresIn: "1h" }
);

console.log("Generated Token:", token);
