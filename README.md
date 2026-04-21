# ✦ SCANDAL — Premium Traditional Men's Wear ✦

A high-fidelity, full-stack E-Commerce platform for traditional Indian menswear, built with a focus on **sustainability (SDG 12)** and **AI-driven personalization**.

---

## 👥 Team Members
*   **Nishi Shah** (16010125808)
*   **Khush Satra** (16010125815)
*   **Harshit Panchal** (16010125810)

**KJ Somaiya School of Engineering**  
Department of Computer Engineering

---

## 🚀 Key Features

### 🛍️ Core E-Commerce
*   **Responsive UI/UX**: A premium glassmorphism-inspired design built with Vanilla JS and CSS3.
*   **Advanced Filtering**: Filter products by category (Traditional, Formal, T-Shirts), price ranges, and dynamic sorting.
*   **Secure Checkout**: Integrated multi-step checkout flow with **Razorpay** and Cash on Delivery (COD) options.
*   **JWT Authentication**: Secure user registration and login with bcrypt password hashing and token-based sessions.

### 🤖 AI-Driven Innovation
*   **AI Wardrobe Stylist**: A personalized recommendation engine that suggests complete outfits based on occasions.
*   **AI Size Consultant**: Reduces product returns by providing accurate size recommendations based on user measurements.

### 🛡️ Admin Dashboard
*   **Analytics Overview**: Real-time tracking of Total Revenue, Total Orders, and User registrations.
*   **Inventory Management**: Full CRUD operations for managing product collections.
*   **Order Fulfillment**: Live status tracking and management of customer orders.

---

## 🛠️ Tech Stack

*   **Frontend**: HTML5, CSS3 (Custom Variables, Grid/Flexbox), Vanilla JavaScript.
*   **Backend**: Node.js, Express.js (RESTful API Architecture).
*   **Database**: PostgreSQL (Relational Database) via **Sequelize ORM**.
*   **Security**: JSON Web Tokens (JWT), Bcrypt.js.
*   **Tools**: pgAdmin 4, VS Code, Git.

---

## 📂 Project Structure

```text
Scandal-main/
├── frontend/
│   ├── assets/             # Product images and icons
│   ├── index.html          # Homepage (Hero, Featured)
│   ├── collections.html    # Product catalog with filters
│   ├── admin.html          # Admin Dashboard
│   ├── ai-stylist.html     # AI recommendation interface
│   ├── css/                # Custom CSS (Somaiya Modern Theme)
│   └── js/                 # Frontend logic (Auth, Cart, AI)
├── backend/
│   ├── config/             # Database & environment config
│   ├── models/             # Sequelize PostgreSQL models
│   ├── routes/             # Express API endpoints
│   ├── middleware/         # Auth & error handling
│   └── app.js              # Server entry point
├── ppt-images/             # Presentation screenshots
└── SCANDAL_PPT.html        # Project presentation deck
```

---

## ⚙️ Setup & Installation

### 1. Database Setup
1.  Install **PostgreSQL** and open **pgAdmin 4**.
2.  Create a new database named `scandal_db`.

### 2. Backend Configuration
1.  Navigate to the backend folder: `cd backend`
2.  Install dependencies: `npm install`
3.  Create a `.env` file and configure your credentials:
    ```env
    PORT=5000
    DATABASE_URL=postgresql://postgres:your_password@localhost:5432/scandal_db
    JWT_SECRET=your_super_secret_key
    ```
4.  Start the server: `npm run dev` (Tables will be auto-generated via Sequelize).

### 3. Frontend Activation
1.  Open `frontend/index.html` using **Live Server** in VS Code.
2.  The frontend will automatically connect to the backend API at `http://localhost:5000`.

---

## 🌍 Sustainability (SDG 12)
**Responsible Consumption and Production**  
*   **Reducing Waste**: The AI Size Consultant minimizes carbon footprints by significantly reducing logistics-related waste from product returns.
*   **Supporting Local**: Our platform prioritizes digital exposure for local heritage weavers, promoting ethical production cycles.

---

## 📄 License
This project is developed for the **Mid-Term Evaluation** of the Web Programming Laboratory course at KJ Somaiya School of Engineering.
