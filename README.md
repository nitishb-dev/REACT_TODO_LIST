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

---

## 🧑‍💻 How It Works

1. User performs actions on the frontend (Add/Edit/Delete/Toggle).
2. Frontend sends API request to AWS API Gateway.
3. API Gateway triggers the appropriate Lambda function.
4. Lambda interacts with the MySQL database on AWS RDS.
5. Response is sent back and reflected in the UI.

---
