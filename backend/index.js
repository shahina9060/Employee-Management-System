const express = require("express");
const app = express();
const cors = require('cors');
const routes = require('./routes/userRoute')
const dotenv = require('dotenv');
const connectdb =  require('./config/connentdb')

// Middleware to parse incoming request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origine: "http://localhost:3000",
  credentials: true
}))

dotenv.config();

// Connect to MongoDB
connectdb(process.env.url);

app.use(routes)

// Start the server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
