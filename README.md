# 📱 loginApp

A full-stack authentication and user management system featuring a **React Native** mobile application and a robust **Node.js** REST API.

---

## 🚀 Features

*   **User Authentication:** Sign Up and Log In flow.
*   **Profile Management:** Update user details (name/email).
*   **Security:** 
    *   Password hashing using **Bcrypt**.
    *   Input validation and schema enforcement with **Zod**.
*   **Mobile Experience:** Secure navigation, logout functionality, and password update screens.

---

## 🛠 Tech Stack

### **Front-end (Mobile)**
*   **React Native** (Expo)
*   **Axios** (API integration)
*   **React Navigation** (Stack/Tab navigation)

### **Back-end (API)**
*   **Node.js & TypeScript**
*   **Express** (Framework)
*   **Prisma ORM** (Database management)
*   **Zod** (Schema validation)
*   **Bcrypt** (Security)

---
🔧 Getting Started
1. Prerequisites
Node.js installed

An instance of MySQL/PostgreSQL (or SQLite)

---
2. Backend Setup
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Set up your .env file with your DATABASE_URL
# Run migrations to create database tables
npx prisma migrate dev

# Start the development server
npm run dev

---
3. Frontend Setup
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start the Expo server
npx expo start

---
Note: Remember to update the API base URL in your frontend configuration to match your machine's local IP address.

---
## 📂 Project Structure

```text
loginApp/
├── backend/   # Node.js REST API
└── frontend/  # React Native / Expo Mobile App

