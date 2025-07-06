const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes')
const cartRoutes = require('./routes/cartRoutes')
dotenv.config();
const app = express();
app.use(cors());

connectDB();
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users',userRoutes);
app.use('/api/cart',cartRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));