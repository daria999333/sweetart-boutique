# SweetArt Boutique 🍰✨

A multi-page full-stack web application for an artisanal confectionery shop. Built with Node.js, Express, SQLite, and Vue.js, `SweetArt Boutique` provides a complete online shopping experience including an interactive catalog, dynamic cart management, and order placement.

## Features

- 🧁 **Interactive Product Catalog**: Browse handcrafted desserts, tarts, and macarons fetched dynamically from the backend.
- 🛒 **Reactive Shopping Cart**: Manage quantities, calculate sub-totals instantly, and review items using Vue.js 3.
- 💾 **Persistent Database**: SQLite backend to store product listings, prices, descriptions, and customer orders.
- 🎨 **Aesthetic UI**: Clean, responsive layout designed with modern CSS Grid and Flexbox in warm pastry tones.

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+), Vue.js 3 (via CDN)
- **Backend**: Node.js, Express.js (REST API)
- **Database**: SQLite3
- **Testing/Tools**: Git, Fetch API

## Project Structure

```text
sweetart-boutique/
├── server/
│   ├── database.js       # SQLite configuration and schema initialization
│   └── server.js         # Express server and REST API routes
├── public/
│   ├── index.html        # Main catalog page
│   ├── cart.html         # Checkout and cart management page
│   ├── css/
│   │   └── style.css     # Global styles and layout design
│   └── js/
│       └── app.js        # Vue.js frontend logic and API integration
├── package.json          # Node.js dependencies
└── README.md
```

## Installation & Setup

1. Clone the repository:
   ```bash
   git clone [https://github.com/daria999333/sweetart-boutique.git](https://github.com/daria999333/sweetart-boutique.git)
   cd sweetart-boutique
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to:
   ```text
   http://localhost:3000
   ```