const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const port = process.env.PORT || 5000;
// Set Express as App
const app = express();
//Routes
const auth = require('./routes/api/auth')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')
//DB CONFIG
const db = require('./config/key').mongoURI;
// Body Parser Middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json())
//Connect to MongoDB
mongoose
    .connect(db, {
        useNewUrlParser: true
    })
    .then(() => console.log(`MongoDB Connected`))
    .catch(err => console.log(err));
// Passport Middleware
app.use(passport.initialize());

//Passport Config
require('./config/passport')(passport);

//USE ROUTES
app.use('/api/auth', auth);
app.use('/api/profile', profile);
app.use('/api/posts', posts)

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});