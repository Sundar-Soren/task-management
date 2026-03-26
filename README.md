# RBAC Task Manager API + Frontend

A full-stack task management system demonstrating secure authentication and Role-Based Access Control (RBAC).

The project includes a scalable backend REST API with JWT authentication and a simple frontend UI to interact with the APIs.

---

## Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcrypt (password hashing)
- express-validator
- Swagger API documentation

### Frontend

- React (Vite)
- Axios
- React Router
- React Hot Toast

---

## Core Features

### Authentication

- User registration
- User login
- Password hashing using bcrypt
- JWT-based authentication
- Token stored in browser localStorage

---

### Role Based Access Control (RBAC)

Two roles exist:

### USER

- Can create tasks
- Can view own tasks
- Can update own tasks
- Cannot delete tasks

### ADMIN

- Can view all users tasks
- Can update any task
- Can delete any task

---

### CRUD Operations

Task entity includes:

- title
- createdBy
- timestamps

Supported operations:

Create task
View tasks
Update task
Delete task (admin only)

---

### API Features

- REST API structure
- JWT authentication middleware
- Role middleware
- Request validation
- Error handling middleware
- API versioning (/api/v1)
- Swagger documentation

---

## Project Structure

project-root
│
├── backend
│ ├── src
│ │ ├── config
│ │ │ db.js
│ │ │ swagger.js
│ │
│ │ ├── controllers
│ │ │ auth.controller.js
│ │ │ task.controller.js
│ │
│ │ ├── middleware
│ │ │ auth.middleware.js
│ │ │ role.middleware.js
│ │ │ error.middleware.js
│ │
│ │ ├── models
│ │ │ user.model.js
│ │ │ task.model.js
│ │
│ │ ├── routes
│ │ │ auth.routes.js
│ │ │ task.routes.js
│ │
│ │ ├── utils
│ │ │ generateToken.js
│ │
│ │ ├── app.js
│ │ └── server.js
│
│ ├── .env
│ ├── package.json
│
│
├── frontend
│ ├── src
│ │ ├── api
│ │ │ axios.js
│ │
│ │ ├── components
│ │ │ ProtectedRoute.jsx
│ │ │ PublicRoute.jsx
│ │
│ │ ├── pages
│ │ │ Register.jsx
│ │ │ Login.jsx
│ │ │ Dashboard.jsx
│ │  
│ │ ├── App.jsx
│ │ ├── index.css
│
│ ├── package.json
│
└── README.md
Modular architecture allows easy scaling.

---

## Installation Guide

### Clone repository

git clone <repo_link>

cd project

---

### Backend setup

cd backend

npm install

Create .env file:

PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret_key

Run server:

npm run dev

Server runs on:

http://localhost:5000

Swagger docs:

http://localhost:5000/api-docs

---

### Frontend setup

cd frontend

npm install

npm run dev

Frontend runs on:

http://localhost:5173

---

## Test Users

You can create users using register API.

Example:

### Admin user

Register normally.

Then change role manually in database:

role: "admin"

### Normal user

Register normally.

Default role:

role: "user"

---

## API Endpoints

### Auth

POST /api/v1/auth/register

POST /api/v1/auth/login

---

### Tasks

GET /api/v1/tasks

POST /api/v1/tasks

PUT /api/v1/tasks/:id

DELETE /api/v1/tasks/:id (admin only)

---

## Authorization Flow

User logs in → receives JWT token

Token sent in request header:

Authorization: Bearer <token>

Middleware verifies token and extracts:

user id
user role

Role used to control access.

---

## Role Logic

If role = admin:

return all tasks

If role = user:

return only tasks created by that user

Update permission:

admin → any task

user → own task only

Delete permission:

admin only

---

## Future Improvements

- task description field
- task status tracking
- pagination
- refresh tokens
- email verification
- rate limiting
- docker containerization

---
