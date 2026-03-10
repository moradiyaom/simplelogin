const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Hardcoded user for demo
const USERS = [
    { username: 'admin', password: 'password' }
];

// Login endpoint
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
        return res.status(400).json({ 
            success: false, 
            message: 'Username and password are required' 
        });
    }

    // Find user
    const user = USERS.find(u => u.username === username && u.password === password);

    if (user) {
        return res.json({ 
            success: true, 
            message: 'Login successful!',
            user: { username: user.username }
        });
    } else {
        return res.status(401).json({ 
            success: false, 
            message: 'Invalid username or password' 
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

