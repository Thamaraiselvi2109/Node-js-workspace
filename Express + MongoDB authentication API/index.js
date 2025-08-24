import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from './schema/userSchema.js';

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/users')
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

const secretkey = '0987654321qwert';

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).send({ message: "Unauthorized" });

    try {
        const verified = jwt.verify(token, secretkey);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send({ message: "Invalid Token" });
    }
};

// ✅ Signup route
app.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check for duplicate user
        const existingUser = await User.findOne({ username });  // ✅ use await
        if (existingUser) {
            return res.status(409).send({ message: "User already exists" });
        }

        // Hash password before storing
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashPassword });
        await newUser.save();

        res.status(201).send({ message: "User created successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Error creating user" });
    }
});

// ✅ Login route
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user in DB
        const user = await User.findOne({ username });  // ✅ use await
        if (!user) return res.status(404).send({ message: "User not found" });

        // Validate password
        const validatePassword = await bcrypt.compare(password, user.password);
        if (!validatePassword) return res.status(401).send({ message: "Invalid password" });

        // Generate JWT
        const token = jwt.sign({ username: user.username }, secretkey);

        res.status(200).send({ message: "Logged in", token });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Error logging in" });
    }
});

// ✅ Get all users (just for testing)
app.get('/', async (req, res) => {
    try {
        const users = await User.find();  // ✅ fetch from DB
        res.json(users);
    } catch (err) {
        res.status(500).send({ message: "Error fetching users" });
    }
});

// ✅ Protected route
app.get('/profile', verifyToken, (req, res) => {
    res.status(200).send(`Welcome ${req.user.username}`);
});

// Start server
app.listen(4000, () => {
    console.log("Server running on port 4000");
});
