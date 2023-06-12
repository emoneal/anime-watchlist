const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const path = require("path")

// Middleware (to fire every request)
app.use(express.json()) // Looks for request body
app.use(morgan('dev')) // Logs all requests to server

// Connect to DB
mongoose.connect(
    `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@cluster0.k5floph.mongodb.net/`,
    () => console.log('Connected to the DB')
  )

// Routes //
app.use(express.static(path.join(__dirname, "client", "build")))
app.use("/animes", require("./routes/animeListRouter"))


// Error Handler
app.use((err, req, res, next) => {
    console.log(err)
    return res.send({errMsg: err.message})
})

// Server Listen //

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });

app.listen(9000, () => {
    console.log("The server is running on Port 9000")
})