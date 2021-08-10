const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const controllers = require("./controllers");
const dotenv = require("dotenv")
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:3000", "https://ssg-ga.click"],
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
  })
);
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/user/signup", controllers.signup);
app.post("/user/signin", controllers.signin);
app.get("/user/auth", controllers.auth);
app.get("/user/signout", controllers.signout);
app.post("/user/validation", controllers.validation);
app.patch("/user", controllers.edituser);
app.delete("/user", controllers.deleteuser);

app.get("/article", controllers.getArticleList);
app.post("/article", controllers.postArticle);
app.get("/article/id/:articleId", controllers.getSingleArticle);
app.patch("/article/id/:articleId", controllers.editArticle);
app.delete("/article/id/:articleId", controllers.deleteArticle);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.SERVER_PORT}`);
});
