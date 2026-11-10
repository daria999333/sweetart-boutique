const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      price REAL NOT NULL,
      description TEXT,
      image TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_name TEXT NOT NULL,
      address TEXT NOT NULL,
      phone TEXT NOT NULL,
      total_price REAL NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

 
  db.get("SELECT COUNT(*) as count FROM products", (err, row) => {
    if (row.count === 0) {
      const stmt = db.prepare(`INSERT INTO products (name, category, price, description, image) VALUES (?, ?, ?, ?, ?)`);
      
      stmt.run("Mango-Passionfruit Macaron", "Macarons", 4.50, "Delicate French macaron filled with zesty mango and passionfruit ganache.", "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=600&q=80");
      stmt.run("Raspberry Tartlet", "Tarts", 6.80, "Crisp sable pastry filled with silky vanilla cream and fresh local raspberries.", "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80");
      stmt.run("Chocolate Velvet Mousse Cake", "Cakes", 35.00, "Multi-layered chocolate chiffon sponge, dark chocolate mousse, and cocoa velvet glaze.", "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80");
      stmt.run("Pistachio Eclair", "Eclairs", 5.20, "Choux pastry filled with roasted pistachio mousseline cream and crushed nuts.", "https://images.unsplash.com/photo-1785960160511-aa7ed5af05e1?auto=format&fit=crop&w=600&q=80");
      
      stmt.finalize();
      console.log("Initial products seeded successfully.");
    }
  });
});

module.exports = db;