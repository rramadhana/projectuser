const express = require('express');
const app = express();
const mysql = require('mysql');

// Create a MySQL pool using environment variables
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST || "if-c-03:asia-southeast1:projectjos",
  user:process.env.DB_USER || "root"  ,
  password: process.env.DB_PASSWORD || "ramadhana",
  database:process.env.DB_DATABASE|| "projectray" ,
});

// Endpoint to get all data
app.get("/", (req, res) => {
  pool.query('SELECT * FROM user', (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(results);
  });
});

// Endpoint to create new data
app.post("/", (req, res) => {
  const newData = req.body;

  pool.query('INSERT INTO user SET ?', newData, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(201).send('Data created successfully');
  });
});

// Endpoint to update data
app.put("/:id", (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  pool.query('UPDATE user SET ? WHERE id = ?', [updatedData, id], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.send('Data updated successfully');
  });
});

// Endpoint to delete data
app.delete("/:id", (req, res) => {
  const id = req.params.id;

  pool.query('DELETE FROM user WHERE id = ?', id, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.send('Data deleted successfully');
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
