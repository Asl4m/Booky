// app.js
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'your_password',
    database: 'your_database'
});

db.connect(err => {
    if (err) {
        console.error('MySQL connection error:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

// API endpoint to handle form submission
app.post('/submit', (req, res) => {
    const { username, password } = req.body;

    // Perform database query, e.g., insert user data
    const query = `INSERT INTO users (username, password) VALUES ('${username}', '${password}')`;

    db.query(query, (err, result) => {
        if (err) {
            console.error('MySQL query error:', err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('User data inserted successfully');
            res.send('User data inserted successfully');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
