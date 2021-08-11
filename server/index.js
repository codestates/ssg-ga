const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const controllers = require("./controllers");
const {
  getArticleList,
  getCategorizedArticleList,
  postArticle,
  getSingleArticle,
  editArticle,
  deleteArticle,
  likebtn
} = require("./controllers")
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

app.post(
  "/user/image",
  controllers.userimage.upload.single("image"),
  controllers.userimage.sendPost
);
app.post("/user/signup", controllers.signup);
app.post("/user/signin", controllers.signin);
app.get("/user/auth", controllers.auth);
app.get("/user/signout", controllers.signout);
app.post("/user/validation", controllers.validation);
app.patch("/user", controllers.edituser);
app.delete("/user", controllers.deleteuser);
app.post("/user/oauth", controllers.oauth);

app.get("/article", getArticleList);
app.get("/article/category", getCategorizedArticleList);
app.post("/article", postArticle);
app.get("/article/id/:articleId", getSingleArticle);
app.patch("/article/id/:articleId", editArticle);
app.delete("/article/id/:articleId", deleteArticle);
app.post("/article/likebtn", likebtn);

app.listen(process.env.SERVER_PORT, () => {
  console.log(
    `Example app listening at http://localhost:${process.env.SERVER_PORT}`
  );
});
