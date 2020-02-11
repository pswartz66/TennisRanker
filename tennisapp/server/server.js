const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes');
const app = express();
const port = 3000;

//views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.engine("html", require("ejs").renderFile);

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//Use routes
app.use(routes);

// app.use("/", index);
// app.use("/api", users);

app.listen(port, function() {
    console.log("Server running on port ", port);
});
