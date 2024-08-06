// Here is where we import modules
// We begin by loading Express
import express from "express";

const app = express();

app.listen(3000, () => {
  console.log("Listening on port 3000");
});


// Route for landing page 
app.get("/", async (req, res) => {
    res.render("index.ejs");
  });
  
