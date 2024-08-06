// Here is where we import modules
// We begin by loading Express
import dotenv from "dotenv"; 
dotenv.config();
import express from "express";
import mongoose from "mongoose";
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });

const app = express();

app.listen(3000, () => {
  console.log("Listening on port 3000");
});


// Route for landing page 
app.get("/", async (req, res) => {
    res.render("index.ejs");
  });
  
