const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));


app.get('/api/products', (req, res) => {
  db.all("SELECT * FROM products", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ products: rows });
  });
});

app.post('/api/orders', (req, res) => {
  const { customer_name, address, phone, total_price } = req.body;
  
  if (!customer_name || !address || !phone || !total_price) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const query = `INSERT INTO orders (customer_name, address, phone, total_price) VALUES (?, ?, ?, ?)`;
  db.run(query, [customer_name, address, phone, total_price], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ 
      success: true, 
      orderId: this.lastID,
      message: "Order placed successfully!" 
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});