const express = require("express");
const dbconnect = require("./config/DB_Connect");
const dotenv = require("dotenv")

const app = express();
dotenv.config();
app.use(express.json());

const PORT = process.env.PORT || 3000;
dbconnect();



app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.post("/data", (req, res) => {
  const body = req.body;
  res.json({ message: "Data received", data: body });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
