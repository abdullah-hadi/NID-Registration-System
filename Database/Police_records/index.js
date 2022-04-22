const mysql = require('mysql');
const express = require("express");
const app = express();
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});
app.use(express.json());
db.connect(function(err) {
    if (err) {
        console.log(err.message);
    }
    else {
        console.log("Connected!");
    }
});

// Get all users

app.get('/users', (req, res) => {
    db.query('SELECT * FROM police_record', (err, result) => {
        if (err) {
            console.log(err.message);
        }
        else {
            res.send(result);
        }
    });

});


// Post a new user
app.post('/users', (req, res) => {
    const user = req.body;
    db.query('INSERT INTO police_record SET ?', user, (err, result) => {
        if (err) {
            console.log(err.message);
        }
        else {
            res.send(result);
        }
    });

});

// Get a user by id
app.get('/users/:id', (req, res) => {
    db.query(`Select * from police_record where id=${req.params.id}`, (err, result) => {
        if (!err) {
            res.send(result);
        }
    });
});

app.listen(3003);