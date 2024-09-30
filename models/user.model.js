const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {

        firstName: {
            type: String,
            required: true
        },

        lastName: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true
        },

        password: {
            type: String,
            required: true
        },

        incomes: {
            type: Array,
            required: true,
            default: []
        },

        expenses: {
            type: Array,
            required: true,
            default: []
        },

        balances: {
            type: Array,
            required: true,
            default: []
        }
    }
)

const User = mongoose.model("User", userSchema);

module.exports = User;