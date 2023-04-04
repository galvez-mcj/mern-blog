require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bcrpyt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

// models
const User = require('./models/User')
const Post = require('./models/Post')

// for blog data
const fs = require('fs')
const multer = require('multer')
const uploadMiddleware = multer({ dest: 'uploads/' })

const app = express()

app.use(cors({ credentials: true,
                origin: 'http://localhost:3000'
            }))
app.use(express.json())
app.use(cookieParser())

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
        jwt.sign({ username, id: user._id }, secret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json({
                id: user._id,
                username
            })
        })
    } else {
        res.status(400).json('wrong credentials')
    }
    
})

// successful login will redirect to profile
app.get('/profile', (req, res) => {
    const { token } = req.cookies
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) throw err;
        res.json(info)
    })
})

// logout
app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok')
})

// create new blog post
app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
    const { originalname, path } = req.file
    const parts = originalname.split('.')
    const ext = parts[parts.length - 1]
    const newPath = path + '.' + ext
    fs.renameSync(path, newPath)

    // save to db
    const { title, summary, content } = req.body
    const newPost = await Post.create({
        title,
        summary,
        content,
        cover: newPath
    })

    res.json(newPost)
})


// connect to db
mongoose.connect(process.env.DB_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`connected to db and listening on port ${process.env.PORT}`)
        });
    })
    .catch( (err) => console.log(err) )