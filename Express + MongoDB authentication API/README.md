# Node.js Authentication API (Express, JWT, Bcrypt)

This is a simple authentication API built with **Express.js**, **bcrypt** for password hashing, and **JWT (jsonwebtoken)** for token-based authentication.  
It includes signup, login, and a protected profile route.

---

## 🚀 Features
- User **signup** with hashed passwords
- User **login** with JWT authentication
- **JWT verification middleware** to protect routes
- In-memory user storage (no database yet)
- CORS enabled for frontend integration

---

## 📂 Project Structure
project-folder/
│── index.js # Main server file
│── package.json # Project metadata & dependencies
│── README.md # Documentation

yaml
Copy
Edit

---

## 🛠️ Installation & Setup

1. Clone the repository or copy the code.
2. Install dependencies:
   ```bash
   npm install express cors jsonwebtoken bcrypt
Start the server:

bash
Copy
Edit
node index.js
The server will run at:

arduino
Copy
Edit
http://localhost:3000
🔑 API Endpoints
1. Signup
POST /signup

Request body:

json
Copy
Edit
{
  "username": "user@example.com",
  "password": "mypassword"
}
Response:

json
Copy
Edit
{
  "message": "User created successfully"
}
2. Login
POST /login

Request body:

json
Copy
Edit
{
  "username": "user@example.com",
  "password": "mypassword"
}
Response:

json
Copy
Edit
{
  "token": "<your-jwt-token>"
}
3. Profile (Protected)
GET /profile

Requires Authorization header:

makefile
Copy
Edit
Authorization: Bearer <your-jwt-token>
Response:

sql
Copy
Edit
Welcome user@example.com
4. Get All Users (Testing Only)
GET /

Response:

json
Copy
Edit
{
  "users": [
    { "username": "user@example.com", "password": "<hashed>" }
  ]
}
⚠️ Notes
Currently, users are stored in-memory (users array).
This means data will be lost when the server restarts.

For production, connect a database (e.g., MongoDB or PostgreSQL).

Always keep your secretkey in an environment variable.

📌 Example Usage with cURL
Signup

bash
Copy
Edit
curl -X POST http://localhost:3000/signup \
-H "Content-Type: application/json" \
-d '{"username":"test@example.com","password":"123456"}'
Login

bash
Copy
Edit
curl -X POST http://localhost:3000/login \
-H "Content-Type: application/json" \
-d '{"username":"test@example.com","password":"123456"}'
Profile

bash
Copy
Edit
curl -X GET http://localhost:3000/profile \
-H "Authorization: Bearer <your-jwt-token>"
✅ Next Steps
Add MongoDB with Mongoose for persistent storage

Implement refresh tokens and logout

Add input validation (e.g., using Joi or express-validator)

Add role-based authorization (admin, user)

👨‍💻 Built with ❤️ using Node.js + Express

yaml
Copy
Edit

---

Do you want me to also create a **MongoDB-ready README** version (with Mongoose setup) so you can use it when you upgrade