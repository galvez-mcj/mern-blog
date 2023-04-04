require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bcrpyt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('./models/User')

const app = express()

app.use(cors({ credentials: true,
                origin: 'http://localhost:3000'
            }))
app.use(express.json())

// for password hiding
const salt = bcrpyt.genSaltSync(16)
const secret = process.env.SECRET

app.post('/register', async (req, res) => {
    const { username, password } = req.body
    
    try {
        const newUser = await User.create({ 
            username, 
            password: bcrpyt.hashSync(password, salt)
        })
        res.status(200).json(newUser)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

// establish token 
app.post('/login', async (req, res) => {
    const { username, password } = req.body

    const user = await User.findOne({ username })
    const passOk = bcrpyt.compareSync(password, user.password)
    
    if (passOk) {
        // logged in
        jwt.sign({ username, id:user._id }, secret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json('ok')
        })
    } else {
        res.status(400).json('wrong credentials')
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