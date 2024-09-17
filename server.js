const express = require('express');
const {readFile} = require('fs');
const path = require('path');
const app = express();

app.set("view engine", "ejs");

app.use(express.static('public'));
app.use(express.static('public/js'));

app.get("/", (req, res) => {
    try{
        res.sendFile(path.join(__dirname, 'public/html/landing.html'));
    } catch(err){
        res.status(404).send('Not Found!');
    }
})

app.get("/login", (req, res) => {
    res.render("users/login")
})

app.get("/users/landing", (req, res) => {


    res.render("users/landing", {name: "Adam "});

});

app.listen(3000, () => {console.log("Server started on port 3000: https//:localhost:3000")});

