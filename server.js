// Here is where we import modules
// We begin by loading Express
import dotenv from "dotenv"; 
dotenv.config();
import express from "express";
import mongoose from "mongoose";






const app = express();

app.get("/", async (req, res) => {
    res.render("index.ejs");
  });

app.listen(3000, () => {
  console.log("Listening on port 3000");
});




  
