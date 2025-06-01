# 📝 Serverless Todo List App

A full-stack **Serverless Todo List** application built using **React.js**, **AWS Lambda (Python)**, **API Gateway**, and **MySQL on AWS RDS**. Deployed frontend on **Vercel** and backend using **serverless architecture** for scalable, low-maintenance deployment.

---

## 🚀 Features

- ✅ Add, Edit, Delete, and Toggle Todos
- 🌗 Light/Dark Mode with Theme Persistence
- 📅 Start Date & End Date Selection
- 🕒 Timestamp Tracking for Created and Completed Tasks
- ☁️ Serverless Deployment (No backend server needed)
- 💾 Data stored in AWS RDS (MySQL)
- 🔐 Secure API interaction with proper error handling

---

## 📁 Project Structure

client/
├── components/
│ ├── Todo.js # Main app logic & UI
│ └── TodoItems.js # Individual todo item logic
├── api_request.js # Handles all API interactions
├── App.js
└── index.js

backend/
├── getTodo.py # Fetch all todos
├── postTodo.py # Add a new todo
├── putTodo.py # Update existing todo
└── deleteTodo.py # Delete todo by ID

## 🛠️ Tech Stack

### Frontend:
- React.js (Vercel Deployed)
- Tailwind CSS
- React Icons

### Backend:
- AWS Lambda (Python)
- AWS API Gateway
- AWS RDS (MySQL)
- `pymysql` for DB access

---

## 🌐 API Endpoints (via API Gateway)

- `GET` `/deployment` → Fetch all todos
- `POST` `/deployment` → Create a new todo
- `PUT` `/deployment` → Update a todo by `id`
- `DELETE` `/deployment` → Delete a todo by `id`

> ⚠️ Make sure to deploy the Lambda functions with the correct permissions and environment variables for RDS access.

---

## 🧑‍💻 How It Works

1. User performs actions on the frontend (Add/Edit/Delete/Toggle).
2. Frontend sends API request to AWS API Gateway.
3. API Gateway triggers the appropriate Lambda function.
4. Lambda interacts with the MySQL database on AWS RDS.
5. Response is sent back and reflected in the UI.

---
