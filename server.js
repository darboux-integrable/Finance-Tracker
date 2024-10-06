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

app.post("/login", async (req, res) => {

    try {
        const email = req.body.email;
        const users = await User.find({email: email});

        if(users.length == 0){
            res.status(404).json({message: "User not"});
            return;
        }

        const user = users[0];

        if(await bcrypt.compare(req.body.password, user.password)){
            res.status(200).json(user);
        } else {
            res.status(404).json({message: "The password does not match"});
        }

    } catch (error) {
        res.status(500).json({message: "Internal Server Error", error: error.toString()})
    }

})

app.get("/sign-up", (req, res) => {
    res.render("users/signUp");
})

app.get("/users/:id/landing", async (req, res) => {
    res.status(200).render("users/landing");
})

app.post("/sign-up", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const userParams = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
            incomes: req.body.incomes,
            expenses: req.body.expenses, 
            balances: req.body.balances
        };

        const user = await User.create(userParams);

        res.status(201).json(user);

    } catch (error) {
        
    }

})

app.get("/users/:id/incomes", (req, res) => {
    res.render("users/incomesOrExpenses", {pageType: "Income"});
})

app.put("/users/:id/incomes", async (req, res) => {
    try {
        const { id } = req.params;

        const updatedUser = await User.findByIdAndUpdate(id, req.body); 

        if(!updatedUser){
            res.status(404).json({message: "User was not found"})
            return;
        }

        // Test to see if the user has been updated. 
        //const user = await User.findById(id);
        //console.log(updatedUser, user);

    } catch (error) {
        res.status(500).json({message: "Internal Server Error"});
    }   
})

app.get("/users/:id/expenses", (req, res) => {
    res.render("users/incomesOrExpenses", {pageType: "Expense"});
})

app.get("/users/:id/balances", (req, res) => {
    res.render("users/balances");
})

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

