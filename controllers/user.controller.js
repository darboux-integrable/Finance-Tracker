const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");

const getUser = async (req, res) => {

    try{
        const { id } = req.params;
        const user = await User.findById(id);

        res.status(201).json(user);
    } catch (error) {

        res.status(500).send("Was unable to get the user");

    }

}

const addUser = async (req, res) => {

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = {
        name: req.body.name,
        password: hashedPassword,
        incomes: req.body.incomes,
        expenses: req.body.expenses,
        balances: req.body.balances
    }

    await User.create(user);

    res.status(201).json(user);

}

module.exports = {

    getUser,
    addUser

}