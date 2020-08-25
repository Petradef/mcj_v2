const mysql = require("mysql");
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const path = require("path");
const port = process.env.PORT || 3005;

//memanggil variabel app untuk menggunakan function dari express
app.use(bodyParser.json());
app.use(cors());

//konek ke db_asset di tampung ke variabel mysqlConnection
const mysqlConnection = mysql.createConnection({
  // host: "localhost",
  // user: "root",
  // password: "",
  // database: "db_asset",
  host: "185.201.9.121",
  user: "root",
  password: "Citrajkt1",
  database: "db_asset",
});

mysqlConnection.connect();

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", function (request, response) {
  response.sendFile(path.join(__dirname + "/login.html"));
});

app.post("/auth", function (request, response) {
  var username = request.body.username;
  var password = request.body.password;
  if (username && password) {
    mysqlConnection.query(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password],
      function (error, results, fields) {
        if (results.length > 0) {
          request.session.loggedin = true;
          request.session.username = username;
          response.redirect("/home");
        } else {
          response.send("Incorrect Username and/or Password!");
        }
        response.end();
      }
    );
  } else {
    response.send("Please enter Username and Password!");
    response.end();
  }
});

app.get("/home", function (request, response) {
  if (request.session.loggedin) {
    response.send("Welcome back, " + request.session.username + "!");
  } else {
    response.send("Please login to view this page!");
  }
  response.end();
});
app.listen(port, () => {
  console.log("Express server running in port 3005");
});
