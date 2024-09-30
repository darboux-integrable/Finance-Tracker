const express = require('express');
const path = require('path');
const app = express();

const User = require("./models/user.model.js")

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.static('public'));
app.use(express.static('public/js')); // Possibly delete later 

app.get("/", (req, res) => {
    try{
        res.sendFile(path.join(__dirname, 'public/html/landing.html'));
    } catch(err){
        res.status(404).send('Not Found!');
    }
})

app.get("/login", (req, res) => {
    res.render("users/login");
})

app.get("/sign-up", (req, res) => {
    res.render("users/signUp");
})

app.get("/sign-up/:email", async (req, res) => {
    
    try {
        const { email } = req.params;
        const users = await User.find({"email": email});
        
        res.status(200).json(users);

    } catch (error) {
        
    }

    res.status(200).json({message: "The test is working"})

})

app.post("/sign-up/:email", async (req, res) => {

    try {

        const user = await User.create(req.body);
        
        res.status(200).json(user);
    } catch (error) {
        
    }

})

// app.get("/users/:id", (req, res) => {
//     res.send("working");
// })

// app.get("/users/:id/landing", (req, res) => {
//     res.render("users/landing", {name: "Adam Evans"});
// });

// app.get("/users/:id/incomes", (req, res) => {
//     res.render("users/incomes");
// })

// app.get("/users/:id/expenses", (req, res) => {
//     res.render("users/expenses");

// })

// app.get("/users/:id/balances", (req, res) => {
//     res.render("users/balances");
// })

mongoose.connect("mongodb+srv://adamevanswork1:Ujthnje8@backenddb.jw0vt.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB")
    .then(() => {
        console.log("Connected to the database");
        app.listen(3000, () => {
            console.log("Listing on port 3000");
        })
    })
    .catch(err => {
        console.log("Unable to connect to the database");
        console.log(err);
    })

