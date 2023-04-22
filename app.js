const express = require("express");
const morgan = require("morgan");
const session = require("express-session");

let VAR = "";
let STO = "";
let SES = "";

const app = express();
const PORT = 4000;

app.set("view engine", "pug");
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "FOURLEAF",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.get("/", (req, res, next) => {
  res.render("index");
});

// Variable
app.post("/va", (req, res, next) => {
  const target = req.body.target;
  //console.log(target);
  VAR = target;

  res.render("index", { VAR, STO, SES });
});

// Storage
app.post("/st", (req, res, next) => {
  const target = req.body.target;
  //console.log(target);

  res.render("index", { VAR, STO, SES });
});

// Cookie Session : 다른곳(다른 스코프) 에서 도 사용가능
app.post("/cs", (req, res, next) => {
  const target = req.body.target;
  //console.log(target);
  req.session.cs = target;

  SES = req.session.cs;

  res.render("index", { VAR, STO, SES });
});

app.listen(PORT, () => {
  console.log(`🍏${PORT} SERVER START`);
});
