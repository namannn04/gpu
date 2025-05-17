## 🔧 GPU Recommendation System

A simple full-stack app where users can view GPU best optimized according to the user inputs and request unavailable ones. Once a request is made, a confirmation message is shown.

## 📹 Video Demonstration

[Watch Demo Video](https://drive.google.com/file/d/17bPsh8IrC9e7O5ennx9rPpc43G5SkPzb/view)

## WORD DOC 

[GPU Cost Optimizer Documentation(1).docx](https://github.com/user-attachments/files/20023600/GPU.Cost.Optimizer.Documentation.1.docx)


### 🧩 Tech Stack

* **Frontend**: React + Tailwind CSS
* **Backend**: Node.js + Express (optional, for handling GPU request logs or future extensions)

---

## 📁 Folder Structure

```
gpu-request-app/
├── frontend/          # React + Tailwind app
└── backend/           # Express server (placeholder for future API integration)
```

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/gpu-request-app.git
```

---

## 📦 Frontend Setup (React + Tailwind)

```bash
cd frontend
npm install
npm start
```

> Visit: `http://localhost:3000`

### 🛠 Features:

* Single static GPU recommendation display
* "Request" button reveals confirmation message
* Table comparison of the GPU's based on best hour, spot prices

---

## 🛠 Backend Setup (Node.js + Express)

> *Note: This is optional unless you're planning to handle requests via API.*

```bash
cd backend
npm install
node index.js
```

> Visit: `http://localhost:8080`

Basic Express setup with placeholder routes for logging GPU requests.

```
PORT=8080
```

---

## ✅ Future Improvements

* Save requests to a database (MongoDB)
* User authentication
* Admin dashboard for managing requests
