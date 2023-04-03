const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')

// Middleware (to fire every request)
app.use(express.json()) // Looks for request body
app.use(morgan('dev')) // Logs all requests to server

// Connect to DB
mongoose.connect('mongodb://localhost:27017/animelistdb', {useNewUrlParser: true})
    .then(() => console.log("Connected to DB"))
    .catch(err => console.error(err))

// Routes //
app.use("/animes", require("./routes/animeListRouter"))

// Error Handler
app.use((err, req, res, next) => {
    console.log(err)
    return res.send({errMsg: err.message})
})

// Server Listen //

app.listen(9000, () => {
    console.log("The server is running on Port 9000")
})