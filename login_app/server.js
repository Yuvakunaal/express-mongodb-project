const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const path = require("path");

const app = express();

// env file setup in js
dotenv.config({ path:'config.env' });
const port = process.env.PORT || 8080;

app.get("/",(req,res) => {
    res.send("hello");
})

// log request
app.use(morgan('tiny'));

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended:true }));

// set view engine
app.set("view engine","ejs");
// app.set("views",path.resolve(__dirname,"views/ejs"));

// load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")));
app.use('/img',express.static(path.resolve(__dirname,"assets/img")));
app.use('/js',express.static(path.resolve(__dirname,"assets/js")));

app.listen(port,() => {
    console.log(`Running on http://localhost:${port}`);
});