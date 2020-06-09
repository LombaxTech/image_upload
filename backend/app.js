const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const formidableMiddleware = require('express-formidable');
const app = express();
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: 'dhrowvziz',
    api_key: '574268577399774',
    api_secret: 'kVM_RV4IPwIhz0yxgr5A4UvUS40'
});

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
// app.use(formidableMiddleware());

// * Routes
const fileRoutes = require('./routes/file');
const cloudFileRoutes = require('./routes/cloudFile');

// * Route middleware
// app.use('/api', fileRoutes);
app.use('/api', cloudFileRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log('started listening'));