const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors)

/* app.get("/api/users", (req, res) => {
    res.json('test ok')
}) */

app.post('/register', (req, res) => {
    res.json('register ok')
})

app.listen(5000, () => {
    console.log('listening to port 5000...')
})