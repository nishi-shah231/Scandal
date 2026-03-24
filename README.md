# ✦ Vastra – Traditional Men's Wear

A full-stack e-commerce website for traditional Indian menswear.

## Tech Stack
- **Frontend**: Vanilla HTML, CSS, JavaScript
- **Backend**: Node.js + Express
- **Database**: PostgreSQL (via Sequelize ORM)

## Project Structure
```
shop/
├── frontend/
|   ├── assets              ← Images of Products
│   ├── index.html          ← Home page
│   ├── collections.html    ← All products with filter
│   ├── cart.html           ← Cart & order summary
│   ├── login.html          ← Login / Register
│   ├── css/
│   │   ├── style.css       ← Main styles (gold & white theme)
│   │   └── collections.css ← Collections, cart, login styles
│   └── js/
│       ├── main.js         ← Products data, cart logic, shared JS
│       ├── collections.js  ← Collections filter logic
│       └── cart.js         ← Cart page logic
└── backend/
    ├── app.js              ← Entry point
    ├── config/db.js        ← Sequelize + PostgreSQL connection
    ├── models/
    │   ├── User.js
    │   └── Cart.js
    ├── routes/
    │   ├── auth.js         ← /api/auth/login, /api/auth/register
    │   ├── products.js     ← /api/products
    │   └── cart.js         ← /api/cart
    └── .env
```

## Setup Instructions

### 1. Create PostgreSQL Database
Open pgAdmin and create a new database called `vastra_db`.

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file (copy from `.env.example`):
```
PORT=5000
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/vastra_db
JWT_SECRET=vastra_secret_key_2025
```

Start the backend:
```bash
npm run dev
```

The server will auto-create all tables via Sequelize sync.

### 3. Frontend Setup
Open `frontend/index.html` directly in your browser — no build step needed!

Or use VS Code Live Server extension for best experience.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login user |
| GET | /api/products | Get all products |
| GET | /api/products?category=traditional | Filter by category |
| GET | /api/cart/:sessionId | Get cart items |
| POST | /api/cart | Add item to cart |
| PUT | /api/cart/:id | Update quantity |
| DELETE | /api/cart/:id | Remove item |

## Features
- ✦ Gold & white premium theme
- ✦ Responsive design (mobile friendly)
- ✦ Browse without login (optional auth)
- ✦ Filter products by category
- ✦ Add to cart with quantity control
- ✦ Order summary with free shipping logic
- ✦ Login & Register with JWT auth
- ✦ Cart persists in localStorage
