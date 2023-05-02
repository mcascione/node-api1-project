// BUILD YOUR SERVER HERE
const express = require('express');
const User = require('./users/model');
const server = express();
server.use(express.json());

//get request
server.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({
            message: `Error fetching users: ${err.message}`
        });
    }
})


module.exports = server; // EXPORT YOUR SERVER instead of {}
