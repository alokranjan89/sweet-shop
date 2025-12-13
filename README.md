🍬 Sweet Shop Management System

## 📌 Project Overview

The **Sweet Shop Management System** is a full-stack application designed to manage sweets inventory for a shop.
Users can browse and purchase sweets, while **admin users** can manage sweets inventory (add, update, restock, delete).

The system is built using **NestJS** with **JWT-based authentication**, **role-based authorization**, persistent database storage, and **Test-Driven Development (TDD)** practices.

This project was developed as part of a **company technical assessment**.

---

## 🛠️ Tech Stack

### Backend

* **NestJS** (Node.js + TypeScript)
* **TypeORM**
* **SQLite** (persistent database)
* **JWT Authentication**
* **Passport.js**
* **Swagger (OpenAPI)**
* **Jest** (Unit Testing)

### Tools & Practices

* RESTful API design
* Role-based access control (USER / ADMIN)
* Test-Driven Development (TDD)
* Git & GitHub version control

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/alokranjan89/sweet-shop.git
cd sweet-shop/backend
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Environment Variables

Create `.env` file in `backend/`:

```env
JWT_SECRET=mysecretkey
```

### 4️⃣ Run Backend Server

```bash
npm run start
```

Server will run at:

```
http://localhost:3000
```

---

## 📘 API Documentation (Swagger)

Swagger UI is available at:

```
http://localhost:3000/api
```

You can:

* Register / Login users
* Authorize with JWT
* Test all protected endpoints

---

## 🔐 Authentication & Authorization

* JWT-based authentication
* Two roles supported:

  * **USER**
  * **ADMIN**

### Role Permissions

| Action         | USER | ADMIN |
| -------------- | ---- | ----- |
| View sweets    | ✅    | ✅     |
| Purchase sweet | ✅    | ✅     |
| Add sweet      | ❌    | ✅     |
| Update sweet   | ❌    | ✅     |
| Restock sweet  | ❌    | ✅     |
| Delete sweet   | ❌    | ✅     |

Unauthorized actions return **403 Forbidden**.

---

## 🍭 API Features

### Auth APIs

* `POST /api/auth/register`
* `POST /api/auth/login`

### Sweets APIs (Protected)

* `POST /api/sweets` (Admin only)
* `GET /api/sweets`
* `GET /api/sweets/search`
* `PUT /api/sweets/:id` (Admin only)
* `DELETE /api/sweets/:id` (Admin only)

### Inventory APIs

* `POST /api/sweets/:id/purchase`
* `POST /api/sweets/:id/restock` (Admin only)

---

## 🧪 Testing (TDD)

Unit tests are written using **Jest** following **TDD principles**.

### Run Tests

```bash
npm run test
```

### Covered Tests

* AuthService unit tests
* SweetsService unit tests

All tests pass successfully.

---

## 📸 Screenshots

Screenshots are available in the [`screenshots/`](./screenshots) folder.

Included screenshots:

* Swagger UI
* User registration success
* Login success & JWT authorization
* Unauthorized (403) access for USER
* Admin add/update sweet
* Purchase sweet
* Test results (`npm run test`)

---

## 🤖 My AI Usage (Mandatory)

I used **ChatGPT** as an AI assistant during development for:

* Generating initial NestJS boilerplate
* Debugging dependency and configuration issues
* Writing and fixing Jest unit tests
* Improving API design and Swagger documentation
* Understanding TDD best practices

All AI-generated code was reviewed, understood, and modified by me to ensure correctness and learning.
AI significantly improved development speed and helped maintain clean coding practices.

---
