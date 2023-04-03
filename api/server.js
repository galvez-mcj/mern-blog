const express = require('express')
const app = express()

app.get("/api/users", (req, res) => {
    res.json('test ok')
})

app.listen(5000, () => {
    console.log('listening to port 5000...')
})