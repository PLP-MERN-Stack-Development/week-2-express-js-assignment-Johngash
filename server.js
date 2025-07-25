// server.js - Starter Express server for Week 2 assignment

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.json());
app.use((req,res, next) => {
  console.log(`${new Date().toISOString() } ${req.method} `)
  next()
})

// Sample in-memory products database
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Go to /api/products to see all products.');
});

// TODO: Implement the following routes:
// GET /api/products - Get all products
app.get('/api/products', (req,res) => {
  res.json(products)
})


// GET /api/products/:id - Get a specific product
app.get('/api/products/:id', (req, res) => {
  const id = req.params - 1
  res.json(products[id])
})

// POST /api/products - Create a new product

app.post('/api/products', (req,res) => {
  const newproduct = { id, name, description, price, category, inStock} = req.body
  products.push(newproduct)
  res.status(201).json(newproduct)
})
// PUT /api/products/:id - Update a product
app.put('/api/products/:id', (req, res) => {
  const id = req.params.id
  const { name, description, price, category, inStock } = req.body;
  if (id < 0) {
    return res.status(404).json({ error: 'Product not found' });
  }
  products[id] = {
    id,
    name,
    description,
    price,
    category,
    inStock
  } 
  res.json(products[id])

})
// DELETE /api/products/:id - Delete a product
app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const productIndex = products.findIndex(p => p.id === id);
  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  const deletedProduct = products.splice(productIndex, 1);
  res.json(deletedProduct[0]);
});

// Example route implementation for GET /api/products
// app.get('/api/products', (req, res) => {
//   res.json(products);
// });

// TODO: Implement custom middleware for:
// - Request logging
// - Authentication
// - Error handling


app.use((req, res, next) => {
  res.status(404).json({Error: "Route not found"})
})
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app for testing purposes
module.exports = app; 