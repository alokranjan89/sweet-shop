🍬 Sweet Shop Management System (TDD Kata)

A full-stack **Sweet Shop Management System** built as part of a **TDD Kata assessment**.
The project demonstrates **backend API development, authentication, database usage, testing with TDD, frontend integration, and clean development practices**, augmented responsibly with AI tools.

---

## 📌 Project Overview

The Sweet Shop Management System allows users to:

* Register and log in securely
* View available sweets
* Search sweets by name, category, or price range
* Purchase sweets (with inventory tracking)

Admin users can:

* Add new sweets
* Update sweet details
* Restock sweets
* Delete sweets

The system is built with **role-based access control**, **JWT authentication**, and **full test coverage** for backend logic.

---

## 🧱 Tech Stack

### Backend

* **Node.js**
* **NestJS**
* **TypeScript**
* **SQLite (TypeORM)**
* **JWT Authentication**
* **Jest (Testing)**

### Frontend

* **React (Vite)**
* **React Router**
* **Axios**
* **CSS (custom styling)**

---

## 📂 Project Structure

```
sweet-shop/
├── backend/
│   ├── screenshots/
│   ├── src/
│   ├── test/
│   ├── .env.example
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── README.md
│
└── README.md
```

---

## 🔐 Authentication & Roles

* **JWT-based authentication**
* Two roles:

  * `USER`
  * `ADMIN`
* Protected routes using Guards
* Admin-only access for sensitive operations (add, update, delete sweets)

---

## 🚀 Backend API Endpoints

### Auth

| Method | Endpoint             | Description     |
| ------ | -------------------- | --------------- |
| POST   | `/api/auth/register` | Register user   |
| POST   | `/api/auth/login`    | Login & get JWT |

### Sweets (Protected)

| Method | Endpoint             | Access |
| ------ | -------------------- | ------ |
| POST   | `/api/sweets`        | Admin  |
| GET    | `/api/sweets`        | User   |
| GET    | `/api/sweets/search` | User   |
| PUT    | `/api/sweets/:id`    | Admin  |
| DELETE | `/api/sweets/:id`    | Admin  |

### Inventory

| Method | Endpoint                   | Access |
| ------ | -------------------------- | ------ |
| POST   | `/api/sweets/:id/purchase` | User   |
| POST   | `/api/sweets/:id/restock`  | Admin  |

---

## 🧪 Testing (TDD)

* Tests written using **Jest**
* Service-level unit tests
* Followed **Red → Green → Refactor**
* All tests passing

### Run tests

```bash
cd backend
npm run test
```

📸 **Test results screenshots are included in**:

```
backend/screenshots/
```

---

## 🖥️ Frontend Features

* Registration & Login forms
* Sweet listing dashboard
* Search & filter sweets
* Purchase button (disabled when quantity = 0)
* Admin panel for managing sweets
* Responsive, clean UI

---

## ⚙️ How to Run Locally

### Backend

```bash
cd backend
npm install
npm run start
```

Backend runs on:

```
http://localhost:3000
```

Swagger UI:

```
http://localhost:3000/api
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 📸 Screenshots

Screenshots of:

* User registration
* Login
* Sweet list
* Search functionality
* Admin actions
* Test results

📁 Stored in:

```
backend/screenshots/
```

---

## 🤖 My AI Usage (Mandatory)

### Tools Used

* **ChatGPT**

### How I Used AI

* Generating initial boilerplate code
* Understanding NestJS dependency injection issues
* Writing and refining unit tests
* Debugging JWT authentication and test failures
* Structuring README and documentation

### Reflection

AI significantly improved productivity and debugging speed, especially while working with complex dependency injection and TDD workflows.
All AI-generated code was **reviewed, understood, and manually refined** to ensure correctness and originality.

---
## 🧑‍💻 Author

**Alok Ranjan**
B.Tech – Electronics & Communication Engineering

Just tell me 👍
