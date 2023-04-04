require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const User = require('./models/User')

const app = express()

app.use(cors())
app.use(express.json())

/* app.get("/api/users", (req, res) => {
    res.json('test ok')
}) */

app.post('/register', async (req, res) => {
    const { username, password } = req.body
    
    try {
        const newUser = await User.create({ username, password })
        res.status(200).json(newUser)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

// connect to db
mongoose.connect(process.env.DB_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`connected to db and listening on port ${process.env.PORT}`)
        });
    })
    .catch( (err) => console.log(err) )