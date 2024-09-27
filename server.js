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
    res.send("Working");
})

app.get("/users/:id", (req, res) => {
    res.send("working");
})

app.get("/users/:id/landing", (req, res) => {
    res.render("users/landing", {name: "Adam Evans"});
});

app.get("/users/:id/incomes", (req, res) => {
    res.render("users/incomes");
})

app.get("/users/:id/expenses", (req, res) => {
    res.render("users/expenses");

})

app.get("/users/:id/balances", (req, res) => {
    res.render("users/balances");
})

app.listen(3000, () => {console.log("Server started on port 3000: http//:localhost:3000")});

