const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {

        name: {
            username: String,
            required: true
        },

        password: {
            type: String,
            required: true
        },

        incomes: {
            type: Array,
            required: false,
            default: []
        },

        expenses: {
            type: Array,
            required: false,
            default: []
        },

        budgets: {
            type: Array,
            required: false,
            default: []
        }
    }
)

const User = mongoose.model("User", userSchema);

module.exports = User;