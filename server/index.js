const express = require("express");
const app = express();
const cors = require("cors");
const controllers = require("./controllers");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["https://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/user/signup", controllers.signup);

app.listen(4000, () => {
  console.log(`Example app listening at http://localhost:4000`);
});
