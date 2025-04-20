# 📚 MCQpedia Nepal

MCQpedia Nepal is a web application built using the **MERN stack** that allows students to **practice multiple-choice questions** and **contribute their own**. It aims to enhance academic learning through an interactive, community-driven platform where quality is maintained through authentication.

---

## 🚀 Live Demo

- 🌐 Frontend: [https://mc-qpedia-nepal.vercel.app/](https://mc-qpedia-nepal.vercel.app/)
- ⚙️ Backend API: [https://mcqpedia-nepal.onrender.com/](https://mcqpedia-nepal.onrender.com/)


---

## 🔧 Tech Stack

- **Frontend**: React.js, Vite, Bootstrap, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JWT


---

## ✨ Features

- 🧠 Practice MCQs from various academic subjects
- ✍️ Add new MCQs (only for logged-in users)
- 🔐 JWT-based authentication to ensure valid contributions
- ⚙️ Full CRUD operations for MCQs


---

## 🗂️ Folder Structure

---


## 🛠️ Getting Started Locally

If you’d like to run **MCQpedia Nepal** on your own machine (to explore, contribute, or learn), here’s how you can set it up step-by-step:

---

### 🧾 Prerequisites

Make sure you have the following installed:
- [Node.js & npm](https://nodejs.org/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or MongoDB locally
- A GitHub account (to clone the project)

---

### 📥 1. Clone the Repository

```bash
git clone https://github.com/bidur7745/MCQpedia-Nepal.git
cd MCQpedia-Nepal
```
---
### ⚙️ 2. Set Up the Backend

```cd backend
npm install
```

Now create a .env file inside the /backend folder:

```PORT=5000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your_super_secret_jwt
PORT=your_port_number
```

Start the backend

```
npm start
```

---
### 💻 3. Set Up the Frontend

```
cd ../frontend
npm install
```

Start the frontend

```
npm run dev
```

