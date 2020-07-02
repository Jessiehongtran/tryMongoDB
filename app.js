const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
require('dotenv/config')

app.use(bodyParser.json())


//import Routes
const postsRoute = require('./routes/posts');

app.use('/posts', postsRoute)

//ROUTES
app.get('/', (req,res) => {
    res.send('we are on home')
})

app.get('/posts', (req,res) => {
    res.send('we are on posts')
})

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true } , () => {
    console.log('connected to DB!')
})

//How do we start listening to the server
app.listen(3000)