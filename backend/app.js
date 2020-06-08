const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const formidableMiddleware = require('express-formidable');
const app = express();

mongoose.connect('mongodb://user:userPass123@ds119548.mlab.com:19548/image_upload', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('connected to db'))
    .catch(err => console.log(err))

// * Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(formidableMiddleware());

// * Routes
const fileRoutes = require('./routes/file');
// const authRoutes = require('./routes/auth');

// * Route middleware
app.use('/api', fileRoutes);
// app.use('/api', authRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log('started listening'));