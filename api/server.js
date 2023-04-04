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
app.use('/uploads', express.static(__dirname + '/uploads'));

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

    // get token to attach post to specific user
    const { token } = req.cookies
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;

        // save to db
        const { title, summary, content } = req.body
        const newPost = await Post.create({
            title,
            summary,
            content,
            cover: newPath,
            author: info.id
        })
        res.json(newPost)
    })
})

// edit a blog post 
app.put('/post', uploadMiddleware.single('file'), async (req, res) => {
    let newPath = null

    // checks if there is a new file added
    if (req.file) {
        const { originalname, path } = req.file
        const parts = originalname.split('.')
        const ext = parts[parts.length - 1]
        newPath = path + '.' + ext
        fs.renameSync(path, newPath)
    }

    const { token } = req.cookies
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;

        const { id, title, summary, content } = req.body
        const post = await Post.findById(id)
        const isAuthor = JSON.stringify(post.author) === JSON.stringify(info.id)

        if (!isAuthor) {
            return res.status(400).json('you are not the author of this post');
        }
        
        await post.update({
            title,
            summary,
            content,
            cover: newPath ? newPath : post.cover
        })

        res.json(post)
    }) 
})

// get all blog posts
app.get('/posts', async (req, res) => {
    const posts = await Post.find()
                    .populate('author', ['username'])
                    .sort({ createdAt: -1 })
                    .limit(20)
    res.json(posts)
})

// get a single blog post
app.get('/post/:id', async (req, res) => {
    const { id } = req.params
    const post = await Post.findById(id)
                    .populate('author', ['username'])
    res.json(post)
})


// connect to db
mongoose.connect(process.env.DB_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`connected to db and listening on port ${process.env.PORT}`)
        });
    })
    .catch( (err) => console.log(err) )