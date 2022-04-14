const express = require('express');
const con = require('./connection');
const app = express();

app.use(express.json());

// Get all users

app.get('/users', (req, res) => {
    con.query('SELECT * FROM user_information', (err, result) => {
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
    con.query('INSERT INTO user_information SET ?', user, (err, result) => {
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
    con.query(`Select * from user_information where id=${req.params.id}`, (err, result) => {
        if (!err) {
            res.send(result);
        }
    });
});

// Update a user by id
app.put('/users/:id', (req, res) => {
    const user = req.body;
    const updateQuery = `UPDATE user_information
                       SET ?
                        WHERE id = ${req.params.id}`;

    con.query(updateQuery,user, (err, result) => {
        if (!err) {
            res.send('Update was successful!');
        }
        else { console.log(err.message) }
    });
});

// Delete a user by id
//added comment

app.delete('/users/:id', (req, res)=> {
    const insertQuery = `delete from user_information where id=${req.params.id}`;

    con.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        }
        else{ console.log(err.message) }
    })
});
app.listen(3000);