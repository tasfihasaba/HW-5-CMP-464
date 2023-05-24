const express = require('express');
const { Pool } = require('pg');

const app = express();

const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'favlinks',
  password: 'password',
  port: 5432,
});

const getLinks = (req, res) => {
  pool.query('SELECT * FROM links ORDER BY id ASC', (error, result) => {
    if (error) {
      res.status(500).json({ error: 'Error retrieving links' });
    } else {
      res.status(200).json(result.rows);
    }
  });
};

const getAllData = (req, res) => {
  pool.query('SELECT * FROM links', (error, result) => {
    if (error) {
      res.status(500).json({ error: 'Error retrieving data' });
    } else {
      res.status(200).json(result.rows);
    }
  });
};

app.get('/links', getLinks);
app.get('/alldata', getAllData);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
