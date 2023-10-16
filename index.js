const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')


const app = express();
require('./src/Config/Config');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(cors());


// const authRoutes = require('./src/Routes/AuthRoutes');
const allowedOrigins = ['http://localhost:4200'];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

// Apply the CORS middleware
app.use(cors(corsOptions));

const authRoutes = require('./src/Routes/AuthRoutes');
const productRoutes = require('./src/Routes/productRoute');

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);


// function verifyToken(req, res, next) {
    //     console.log("verify token called")
    //     const token = req.headers['authorization']; // Assuming the token is in the 'Authorization' header
    
    //     if (!token) {
    //         return res.status(403).json({ error: 'Token is missing' });
    //     }
    
    //     jwt.verify(token, secretKey, (err, decoded) => {
    //         if (err) {
    //             return res.status(401).json({ error: 'Token is invalid' });
    //         }
    //         req.user = decoded;
    //         next(); // Proceed to the protected route
    //     });
    // }



const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));