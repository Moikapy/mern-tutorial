const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;
//Routes
const auth = require('./src/routes/api/auth')
const profile = require('./src/routes/api/profile')
const posts = require('./src/routes/api/posts')
//DB CONFIG
const db = require('./src/config/key').mongoURI;

//Connect to MongoDB
mongoose
    .connect(db, {
        useNewUrlParser: true
    })
    .then(() => console.log(`MongoDB Connected`))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Hello!')
});
//USE ROUTES
app.use('/api/auth', auth);
app.use('/api/profile', profile);
app.use('/api/posts', posts)

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});