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
Navigate to backend folder
cd backend

Install dependencies
npm install

Run migrations and start server
npx prisma migrate dev
npm run dev

### 3. Frontend Setup
Navigate to frontend folder
cd frontend

Install dependencies
npm install

Start the Expo server
npx expo start

> **Note:** Remember to update the API base URL in your frontend configuration to match your machine's local IP address.

---

### 🛣️ API Endpoints

#### **Autenticação**
| Método | Rota               | Descrição                                          | Autenticação |
| :----- | :----------------- | :------------------------------------------------- | :----------: |
| `POST` | `/auth/login`      | Realiza o login e retorna os tokens (Access/Refresh)| ❌           |
| `POST` | `/auth/refresh`    | Renova o Access Token usando o Refresh Token       | ❌           |
| `GET`  | `/auth/me`         | Retorna os dados do perfil do usuário logado       | 🔑 JWT       |

#### **Usuários**
| Método  | Rota                         | Descrição                                   | Autenticação |
| :------ | :--------------------------- | :------------------------------------------ | :----------: |
| `POST`  | `/users`                     | Cadastra um novo usuário no sistema         | ❌           |
| `GET`   | `/users`                     | Lista todos os usuários registrados         | 🔑 JWT       |
| `GET`   | `/users/:id`                 | Retorna os detalhes de um usuário por ID    | 🔑 JWT       |
| `PUT`   | `/users/:id`                 | Atualiza informações básicas do usuário     | 🔑 JWT       |
| `PATCH` | `/users/:id/update-password` | Atualiza especificamente a senha do usuário | 🔑 JWT       |
| `DELETE`| `/users/:id`                 | Remove permanentemente a conta do usuário   | 🔑 JWT       |

---

### 🔐 Segurança e Regras
- **Autenticação:** As rotas marcadas com **🔑 JWT** exigem que o token seja enviado no Header da requisição:  
  `Authorization: Bearer <seu_access_token>`
- **Validação:** Todos os campos de entrada são validados via **Zod** antes de chegarem aos controllers.
- **Refresh Token:** Para manter a sessão ativa, utilize a rota de refresh quando o Access Token expirar, garantindo uma melhor experiência de usuário.

---

## 📂 Project Structure

```text
loginApp/
├── backend/   # Node.js REST API
└── frontend/  # React Native / Expo Mobile App
