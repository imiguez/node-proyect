"use strict";

const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const path = require('path');
const app = express();
const parser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const port = 3000;

// Settings
app.set("port", process.env.PORT || port);
app.set("views", path.join(__dirname, "views"));
app.engine(".hbs", handlebars.engine({
  defaultLayout: "main",
  layoutsDir: path.join(app.get("views"), "layouts"),
  partialsDir: path.join(app.get("views"), "partials"),
  extname: ".hbs",
  helpers: require("./lib/handlebars")
}));
app.set("view engine", ".hbs");

// Global methodes
app.use((req, res, next) => {
  next();
});

// MiddleWare 
app.use(session({
  secret: "session",
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore({
    host: "localhost",
    user: "root",
    password: "root",
    database: "nodejs"
  })
}));
app.use(flash());
app.use(morgan('dev'));
app.use(parser.urlencoded({extended: false}));
app.use(parser.json());

// Routes imports
app.use(require('./routes'));
// Routes


// Public 
app.use(express.static(__dirname + "/public"));


// Start Server
app.listen(port, () => {
  console.log("App running on http://localhost:"+port);
});

// app.get('/', (req, res) => {
//     return res.send("Hello");
// });

// app.listen(3000, () => {
//     console.log("App running on http://localhost:3000");
//     process.stdout.write("Nombre: ");
//     process.stdin.on('data', (data) => {
//         name = data.toString();
//         process.stdout.write("Hola "+name);
//         process.exit();
//     })
// })

// var mysql = require('mysql');

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "root"
// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });