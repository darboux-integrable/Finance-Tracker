const express = require('express');
const {readFile} = require('fs');
const path = require('path');
const app = express();

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

app.set("view engine", "ejs");

app.use(express.json());
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

mongoose.connect("mongodb+srv://adamevanswork1:Ujthnje8@backenddb.jw0vt.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB")
    .then(() => {
        console.log("Connected to the database");
        app.listen(3000, () => {
            console.log("Listing on port 3000")
        })
    })
    .catch(err => {
        console.log("Unable to connect to the database");
        console.log(err)
    })

