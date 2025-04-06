const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes"); //import authentication routes (authRoutes.js)
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config(); //load environment variables from .env file

const app = express();
app.options('*', cors()); // Handle preflight requests for all routes
app.use(express.json()); //parse incoming JSON body parsing
app.use(express.urlencoded({ extended: true })); // (Optional) Handle form data
app.use("/api/auth", authRoutes) //Use authentication routes
app.use("/api/tasks", taskRoutes); //Use task routes
app.use("/api/user", userRoutes) //Use user routes

const allowedOrigins = ['http://localhost:5173', 'https://todo-orcin-nine-81.vercel.app'];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.get("/", (req, res) => { //route that listens for GET requests
    res.send("API is running...")
})

mongoose.connect(process.env.MONGO_URI)  //Connects to MongoDB using the connection stored in .env
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}`))