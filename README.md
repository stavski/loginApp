# 📱 loginApp

A full-stack authentication and user management system featuring a **React Native** mobile application and a robust **Node.js** REST API.

---

## 🚀 Features

*   **User Authentication:** Sign Up and Log In flow.
*   **Profile Management:** Update user details (name/email).
*   **Security:** 
    *   Password hashing using **Bcrypt**.
    *   Input validation and schema enforcement with **Zod**.
*   **Mobile Experience:** Secure navigation, logout functionality, and profile management screens.

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

## 🔧 Getting Started & API Reference

### 1. Prerequisites
*   Node.js installed
*   An instance of MySQL, PostgreSQL or SQLite

### 2. Backend Setup
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Run migrations and start server
npx prisma migrate dev
npm run dev

### 3. Frontend Setup
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start the Expo server
npx expo start

> **Note:** Remember to update the API base URL in your frontend configuration to match your machine's local IP address.

---

### 🛣️ API Endpoints

| Method | Route       | Description               |
| :----- | :---------- | :------------------------ |
| POST   | /users      | Register a new user       |
| GET    | /users      | List all users            |
| GET    | /users/:id  | Get specific user by ID   |
| PUT    | /users/:id  | Update user information   |
| DELETE | /users/:id  | Delete a user account     |

---

## 📂 Project Structure

```text
loginApp/
├── backend/   # Node.js REST API
└── frontend/  # React Native / Expo Mobile App
